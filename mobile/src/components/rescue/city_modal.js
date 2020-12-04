import React from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Button} from 'react-native-paper';
export default (props) => {
  const {visible, cities, citySelected, setCitySelected, setVisible, loadingCityName} = props;
  const renderCityItem = () =>
    cities &&
    cities.map((e) => <Picker.Item key={e._id} label={e.name} value={e._id} />);
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <View style={styles.centerView}>
          <Text style={{marginLeft: 4}}>Thành phố bạn đang ở</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Picker
              selectedValue={citySelected}
              style={{height: 50, flex: 1}}
              onValueChange={(itemValue, itemIndex) => {
                setCitySelected(itemValue);
              }}>
              <Picker.Item label={'Chọn Thành phố...'} value={''} />
              {renderCityItem()}
            </Picker>
            <Button style={{width: 100}} onPress={()=>{
              props.setCurrentCity(props.citySelected)
              setVisible(false);
            }} mode="contained">
              CHỌN
            </Button>
          </View>
          {loadingCityName && <Text style={{marginLeft:8}}>Đang tìm thành phố bạn ở...</Text>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  centerView: {
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
