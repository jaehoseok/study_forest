import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

import './Friends.css';

function Friends(props) {
    return (
        <div>
            <TableRow>
                <TableCell className="imgCell"><img className="img" src={props.image} alt="profile"/></TableCell>
                <TableCell className='nameCell'>{props.name}</TableCell>
            </TableRow>
        </div>
    )
}

export default Friends
