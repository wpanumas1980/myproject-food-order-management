import React, { useContext } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import ShowFood from '../../../components/ShowFood/ShowFood';
import { AuthContext } from "../../../auth/Auth";
// import Navbar from '../../../components/NavBar/NavBar';
const useStyles = makeStyles(() => ({
    mainBody: {
        margin: "0 auto",
        marginTop: 10,
        textAlign: 'center',
        background: '#f5f5f5'
    }
}));

function Home() {
    const classes = useStyles();
    const { currentUser } = useContext(AuthContext);
    // console.log(currentUser.email);
    return (
        <div className={classes.mainBody}>
            <Typography variant="h3" gutterBottom>
                เมนู
      </Typography>
            <ShowFood />
        </div>
    )
}

export default Home
