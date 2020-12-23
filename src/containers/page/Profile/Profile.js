import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { firestore } from '../../../config/firebase';

import { AuthContext } from "../../../auth/Auth";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    operate: {
        border: 'none',
        background: 'orange',
        color:'red'
    },
    finished: {
        border: 'none',
        background: 'green',
        color: 'white'
    }
});


export default function Profile() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const [order, setOrder] = useState([]);

    const imgEgg = (egg) => {
        if (egg === '1') {
            return 'ไข่ดาว'
        } else if (egg === '2') {
            return 'ไข่เจียว'
        } else {
            return ""
        }
    }

    //REALTIME GET FUNCTION
    const getAllOrder = () => {
        const orderRef = firestore.collection('foodOrder');
        setLoading(true);
        orderRef
            .where('email', '==', currentUser.email)
            .onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push(doc.data());
                });
                setOrder(items);
                setLoading(false);
            });
    }

    useEffect(() => {
        getAllOrder();
    }, []);

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "80vh",
                }}
            >
                <h1>Loading ...</h1>
            </div>
        );
    }
    console.log(order);
    // const {name, egg, foodSize,spicy,qty,status,option,orderId} = order[]
    return (
        <Container maxWidth="md" style={{ marginTop: '10px' }}>
            <Typography variant="h3" gutterBottom>
                รายการสั่งซื้อ
                </Typography>
            <TableContainer component={Paper}>

                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>รายการ</TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">ไข่</TableCell>
                            <TableCell align="center">ขนาด</TableCell>
                            <TableCell align="center">ความเผ็ด</TableCell>
                            <TableCell align="center">เพิ่มเติม</TableCell>
                            <TableCell align="center">สถานะ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.map((order) => (
                            // getImage(order.foodId)
                            <TableRow key={order.foodId}>
                                <TableCell align="center">
                                    <img
                                        src={order.fileUrl}
                                        width={'100x'}
                                    />
                                </TableCell>
                                <TableCell align="center">{order.name}</TableCell>
                                <TableCell align="center">{imgEgg(order.egg)}</TableCell>
                                <TableCell align="center">{order.foodSize === '2' ? 'พิเศษ' : 'ธรรมดา'}</TableCell>
                                <TableCell align="center">{order.spicy}</TableCell>
                                <TableCell align="center">{order.option}</TableCell>
                                <TableCell align="center">
                                    <Typography variant="h6"
                                        className={order.status === 'เสร็จแล้ว' ? classes.finished : classes.operate}
                                        gutterBottom
                                    >
                                        {order.status}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
