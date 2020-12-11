import { Paper } from '@material-ui/core'
import React from 'react'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: 2,
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

function GroupCard() {
    const classes = useStyles;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={16}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src="https://source.unsplash.com/?food" />
                        </ButtonBase>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default GroupCard
