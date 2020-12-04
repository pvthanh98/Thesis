import React from 'react';
import Navbar from '../../components/user_ui/navbar';
import Footer from '../../components/user_ui/footer';
import {Grid, Typography, Container, IconButton, Button} from '@material-ui/core';
import {useSelector} from 'react-redux';
import Card from '../../components/user_ui/store_list/card_store';
import axios from '../../service/axios_user';
import Loading from '../../components/user_ui/loading';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default (props) => {
    const [storeByRating, setStoreByRating] = React.useState([]);
    const [storeBySale, setStoreBySale] = React.useState([]);
    const [ratingPage, setRatingPage] = React.useState(1);
    const [ratingTotalPage, setRatingTotalPage] = React.useState(1);
    const [isLoadingRating, setIsloadingRating] = React.useState(false);
    const [firstLoading, setFirstLoading] = React.useState(true);
    const [searchValue, setSearchValue] = React.useState("");
    const [cities, setCities] = React.useState(null);
    const [citySelected, setCitySelected] = React.useState(1);
    const [searchMode, setSearchMode] = React.useState(false);
    const [storeSearchvalues, setStoresSearchValue] = React.useState(null)

    React.useEffect(()=>{
        loadStoreByRating(ratingPage, citySelected);
        loadStoreBySale();
        loadCity();
    },[]);

    const loadStoreByRating = (page,city, reload=false) => {
        setIsloadingRating(true);
        axios().get(`/api/store/rating/page/${page}/city/${city}`)
        .then(({data})=>{ 
            if(!reload){
                let newData = storeByRating.concat(data.stores)
                setStoreByRating(newData);
            } else {
                setStoreByRating(data.stores)
            }
            
            setRatingTotalPage(data.total_page);
            setIsloadingRating(false);
            setFirstLoading(false);
        })
        .catch(err=>{console.log(err); setIsloadingRating(false); setFirstLoading(false);})
    }
    const loadCity = () => {
        axios().get(`/api/city`)
        .then(({data})=>{
            setCities(data)
        })
    }

    const loadStoreBySale =() => {
        axios().get("/api/store/sell")
        .then(({data})=>{   
            setStoreBySale(data)
        })
        .catch(err=>console.log(err))
    }

    const onChangeRatingPage = () => {
        setRatingPage(ratingPage+1);
        loadStoreByRating(ratingPage+1,citySelected);
    }

    const onChangeSelectCity = (e) => {
        setCitySelected(e.target.value);
        setRatingPage(1)
        loadStoreByRating(1,e.target.value, true)
    }

    const renderCity = () => (
        cities && cities.map(e=> <MenuItem key={e._id} value={e._id}>{e.name}</MenuItem>)
    )

    const onSubmitSearch = () => {
        setSearchMode(true)
        axios().get('/api/store/search/'+searchValue)
        .then(res=>setStoresSearchValue(res.data))
        .catch(err=>console.log(err))
    }

    const renderStores = storeByRating.map(store=>{
        return  <Grid key={store._id} item xs={12} sm={12} md={3}>
                    <Card 
                        id={store._id}
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
        return  <Grid item key={store._id} xs={12} sm={12} md={3}>
                    <Card 
                        id={store._id}
                        key={store._id}
                        name={store.name}
                        description={store.description}
                        image={store.image}
                        address={store.address}
                        star={store.rating.total}
                    />
                </Grid>
    })
    const renderStoreSearching = storeSearchvalues && storeSearchvalues.map(store=>{
        return  <Grid key={store._id} item xs={12} sm={12} md={3}>
                    <Card 
                        id={store._id}
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
            {!searchMode ? 
                <Container>
                {!firstLoading ?<Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
                        <div style={{display:"flex",flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                            <Typography style={{marginTop:"8px"}} color="primary" variant="h4">
                                TOP RATING
                            </Typography>
                            <div>
                                Thành Phố
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    style={{marginLeft:"8px", width:"200px"}}
                                    value={citySelected}
                                    onChange={onChangeSelectCity}
                                >
                                    <MenuItem value={1}>Tất cả</MenuItem>
                                    {renderCity()}
                                </Select>
                                
                            </div>
                            {isLoadingRating && <Loading />   }
                            <div className="search-custom" style={{marginTop:"12px"}}>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchValue}
                                    onChange={e=>setSearchValue(e.target.value)}
                                />
                                <Button onClick={onSubmitSearch}>
                                    <img src="/images/searching.svg" height="25px" />
                                </Button>
                            </div>
                        </div>
                    </Grid>  
                    {renderStores}
                    <Grid item xs={12} sm={12} md={12}>
                    
                        {(storeByRating.length>0 && (ratingTotalPage - ratingPage) > 0)  && 
                            
                        <div style={{textAlign:"center"}}>
                            {isLoadingRating && <Loading />}
                            <IconButton 
                                style={{marginTop:"3px"}}
                                variant="contained" 
                                color="primary"
                                onClick={onChangeRatingPage}
                            >
                                XEM THÊM ({ratingTotalPage - ratingPage})
                            </IconButton>   
                        </div>}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography style={{marginTop:"8px"}} color="primary" variant="h4">
                            TOP BEST SELLER
                        </Typography>
                    </Grid>
                    {renderStoresBySale}
                </Grid> 
                : <Loading />    
            }
            </Container>
            :
            <Container style={{minHeight:window.innerHeight-(window.innerHeight*0.3)}}>
                <Grid container spacing={2}>
                    <Grid item md={12}>
                        <Typography variant="h6" style={{marginTop:"8px"}}>
                            KẾT QUẢ TÌM KIẾM
                        </Typography>
                        <Typography variant="body1">
                            Tên Cửa Hàng: {searchValue}
                        </Typography>
                    </Grid>
                    {renderStoreSearching ? renderStoreSearching : "loading..."}
                </Grid>
            </Container>
            }
          <Footer />
        </div>
    )
}
