import React, {useEffect} from 'react';

import axios from 'axios';


import FriendsTable from './FriendsTable';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import './Friends.css';



    const customers = [
        {
        'image': 'https://placeimg.com/48/48/1',
        'name': '홍길동',
        'interest' : '주제이름'
        },
        {

        'image': 'https://placeimg.com/48/48/2',
        'name': '나동빈',
        'interest' : ['주제이름']
        },
        {
        'image': 'https://placeimg.com/48/48/3',
        'name': '이순신',
        'interest' : ['주제1', '주제2', '주제3']
        },
        {
        'image': 'https://placeimg.com/48/48/1',
        'name': '홍길동',
        'interest' : ['주제이름']
        },
        {
        'image': 'https://placeimg.com/48/48/2',
        'name': '나동빈',
        'interest' : ['주제이름']
        },
        {
        'image': 'https://placeimg.com/48/48/2',
        'name': '나동빈',
        'interest' : ['주제이름']
        },
    ]

function Friends() {
    return (
        <Paper className="TableBox">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>프로필 사진</TableCell>
                        <TableCell>이름</TableCell>
                        <TableCell>관심주제</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {customers.map(c => {
                    return <FriendsTable image={c.image} name={c.name} interest={c.interest}/>
                    })}
                </TableBody>
            </Table>
        </Paper>
    )
}

export default Friends;
