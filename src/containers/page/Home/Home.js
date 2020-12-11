import { makeStyles } from '@material-ui/core';
import FoodRow from '../../../components/FoodRow/FoodRow';
import ProductCarousel from '../../../components/ProductCarousel/ProductCarousel';

const useStyles = makeStyles((theme) => ({
    mainBody: {
        width: "80%",
        margin: "0 auto",
        marginTop:10,
        textAlign: 'center',
        background: '#f5f5f5'
    }
}));

function Home() {
    const classes = useStyles();
    return (
        <div className={classes.mainBody}>
            <ProductCarousel />     
            <FoodRow />
        </div>
    )
}

export default Home
