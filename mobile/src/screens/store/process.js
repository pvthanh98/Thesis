import React from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import {Button, IconButton, Title} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ProcessModal from '../../components/admin_side/process/modal';

export default function Process(props) {
  const {customer_id, phone, address, name} = props.route.params;
  const [visible, setVisible] = React.useState(false);
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Title style={styles.title}>Thông tin khách hàng</Title>
        <View style={styles.itemRow}>
          <Text style={styles.leftItem}>Tên khách hàng</Text>
          <Text style={styles.rightItem}>{name}</Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.leftItem}>Số điện thoại</Text>
          <Text style={styles.rightItem}>{phone}</Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.leftItem}>Địa chỉ</Text>
          <Text style={styles.rightItem}>{address}</Text>
        </View>
      </View>
      <View style={{flex: 2, justifyContent: 'space-between'}}>
        <View>
          <Title style={styles.title}>Dịch vụ</Title>
          <View style={styles.itemRow}>
            <Text style={[styles.leftItem, {flex: 2, fontWeight: 'bold'}]}>
              Tên Dịch Vụ
            </Text>
            <Text style={[styles.rightItem, {flex: 1, fontWeight: 'bold'}]}>
              Đơn Giá
            </Text>
            <Text style={[styles.rightItem, {flex: 1, fontWeight: 'bold'}]}>
              Số lượng
            </Text>
            <Text style={[styles.rightItem, {flex: 1, fontWeight: 'bold'}]}>
              
            </Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={[styles.leftItem, {flex: 2}]}>OKOKOK OKOKOK OKOKOK OKOKOK OKOKOK OKOKOK</Text>
            <Text style={[styles.rightItem, {flex: 1}]}>1</Text>
            <View style={[styles.rightItem, {flex: 1, flexDirection:"row", alignItems:"center"}]}>
              <Text style={{fontSize:15 }}>1</Text>
            </View>
            <View style={[styles.rightItem, {flex: 1}]}>
              <IconButton
                icon={() => (
                  <MaterialIcon name="delete" color="red" size={16} />
                )}
                onPress={() => setVisible(true)}
                size={16}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row-reverse'}}>
            <IconButton
              icon={() => (
                <MaterialIcon name="add-box" color="green" size={24} />
              )}
              onPress={() => setVisible(true)}
            />
          </View>
        </View>
        <Button mode="contained" color="green">
          Thêm vào hóa đơn
        </Button>
      </View>
      <ProcessModal visible={visible} setVisible={setVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    flex: 1,
  },
  title: {
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    alignItems:"center"
  },
  leftItem: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
  },
  rightItem: {
    flex: 2,
    paddingTop: 16,
    paddingBottom: 16,
  },
});

// const makeBill = () => {
//   setLoadingPage(true);
//   let services = [];
//   let total_cost =0;
//   for(let i=0;i<billTemp.length;i++){
//     total_cost += billTemp[i].price * billTemp[i].quantity;
//     services.push({
//       service_id: billTemp[i].id,
//       quantity: billTemp[i].quantity
//     })
//   }
//   const bill ={
//     customer_id: customerID,
//     total_cost,
//     services,
//   }

//   axios().post('/api/bill',bill)
//   .then(reslt=> {
//     setAndDelayLoading();
//   })
//   .catch(err=>console.log(err));
// }
