import React from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import {Title} from 'react-native-paper';
import {DataTable, Button} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { WebView } from 'react-native-webview';
import {server} from '../constants/index';
const HistoryDetail = (props) => {
  const params = props.route.params;
  const [showModal, setShowModal] = React.useState(false);
  const [status, setStatus] = React.useState('pending');
  const [paid, setPaid] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);

  React.useEffect(()=>{
    setPaid(params.paid);
    setConfirm(params.confirm);
  },[])

  const renderServices = () => {
    return params.services.map((service) => (
      <DataTable.Row key={service._id}>
        <DataTable.Cell>{service.service_id.name}</DataTable.Cell>
        <DataTable.Cell>{service.quantity * service.service_id.price} VND</DataTable.Cell>
      </DataTable.Row>
    ));
  };
  const formatDate = (date) => {
    var newDate = new Date(date);
    var day =
      newDate.getDay() >= 10 ? newDate.getDay() : '0' + newDate.getDay();
    var month =
      newDate.getMonth() >= 10 ? newDate.getMonth() : '0' + newDate.getMonth();
    return `${day}/${month}/${newDate.getFullYear()}`;
  };

  const handleResponse = (data) => {
    if(data.title === 'success'){ 
      setShowModal(false);
      setStatus('complete');
      setPaid(true);
    } else if(data.title === 'cancel') {
      setShowModal(false);
      setStatus('cancel')
    }
  }
  return (
    <View style={styles.container}>
      <Title>Thông tin chung</Title>
      <DataTable>
        <DataTable.Row>
          <DataTable.Cell>ID</DataTable.Cell>
          <DataTable.Cell>{params.id}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Ngày</DataTable.Cell>
          <DataTable.Cell>{formatDate(params.timestamp)}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Xác nhận</DataTable.Cell>
          <DataTable.Cell>
            {confirm ? (
              <MaterialIcon size={20} color="green" name="check-circle" />
            ) : (
              'Chờ xác nhận'
            )}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Thanh toán</DataTable.Cell>
          <DataTable.Cell>
            {paid ? (
              <MaterialIcon size={20} color="green" name="check-circle" />
            ) : (
              'Chờ thanh toán'
            )}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Địa điểm</DataTable.Cell>
          <DataTable.Cell>Cần Thơ</DataTable.Cell>
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
      <View style={{flexDirection:"row", justifyContent:"space-between",padding:8}}>
          <Text>Tổng: </Text>
          <Text>{params.total_cost} VND</Text>
      </View>
      <View>
        {!confirm && (
          <Button style={{marginTop: 4}} mode="contained" color="#1c7534">
            xác nhận hóa đơn
          </Button>
        )}
        {!paid && (
          <Button 
            style={{marginTop: 4}} 
            mode="contained" 
            color="#295a59"
            onPress={()=> setShowModal(true)}
          >
            Thanh Toán PAYPAL
          </Button>
        )}
      </View>
      <Modal
        visible={showModal}
        onRequestClose={()=> setShowModal(false)}
      >
        <WebView 
          source={{ uri: `${server}/api/pay/${params.id}/10`}} //chinh lai sau so 10
          onNavigationStateChange={data=> handleResponse(data)}
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
