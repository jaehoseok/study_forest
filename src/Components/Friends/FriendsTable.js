import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

import './FriendsTable.css';

function FriendsTable(props) {
    return (
        <div className="rowbody">
            <TableRow className="Row">
                <TableCell className="imgCell"><img className="img" src={props.image} alt="profile"/></TableCell>
                <TableCell className='nameCell'>{props.name}</TableCell>
            </TableRow>
        </div>
    )
}

export default FriendsTable
