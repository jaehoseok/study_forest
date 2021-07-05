import React from 'react'

function StudyReq(props) {
    return (
        <div>
            {props.isOpen ? (
                <div className="modal">
                    <div className="inModal">
                        <span className="close" onClick={props.close}>
                            &times;
                        </span>

                        <div>
                            <div>스터디 가입 요청</div>
                            {props.StudyApply}
                        </div>
                    </div>
                </div>
            ):null}
        </div>
    )
}

export default StudyReq
