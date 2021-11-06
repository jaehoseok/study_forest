import React, {useEffect, useState, useRef} from 'react'
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import {useInView} from 'react-intersection-observer'
import './GatheringChat.css'
import {useParams} from 'react-router-dom'

import api from '../../API';

import GatheringSide from '../GatheringSide/GatheringSide'

function GatheringChat(props) {
    const {Id, chatId} = useParams()

    const page = useRef(0);

    const client = useRef({});
    const [chatMessages, setChatMessages] = useState([]);
    const [Message, setMessage] = useState("");
    const [prevMessage, setprevMessage] = useState([])
    

    //const [chatRef, inView] = useInView(null);
    const chatRef = useRef()
    const [infiniteScroll, inView] = useInView()
    const prev = useRef([])

    var list = []



    useEffect(async () => {
        // if(client.current.connected){
        //     disconnect()
        // }
        page.current=0;
        setChatMessages([])
        //pullMessage()
        return connect()
    }, [])




    useEffect(() => {
        if (chatRef) {
            chatRef.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, [])


    const pullMessage = async() => {
        const res = await api.chatMessage(chatId, page.current)
        list = [];
        res.slice(0).reverse().map((chat, index) => {
                if(chat.userId.toString() === window.sessionStorage.getItem('userId')){
                    list.push(
                        <div key={page.current+' '+index}>
                            <div className='right-chat-word'><p>{chat.sender}</p>{chat.message}</div>
                            <div className='right-createdAt'>{chat.createdAt}</div>
                        </div>
                        
                    )
                }
                else {
                    list.push(
                        <div key={page.current+' '+index}>
                            <div className='left-chat-word'><p>{chat.sender}</p>{chat.message}</div>
                            <div className='left-createdAt'>{chat.createdAt}</div>
                        </div>
                        
                    )
                }
        })
        prev.current=[ ...list, ...prev.current]
        setprevMessage(prev.current)
    }

    useEffect(() => {
        if(client.current.connected && inView){
            nextPage()
            pullMessage()
        }
    }, [inView])
    

    const nextPage = () => {
        page.current = page.current+1
    }


    const connect = async () => {
        client.current = new StompJs.Client({
            //brokerURL: "http://211.37.147.101:8000/chat-service/ws-stomp", // 웹소켓 서버로 직접 접속
            webSocketFactory: () => new SockJS("http://211.37.147.101:8000/chat-service/ws-stomp"), // proxy를 통한 접속
            connectHeaders: {
                'token': window.sessionStorage.getItem('accessToken'),
            },
            debug: function (str) {

            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: (frame) => {

                subscribe();
            },
            onStompError: (frame) => {
                console.error(frame);
            },
        });
        client.current.activate();
        await pullMessage()
    };

    const disconnect = async () => {
        client.current.deactivate();
        await setprevMessage([])
    };
    
    const subscribe = () => {
        client.current.subscribe(`/sub/chat/room/${chatId}`, ({ body }) => {
            setChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
        },{"token":window.sessionStorage.getItem('accessToken')});
    };

    const publish = async () => {
        if (!client.current.connected) {
            return;
        }
    
        client.current.publish({
            destination: "/pub/chat/message",
            headers:{
                token: window.sessionStorage.getItem('accessToken'),
            },    
            body: JSON.stringify({ roomId: chatId, sender: window.sessionStorage.getItem('nickName'), message: Message }),
        });
        setMessage("");
    };

    return (
        <div className="GatheringChat">
            <aside>
                <GatheringSide Id={Id}/>
            </aside>

            <div>
                <div className='chat-messages' id='chat-messages' ref={chatRef}>
                    <div ref={infiniteScroll}/>
                    {prevMessage}
                    {chatMessages.map((_chatMessage, index) => {
                        if(_chatMessage.userId.toString() === window.sessionStorage.getItem('userId')){
                            return <div key={index}>
                                <div className='right-chat-word'><p>{_chatMessage.sender}</p>{_chatMessage.message}</div>
                                <div className='right-createdAt'>{_chatMessage.createdAt}</div>
                            </div>
                        }
                        else {
                            return <div key={index} >
                                <div className='left-chat-word'><p>{_chatMessage.sender}</p>{_chatMessage.message}</div>
                                <div className='left-createdAt'>{_chatMessage.createdAt}</div>
                            </div>
                        }
                    })}
                    
                </div>

                <div className='chat-input-box'>
                    <textarea type='text' onChange={(e)=>{setMessage(e.target.value)}} value={Message}/>
                    <button className='send-btn' onClick={() =>{
                            if(Message!=''){
                                publish()
                            }
                            else{
                                window.alert('공백은 보낼 수 없습니다.')
                            }
                        
                    }}>보내기</button>
                </div>
                
            </div>
        </div>
    )
}

export default GatheringChat
