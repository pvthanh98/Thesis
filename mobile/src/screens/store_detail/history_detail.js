import React from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
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
        <DataTable.Row key={service._id}>
          <DataTable.Cell>{service.service_id.name}</DataTable.Cell>
          <DataTable.Cell>
            <NumberFormat
              value={service.quantity * service.service_id.price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'đ '}
              renderText={(value) => (
                <Text style={{color: 'red', fontWeight: 'bold'}}>
                  {value}
                </Text>
              )}
            />
            
          </DataTable.Cell>
        </DataTable.Row>
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
    <View style={styles.container}>
      <Title>Thông tin chung</Title>
      <DataTable>
        <DataTable.Row>
          <DataTable.Cell>ID</DataTable.Cell>
          <DataTable.Cell>{id}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Ngày</DataTable.Cell>
          <DataTable.Cell>{bill && formatDate(bill.timestamp)}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Xác nhận</DataTable.Cell>
          <DataTable.Cell>
            {bill && bill.confirm ? (
              <MaterialIcon size={20} color="green" name="check-circle" />
            ) : (
              'Chờ xác nhận'
            )}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Thanh toán</DataTable.Cell>
          <DataTable.Cell>
            {bill && bill.paid ? (
              <MaterialIcon size={20} color="green" name="check-circle" />
            ) : (
              'Chờ thanh toán'
            )}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Địa điểm </DataTable.Cell>
          <DataTable.Cell>{bill && bill.address}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>

      <Title>Dịch vụ</Title>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Tên</DataTable.Title>
          <DataTable.Title>Tổng tiền</DataTable.Title>
        </DataTable.Header>
        {renderServices()}
      </DataTable>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 8,
        }}>
        <Text>Tổng: </Text>
        <Text style={{color: 'red', fontWeight: 'bold'}}>
          $ {bill && bill.total_cost}
        </Text>
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
            style={{marginTop: 4}}
            mode="contained"
            color="#295a59"
            onPress={() => setShowModal(true)}>
            Thanh Toán PAYPAL
          </Button>
        )}
      </View>
      <Modal visible={showModal} onRequestClose={() => setShowModal(false)}>
        <WebView
          source={{
            uri: `${server}/api/pay/${id}/${bill ? bill.total_cost : 0}`,
          }}
          onNavigationStateChange={(data) => handleResponse(data)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default HistoryDetail;
