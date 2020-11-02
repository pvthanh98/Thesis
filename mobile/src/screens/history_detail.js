import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import {DataTable, Button} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const HistoryDetail = (props) => {
  const params = props.route.params;
  console.log(params.services);
  const renderServices = () => {
    return params.services.map((service) => (
      <DataTable.Row>
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
            {params.confirm ? (
              <MaterialIcon size={20} color="green" name="check-circle" />
            ) : (
              'Chờ xác nhận'
            )}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Thanh toán</DataTable.Cell>
          <DataTable.Cell>
            {params.paid ? (
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
        {!params.confirm && (
          <Button style={{marginTop: 4}} mode="contained" color="#1c7534">
            xác nhận hóa đơn
          </Button>
        )}
        {!params.paid && (
          <Button style={{marginTop: 4}} mode="contained" color="#295a59">
            Thanh Toán PAYPAL
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default HistoryDetail;
