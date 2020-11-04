import React, {useEffect} from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import HistoryItem from '../components/history/item';
import axios from '../service/axios';
import Loading from '../components/load';
const History = (props) => {
    const [loading, setLoading] = React.useState(true);
    const customer_bill = useSelector(state => state.customer_bill)
    const dispatch = useDispatch();
    useEffect(()=>{
        loadBills();
    },[]);

    const loadBills = () => {
        axios.get('/api/customer/bill')
        .then(res=>{
            dispatch({type:"UPDATE_CUSTOMER_BILLS", bills:res.data});
            setLoading(false);
        })
        .catch(err=>{
            console.log(err)
            setLoading(false);
        });
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