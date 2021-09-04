import React,{useEffect} from 'react'

import GatheringSide from '../GatheringSide/GatheringSide';

import './MakeGathering.css'

function MakeGathering(props) {
    useEffect(() => {
        console.log(MakeGathering);
    }, [])
    return (
        <div className="MakeGathering">
            <aside>
                <GatheringSide Id={props.match.params.Id}/>
            </aside>

            <div>
                모임 생성
            </div>
        </div>

        
    )
}

export default MakeGathering
