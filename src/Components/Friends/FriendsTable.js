import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

import './FriendsTable.css';


function FriendsTable(props) {
    return (
        <TableRow className="Row">
            <TableCell><img className="img" src={props.image} alt="profile"/></TableCell>
            <TableCell>{props.name}</TableCell>
            <TableCell>{props.interest}</TableCell>
        </TableRow>
    )
}

export default FriendsTable
