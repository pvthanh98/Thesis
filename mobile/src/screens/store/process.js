import React from 'react';
import {View, Text, StyleSheet, Modal, ScrollView, Alert} from 'react-native';
import {Button, IconButton, Title} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ProcessModal from '../../components/admin_side/process/modal';
import axios from '../../service/store_axios';
import NumberFormat from 'react-number-format';
export default function Process(props) {
  const {
    rescue_id,
    customer_id,
    phone,
    address,
    name,
    coordinate,
  } = props.route.params;

  React.useEffect(() => {}, []);

  const [visible, setVisible] = React.useState(false);
  const [services, setServices] = React.useState([]);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const renderServices = () =>
    services.map((e) => (
      <View key={e.id} style={styles.itemRow}>
        <Text style={[styles.leftItem, {flex: 2}]}>{e.name}</Text>
        <NumberFormat
          thousandSeparator
          displayType="text"
          value={e.price}
          suffix=" đ"
          renderText={(value) => (
            <Text
              style={[
                styles.rightItem,
                {flex: 1, color: 'red', fontWeight: 'bold'},
              ]}>
              {value}
            </Text>
          )}
        />
        <View
          style={[
            styles.rightItem,
            {flex: 1, flexDirection: 'row', alignItems: 'center'},
          ]}>
          <Text style={{fontSize: 15}}>{e.quantity}</Text>
        </View>
        <View style={[styles.rightItem, {flex: 1}]}>
          <IconButton
            icon={() => <MaterialIcon name="delete" color="red" size={16} />}
            onPress={() => removeItem(e.id)}
            size={16}
          />
        </View>
      </View>
    ));

  const calculateTotalCost = () => {
    let total_cost = 0;
    services.forEach((e) => {
      total_cost += e.quantity * e.price;
    });
    return total_cost;
  };

  const removeItem = (id) => {
    const index = services.findIndex((e) => e.id === id);
    const newServices = [...services];
    if (index >= 0) {
      newServices.splice(index, 1);
      setServices(newServices);
    }
  };

  const onSubmitBill = () => {
    let service_bill = [];
    let total_cost = 0;
    for (let i = 0; i < services.length; i++) {
      total_cost += services[i].price * services[i].quantity;
      service_bill.push({
        service_id: services[i].id,
        quantity: services[i].quantity,
      });
    }
    const bill = {
      customer_id,
      total_cost,
      services: service_bill,
      coordinate,
      rescue_id,
    };

    axios
      .post('/api/bill', bill)
      .then((reslt) => {
        setIsSuccess(true);
      })
      .catch((err) => console.log(err));
  };

  const onRemoveRescue = (id) => {
    axios
      .post('/api/rescue/remove', {id})
      .then(() => props.navigation.goBack())
      .catch((err) => console.log(err));
  };

  const handleRemoveResuce = (rescue_id) => {
    Alert.alert('', 'Bạn có chắc chắn muốn xóa?', [
      {
        text: 'Hủy',
        style: 'cancel',
        onPress: () => console.log('cancel'),
      },
      {
        text: 'Đồng ý',
        onPress: () => onRemoveRescue(rescue_id),
      },
    ]);
  };

  return (
    <View
      style={[
        styles.container,
        {justifyContent: isSuccess ? 'center' : 'flex-start'},
      ]}>
      {!isSuccess ? (
        <View style={{flex: 1}}>
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
            <ScrollView>
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
                  <IconButton
                    icon={() => (
                      <MaterialIcon name="add-box" color="green" size={20} />
                    )}
                    onPress={() => setVisible(true)}
                  />
                </Text>
              </View>
              <View>
                {renderServices()}
                <View style={styles.itemRow}>
                  <Text style={{paddingTop: 16, paddingBottom: 16}}>
                    Tổng:{' '}
                    <NumberFormat
                      thousandSeparator
                      displayType="text"
                      value={calculateTotalCost()}
                      suffix=" đ"
                      renderText={(value) => (
                        <Text style={{color: 'red', fontWeight: 'bold'}}>
                          {value}
                        </Text>
                      )}
                    />
                  </Text>
                </View>
              </View>
            </ScrollView>
            <Button mode="contained" onPress={onSubmitBill} color="#237534">
              Thêm hóa đơn
            </Button>
            <Button
              style={{marginTop: 4}}
              mode="contained"
              onPress={() => handleRemoveResuce(rescue_id)}
              color="#e0e0e0">
              Xóa cứu hộ
            </Button>
          </View>
          <ProcessModal
            visible={visible}
            setVisible={setVisible}
            services={services}
            setServices={setServices}
          />
        </View>
      ) : (
        <View style={{alignItems: 'center'}}>
          <MaterialIcon name="check-circle" size={140} color="green" />
          <Text style={{fontSize: 24}}>Lập hóa đơn thành công</Text>
          <Button
            mode="contained"
            color="#e0e0e0"
            icon={() => (
              <MaterialIcon name="arrow-back-ios" size={16} color="black" />
            )}
            onPress={() => props.navigation.goBack()}>
            Trở về
          </Button>
        </View>
      )}
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
    alignItems: 'center',
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
