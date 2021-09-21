import React, {useEffect, useState, useRef} from 'react'
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import {useInView} from 'react-intersection-observer'
import './GatheringChat.css'

import api from '../../API';

import GatheringSide from '../GatheringSide/GatheringSide'

function GatheringChat(props) {

    const page = useRef(0);

    const client = useRef({});
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [prevMessage, setprevMessage] = useState([])
    const [chatId, setchatId] = useState()
    const [maxPage, setmaxPage] = useState()

    //const [chatRef, inView] = useInView(null);
    const chatRef = useRef(null)


    useEffect(async () => {
        pullMessage()
        setChatMessages([])
        scrollToBottom()
        connect()
        //return 
    }, [props.match.params.chatId])


    const pullMessage = async() => {
        const res = await api.chatMessage(props.match.params.chatId, page.current)
        console.log(res);
        const list = [];
        console.log(window.sessionStorage.getItem('userId'));
        res.slice(0).reverse().map((chat, index) => {
                if(chat.userId.toString() === window.sessionStorage.getItem('userId')){
                    list.push(
                        <div key={index} className='right-chat-word'>{chat.message}</div>
                    )
                }
                else {
                    list.push(
                        <div key={index} className='left-chat-word'>{chat.message}</div>
                    )
                }
        })
        setprevMessage(list)
    }
    

    const nextPage = () => {
        page.current = page.current+1
    }


    const connect = () => {
        client.current = new StompJs.Client({
            //brokerURL: "http://211.37.147.101:8000/chat-service/ws-stomp", // 웹소켓 서버로 직접 접속
            webSocketFactory: () => new SockJS("http://211.37.147.101:8000/chat-service/ws-stomp"), // proxy를 통한 접속
            connectHeaders: {
                'token': window.sessionStorage.getItem('accessToken'),
            },
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: (frame) => {
                console.log(frame);
                subscribe();
            },
            onStompError: (frame) => {
                console.error(frame);
            },
        });
        client.current.activate();
    };

    const disconnect = () => {
        client.current.deactivate();
    };
    
    const subscribe = () => {
        client.current.subscribe(`/sub/chat/room/${props.match.params.chatId}`, ({ body }) => {
            console.log(body);
            setChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
        },{"token":window.sessionStorage.getItem('accessToken')});
    };

    const publish = () => {
        if (!client.current.connected) {
            return;
        }
    
        client.current.publish({
            destination: "/pub/chat/message",
            headers:{
                token: window.sessionStorage.getItem('accessToken'),
            },    
            body: JSON.stringify({ roomId: props.match.params.chatId, sender: window.sessionStorage.getItem('nickName'), message: message }),
        });
        scrollToBottom()
        setMessage("");
    };

    const scrollToBottom = () => {
        // console.log('box: ', box);
        const { scrollHeight, clientHeight } = chatRef.current;
        //console.log(scrollHeight, clientHeight);
    
        chatRef.current.scrollTop = scrollHeight - clientHeight;
    };

    // useEffect(() => {
    //     if( chatMessages != [] && inView){
    //         nextPage()
    //         pullMessage()
    //         console.log('scroll end');
    //     }
    // }, [inView])

    return (
        <div className="GatheringChat">
            <aside>
                <GatheringSide Id={props.match.params.Id} disconnect={disconnect} prevChatId={props.match.params.chatId}/>
            </aside>

            <div>
                <div className='chat-messages' id='chat-messages' ref={chatRef}>
                    
                    {prevMessage}
                    {chatMessages.map((_chatMessage, index) => {
                        if(_chatMessage.userId.toString() === window.sessionStorage.getItem('userId')){
                            return <div key={index} className='right-chat-word'>{_chatMessage.message}</div>
                        }
                        else {
                            return <div key={index} className='left-chat-word'>{_chatMessage.message}</div>
                        }
                        
                    })}
                </div>

                <div className='chat-input-box'>
                    <textarea type='text' onChange={(e)=>{setMessage(e.target.value)}} value={message}/>
                    <button onClick={publish}>보내기</button>
                </div>
                
            </div>
        </div>
    )
}

export default GatheringChat
