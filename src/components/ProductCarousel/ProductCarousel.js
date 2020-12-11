import { Card, CardMedia, makeStyles } from '@material-ui/core';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import img2 from '../../img/f-002.jpg';
import img3 from '../../img/f-003.jpg';
import img4 from '../../img/f-004.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100%",
    },
    carouselStyle: {
        width:"70%",
        margin:"0 auto", 
        padding: "20px 100px",  
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));


function Item(props) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={props.item.image}
            />
        </Card>
    )
}

export default function ProductCarousel() {
    var items = [
        {
            name: "Random Name #1",
            image: img2
        },
        {
            name: "Random Name #2",
            image: img3
        },
        {
            name: "Random Name #3",
            image: img4
        }
    ];

    const classes = useStyles();
    return (
        <div className={classes.carouselStyle}>
            <Carousel  animation={"slide"} >
                {
                    items.map((item, i) => <Item key={i} item={item} />)
                }
            </Carousel>
        </div>

    );
}


