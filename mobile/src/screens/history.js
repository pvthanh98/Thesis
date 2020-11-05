import React, {useEffect} from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import HistoryItem from '../components/history/item';
import axios from '../service/axios';
import Loading from '../components/load';
const History = (props) => {
    const [loading, setLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const customer_bill = useSelector(state => state.customer_bill)
    const dispatch = useDispatch();
    useEffect(()=>{
        loadBills();
        console.log("loading bill ")
    },[]);

    const loadBills = (isFirstTime=true) => {
        if(isFirstTime) setLoading(true)
        axios.get('/api/customer/bill')
        .then(res=>{
            dispatch({type:"UPDATE_CUSTOMER_BILLS", bills:res.data});
            if(isFirstTime) setLoading(false);
            else setRefreshing(false)
        })
        .catch(err=>{
            console.log(err)
            if(isFirstTime) setLoading(false);
            else setRefreshing(false)
        });
    }

    const handleRefresh = () => {
        setRefreshing(true)
        loadBills(false);
    }
    if(loading) return <Loading />
    return (
        <View style={styles.container}>
            <FlatList 
                data={customer_bill}
                renderItem={({item})=>(
                    <HistoryItem {...item} navigation={props.navigation} />
                )}
                keyExtractor={item=>item._id}
                refreshing={refreshing}
                onRefresh={handleRefresh}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    }
})

export default History;