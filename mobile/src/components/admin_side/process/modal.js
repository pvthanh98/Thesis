import React from 'react';
import {View, Text, StyleSheet, Modal, TextInput} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import axios from '../../../service/store_axios';
import Materialicon from 'react-native-vector-icons/MaterialIcons';
export default function (props) {
  const [input, setInput] = React.useState('');
  const [searchList, setSearchList] = React.useState([]);
  const addServices = (id,name,price) => {
    let newServices = [...props.services];
    let index = newServices.findIndex(e=>e.id===id);
    console.log(index);
    if(index<0){
      newServices.push({id,name,price,quantity:1});
    } else {
      newServices[index].quantity = newServices[index].quantity+1;
    }
    props.setServices(newServices);
  }
  const renderResults = () =>
    searchList.map((result) => (
      <View
        key={result._id}
        style={{
          flexDirection: 'row',
          padding: 8,
          alignItems: 'center',
          borderBottomColor: '#ddd',
          borderBottomWidth: 1,
        }}>
        <View style={{padding: 4, flex: 3}}>
          <Text>{result.name}</Text>
        </View>
        <View style={{padding: 4, flex: 1}}>
          <Text style={{color: 'red', fontWeight: 'bold'}}>
            $ {result.price}
          </Text>
        </View>
        <View style={{padding: 4, flex: 1}}>
          <IconButton
            icon={() => <Materialicon name="add-box" color="green" size={24} />}
            onPress={()=>addServices(result._id,result.name,result.price)}
            size={24}
          />
        </View>
      </View>
    ));
  const handeSearch = () => {
    if (input != '') {
      axios
        .get(`/api/service/search/${input}`)
        .then(({data}) => {
          setSearchList(data);
        })
        .catch((err) => setLoading(false));
    }
  };
  return (
    <Modal visible={props.visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.centerView}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                placeholder="Tìm kiếm sản phẩm"
                value={input}
                onChangeText={(text) => setInput(text)}
                style={{
                  flex: 1,
                  borderBottomWidth: 1,
                  borderBottomColor: '#ddd',
                }}
              />
              <IconButton
                icon={() => <Materialicon name="search" size={34} />}
                onPress={handeSearch}
                size={34}
              />
            </View>
            {renderResults()}
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Button onPress={()=>props.setVisible(false)} mode="contained" color="red" style={{marginLeft: 4}}>
              Hủy
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centerView: {
    justifyContent: 'space-between',
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
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
