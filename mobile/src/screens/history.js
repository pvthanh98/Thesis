import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Modal} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import HistoryItem from '../components/history/item';
import axios from '../service/axios';
import Loading from '../components/load';
import {RadioButton} from 'react-native-paper';
const History = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [checked, setChecked] = React.useState('first');
  const [billState, setBillState] = React.useState('1');
  const [refreshing, setRefreshing] = React.useState(false);
  const customer_bill = useSelector((state) => state.customer_bill);
  const modalHistory = useSelector((state) => state.modalHistory);
  const dispatch = useDispatch();
  useEffect(() => {
    loadBills(true, billState);
  }, []);

  const loadBills = (isFirstTime = true, billState) => {
    if (isFirstTime) setLoading(true);
    axios
      .get(`/api/mobile/customer/bill/${billState}`)
      .then((res) => {
        dispatch({type: 'UPDATE_CUSTOMER_BILLS', bills: res.data});
        if (isFirstTime) setLoading(false);
        else setRefreshing(false);
      })
      .catch((err) => {
        console.log(err);
        if (isFirstTime) setLoading(false);
        else setRefreshing(false);
      });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadBills(false);
  };
  const handleCheck = (value) => {
    setChecked(value);
    dispatch({type:"UPDATE_MODAL_HISTORY", state:false})
    loadBills(true, value);
    setBillState(value)
  }
  if (loading) return <Loading />;
  return (
    <View style={styles.container}>
      <FlatList
        data={customer_bill}
        renderItem={({item}) => (
          <HistoryItem {...item} navigation={props.navigation} />
        )}
        keyExtractor={(item) => item._id}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalHistory}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{fontWeight:"bold", fontSize:24}}>Liệt kê theo</Text>
            <View style={{flexDirection:"row", alignItems:"center"}}>
              <RadioButton
                value="0"
                status={checked === '0' ? 'checked' : 'unchecked'}
                onPress={() => handleCheck('0')}
              />
              <Text onPress={() => handleCheck('0')}>Tất cả</Text>
            </View>
            <View style={{flexDirection:"row", alignItems:"center"}}>
                <RadioButton
                    value="1"
                    status={checked === '1' ? 'checked' : 'unchecked'}
                    onPress={() => handleCheck('1')}
                />
              <Text onPress={() => handleCheck('1')}>Chưa xác nhận</Text>
            </View>
            <View style={{flexDirection:"row", alignItems:"center"}}>
                <RadioButton
                value="2"
                status={checked === '2' ? 'checked' : 'unchecked'}
                onPress={() => handleCheck('2')}
                />
              <Text onPress={() => handleCheck('2')}>Chưa thanh toán</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default History;
