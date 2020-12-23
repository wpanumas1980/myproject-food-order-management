import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import { Button, Container, Grid, IconButton, TextField, Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    cover: {
        width: 151,
    },
});

let id = 0;
function createData(fname, ftype, fspicy, fegg, fcomment, fprice, qty, totalprice, action) {
    id += 1;
    return { id, fname, ftype, fspicy, fegg, fcomment, fprice, qty, totalprice, action };
}

const rows = [
    createData('ต้มยำกุ้ง', 'พิเศษ', 4.0, 'ไข่ดาว', 'ขอข้าวเยอะๆ', 59),
    createData('ผัดผักบุ้ง', 'ธรรมดา', 1.0, 'ไข่เจียว', '', 29),
    createData('ยำรวมมิตร', 'พิเศษ', 3.0, 'ไข่ดาว', 'ไม่ใส่หอม', 69),

];
const handleDelete = (id) => {
    console.log(id);
}

function ProductCart(props) {
    const { classes } = props;

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                รายการอาหาร
      </Typography>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow >
                        <TableCell style={{ fontWeight: 'bold', fontSize: '18px' }}>รายการสินค้า</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '18px' }}></TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '18px' }} align="center">จำนวน</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '18px' }} align="right">ราคา</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '18px' }} align="right">รวม</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '18px' }} align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id} >
                            <TableCell component="th" scope="row" align='center'>
                                <img
                                    width='100px'
                                    height='100px'
                                    src="https://source.unsplash.com/random"
                                />
                            </TableCell>
                            <TableCell align="left" style={{ padding: 0 }}>
                                <Typography variant="h5" component="h1" color="inherit" gutterBottom>
                                    {row.fname}
                                </Typography>
                                <div>
                                    <Typography variant="p" color="textSecondary" style={{ fontSize: "18px" }} gutterBottom>
                                        ขนาด:
                                        </Typography>
                                    <Typography variant="p" color="textSecondary" style={{ fontSize: "18px", paddingLeft: "5px" }} gutterBottom>
                                        {row.ftype}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant="p" color="textSecondary" style={{ fontSize: "18px" }} gutterBottom>
                                        ความเผ็ด:
                                        </Typography>
                                    <Typography variant="p" color="textSecondary" style={{ fontSize: "18px", paddingLeft: "5px" }} gutterBottom>
                                        {row.fspicy}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant="p" color="textSecondary" style={{ fontSize: "18px" }} gutterBottom>
                                        ไข่:
                                        </Typography>
                                    <Typography variant="p" color="textSecondary" style={{ fontSize: "18px" }} gutterBottom>
                                        {row.fegg}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant="p" color="textSecondary" style={{ fontSize: "18px" }} gutterBottom>
                                        เพิ่มเติม:
                                        </Typography>
                                    <Typography variant="p" color="textSecondary" style={{ fontSize: "18px" }} gutterBottom>
                                        {row.fcomment}
                                    </Typography>
                                </div>
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    id="outlined-number"
                                    type="number"
                                    variant="outlined"
                                    defaultValue={1}
                                />
                            </TableCell>
                            <TableCell align="right">{row.fprice}</TableCell>
                            <TableCell align="right">59</TableCell>
                            <TableCell align="center">
                                <IconButton onClick={() => handleDelete(row.id)} color="secondary" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table >
            <Divider />
            <Grid container spacing={3} justify='flex-end' style={{ marginTop: '5px' }}>
                <Grid item>
                    <Typography variant="h4" gutterBottom>
                        รวม
                    </Typography>
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-number"
                        type="number"
                        variant="outlined"
                        defaultValue={1}
                    />
                </Grid>
                <Grid item>
                    <Typography variant="h4" gutterBottom>
                        บาท
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" size="large" color="primary" className={classes.margin}>
                        ยืนยันการสั่งซื้อ
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

ProductCart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCart);