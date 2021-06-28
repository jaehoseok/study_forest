import React from 'react'

import './InfoUpdate.css'

import Interest from '../Interest/Interest'
import KakaoMap from '../KakaoMap/KakaoMap'


function ModalLocation(props) {
    return (
        <div>
            {props.isOpen ? (
                <div className="modal">
                    <div onClick={props.close}>
                        <div className="inModal">
                            <span className="close" onClick={props.close}>
                                &times;
                            </span>

                            <div className="modalContents" onClick={props.isOpen}>
                                <div>내 정보 수정</div>
                                <div>
                                    <div>
                                        프로필 사진 : <input type="file" className="fileUpdate"/>
                                    </div>
                                        
                                    <input type="text" className="inputUpdate" placeholder={props.Myinfo.MyName}/>
                                    <input type="text" className="inputUpdate" placeholder='관심주제'/>
                                    <div className="modalTag">{props.Myinfo.MyInterest}</div>
                                </div>
                                    
                                    <KakaoMap className="modalMap"/>
                                
                                <p className="updateBtn">수정</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            ): null}

        {/* //만약 isopen(this.state.isModalOpen)이 true일때 코드를 실행 false면  null
        // <div onClick={close}> 로그인창 말고 회색 바탕을 누를시 모달이 꺼지게 만듬
	    //<span className="close" onClick={close}>&times;</span> x버튼 누를시 꺼짐
        //<div className="modalContents" onClick={isOpen}> 로그인 화면은 버튼 클릭해서 들어오면
        // true인 상태로 있어서 화면이 안꺼진다. */}

            
        </div>
    )
}

export default ModalLocation
