import React from 'react';
import {View, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Avatar, Title, DataTable, Button, Text} from 'react-native-paper';
import {server} from '../constants/index';
class UserInfo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Avatar.Image
          size={150}
          source={{
            uri: `${server}/images/tuanh.jpg`,
          }}
        />
        <Title>Huỳnh Thị Tú Anh</Title>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>Email</DataTable.Cell>
            <DataTable.Cell>httanh@gmail.com</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Address</DataTable.Cell>
            <DataTable.Cell>Can Tho</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Phone</DataTable.Cell>
            <DataTable.Cell>0986940591</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <View style={styles.btnContainer}>
          <Button mode="contained" onPress={() => console.log('Pressed')}>
            Update
          </Button>
        </View>
        <View style={{width:"100%", alignItems:"center"}}>
            <TouchableOpacity>
              <Text style={styles.link}>Your history rescuing</Text>
            </TouchableOpacity>
        </View>
      </View>
    ); 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    padding:4
  },
  link :{
    textDecorationLine:"underline",
    color:"blue"
  }
});

export default UserInfo;
