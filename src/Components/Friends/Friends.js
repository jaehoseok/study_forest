import React from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

import FriendsTable from './FriendsTable';


const styles = theme => ({
    root: {
    width: "690px",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
    },
    table: {
    minWidth: "690px"
    }
    });

    const customers = [
        {
        'image': 'https://placeimg.com/48/48/1',
        'name': '홍길동',
        },
        {
        'image': 'https://placeimg.com/48/48/2',
        'name': '나동빈',
        },
        {
        'image': 'https://placeimg.com/48/48/3',
        'name': '이순신',
        },
        {
        'image': 'https://placeimg.com/48/48/1',
        'name': '홍길동',
        },
        {
        'image': 'https://placeimg.com/48/48/2',
        'name': '나동빈',
        },
        {
        'image': 'https://placeimg.com/48/48/2',
        'name': '나동빈',
        },
    ]

function Friends(props) {
    return (
        <Paper className={{styles}.root}>
                <div className="friendsTitle">친구목록</div>
                <Table className={styles.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>프로필 사진</TableCell>
                            <TableCell>이름</TableCell>
                            <TableCell>관심사</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map(c=> {return ( <FriendsTable image={c.image} name={c.name}></FriendsTable>)})}
                    </TableBody>
                </Table>
            </Paper>
    )
}

export default withStyles(styles)(Friends);
