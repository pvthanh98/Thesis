import React from 'react';
import Navbar from '../../components/user_ui/navbar';
import Footer from '../../components/user_ui/footer';
import {Grid, Typography, Container} from '@material-ui/core';
import {useSelector} from 'react-redux';
import Card from '../../components/user_ui/store_list/card_store';
import axios from '../../service/axios_user';
export default (props) => {
    const [storeByRating, setStoreByRating] = React.useState([]);
    const [storeBySale, setStoreBySale] = React.useState([]);
    React.useEffect(()=>{
        loadStoreByRating();
        loadStoreBySale();
    },[]);

    const loadStoreByRating = () => {
        axios().get("/api/store/rating")
        .then(({data})=>{   
            setStoreByRating(data)
        })
        .catch(err=>console.log(err))
    }

    const loadStoreBySale =() => {
        axios().get("/api/store/sell")
        .then(({data})=>{   
            setStoreBySale(data)
        })
        .catch(err=>console.log(err))
    }

    const renderStores = storeByRating.map(store=>{
        return  <Grid item xs={12} sm={12} md={3}>
                    <Card 
                        key={store._id}
                        name={store.name}
                        description={store.description}
                        image={store.image}
                        address={store.address}
                        star={store.rating.total}
                    />
                </Grid>
    })

    const renderStoresBySale = storeBySale.map(store=>{
        return  <Grid item xs={12} sm={12} md={3}>
                    <Card 
                        key={store._id}
                        name={store.name}
                        description={store.description}
                        image={store.image}
                        address={store.address}
                        star={store.rating.total}
                    />
                </Grid>
    })

    return (
        <div>
            <Navbar />
            <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography style={{marginTop:"8px"}} color="primary" variant="h4">
                        TOP RATING
                    </Typography>
                </Grid>
                {renderStores}
                <Grid item xs={12} sm={12} md={12}>
                    <Typography style={{marginTop:"8px"}} color="primary" variant="h4">
                        TOP BEST SELLER
                    </Typography>
                </Grid>
                {renderStoresBySale}
            </Grid>
            </Container>
          <Footer />
        </div>
    )
}
