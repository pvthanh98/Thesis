import React from 'react';
import {View, Text, StyleSheet, Modal, ScrollView} from 'react-native';
import {Title} from 'react-native-paper';
import {DataTable, Button} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {WebView} from 'react-native-webview';
import {server} from '../constants/index';
import axios from '../service/axios';
import NumberFormat from 'react-number-format';
const HistoryDetail = (props) => {
  const {id} = props.route.params;
  const [showModal, setShowModal] = React.useState(false);
  const [status, setStatus] = React.useState('pending');
  const [bill, setBill] = React.useState(null);

  React.useEffect(() => {
    loadBill();
  }, []);

  const loadBill = () => {
    axios
      .get(`/api/user_bill/id/${id}`)
      .then((resl) => {
        setBill(resl.data);
        //console.log(resl.data)
      })
      .catch((err) => console.log(err));
  };

  const renderServices = () => {
    return (
      bill &&
      bill.services.map((service) => (
        <View style={styles.item} key={service._id}>
          <Text style={styles.itemRow}>{service.service_id.name}</Text>
          <Text style={styles.itemRow}>
            <NumberFormat
              value={service.quantity * service.service_id.price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'đ '}
              renderText={(value) => (
                <Text style={{color: 'red', fontWeight: 'bold'}}>{value}</Text>
              )}
            />
          </Text>
        </View>
      ))
    );
  };
  const formatDate = (date) => {
    var newDate = new Date(date);
    var day =
      newDate.getDate() + 1 >= 10
        ? newDate.getDate() + 1
        : '0' + newDate.getDate() + 1;
    var month =
      newDate.getMonth() + 1 >= 10
        ? newDate.getMonth() + 1
        : '0' + newDate.getMonth() + 1;
    return `${day}/${month}/${newDate.getFullYear()}`;
  };

  const handleResponse = (data) => {
    if (data.title === 'success') {
      setShowModal(false);
      setStatus('complete');
      loadBill();
    } else if (data.title === 'cancel') {
      setStatus('cancel');
    }
  };

  const confirmPayment = () => {
    axios
      .get(`/api/user_bill/confirm/${id}`)
      .then(() => loadBill())
      .catch((err) => console.log(err));
  };
  return (
    <ScrollView style={styles.container}>
      <Title>Thông tin chung</Title>
      <View>
        <View style={styles.item}>
          <Text style={styles.itemRow}>ID</Text>
          <Text style={styles.itemRow}>{id}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemRow}>Ngày</Text>
          <Text style={styles.itemRow}>
            {bill && formatDate(bill.timestamp)}
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemRow}>Xác nhận</Text>
          <Text style={styles.itemRow}>
            {bill && bill.confirm ? (
              <MaterialIcon size={20} color="green" name="check-circle" />
            ) : (
              'Chờ xác nhận'
            )}
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemRow}>Thanh toán</Text>
          <Text style={styles.itemRow}>
            {bill && bill.paid ? (
              <MaterialIcon size={20} color="green" name="check-circle" />
            ) : (
              'Chờ thanh toán'
            )}
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemRow}>Địa điểm</Text>
          <Text style={styles.itemRow}>{bill && bill.address}</Text>
        </View>
      </View>
      <Title>Dịch vụ</Title>
      <View>
        <View style={styles.item}>
          <Text style={styles.itemRow}>Tên</Text>
          <Text style={styles.itemRow}>Tổng tiền</Text>
        </View>
        {renderServices()}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 8,
        }}>
        <Text>Tổng: </Text>
        {bill && (
          <NumberFormat
            value={bill.total_cost}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'đ '}
            renderText={(value) => (
              <Text style={{color: 'red', fontWeight: 'bold'}}>{value}</Text>
            )}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 8,
        }}>
        <Text> </Text>
        {bill && (
          <NumberFormat
            value={(Math.round(bill.total_cost/23000))}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$ '}
            renderText={(value) => (
              <Text style={{color: 'red', fontWeight: 'bold'}}>{value}</Text>
            )}
          />
        )}
      </View>
      <View>
        {bill && !bill.confirm && (
          <Button
            style={{marginTop: 4}}
            mode="contained"
            color="#1c7534"
            onPress={confirmPayment}>
            xác nhận hóa đơn
          </Button>
        )}
        {bill && !bill.paid && (
          <Button
            style={{marginTop: 4, marginBottom:4}}
            mode="contained"
            color="#295a59"
            onPress={() => setShowModal(true)}>
            Thanh Toán PAYPAL
          </Button>
        )}
        <View style={{height:40}}>
        </View>
      </View>
      <Modal visible={showModal} onRequestClose={() => setShowModal(false)}>
        <WebView
          source={{
            uri: `${server}/api/pay/${id}/${bill ? (Math.round(bill.total_cost/23000)) : 0}`,
          }}
          onNavigationStateChange={(data) => handleResponse(data)}
        />
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemRow: {
    flex: 1,
    padding: 12,
  },
});

export default HistoryDetail;
