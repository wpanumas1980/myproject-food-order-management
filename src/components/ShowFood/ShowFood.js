import React, { useEffect, useState } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import FoodCard from '../FoodCard/FoodCard';

import { firestore } from '../../config/firebase';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

/* connect firebase  */

export default function ShowFood() {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [allFood, setAllFood] = useState([]);

  //ONE TIME GET FUNCTION
  const getAllFood = () => {
    const foodRef = firestore.collection('food');
    setLoading(true);
    foodRef
    .get()
    .then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setAllFood(items);
      setLoading(false);
    });
  }

  useEffect(() => {
   getAllFood();
  }, [])

  //REALTIME GET FUNCTION
  // const  getAllData = () => {
  //     setLoading(true);
  //     foodRef.onSnapshot((querySnapshot) => {
  //       const items = [];
  //       querySnapshot.forEach((doc) => {
  //         items.push(doc.data());
  //       });
  //       setData(items);
  //       setLoading(false);
  //     });
  //   }

    return (
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={2}>
          {allFood.map((food, idx) => <FoodCard key={idx} food={food} />)}
        </Grid>
      </Container>
    )
  }
