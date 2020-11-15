import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button,IconButton} from 'react-native-paper';
export default ({selectedOto}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <View style={styles.info}>
          <View style={styles.itemInfo}>
            <MaterialIcon name="person" color="#962803" size={22} />
            <Text style={styles.text}>{selectedOto.customer.name}</Text>
          </View>
          <View style={styles.itemInfo}>
            <MaterialIcon name="phone" color="#962803" size={22} />
            <Text style={styles.text}>{selectedOto.customer.phone}</Text>
          </View>
          <View style={styles.itemInfo}>
            <MaterialIcon
              name="home-repair-service"
              color="#962803"
              size={22}
            />
            <Text style={styles.text}>{selectedOto.problem.name}</Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button
            icon={() => <MaterialIcon color="#fff" name="phone" size={24} />}
            onPress={() => console.log('ok')}
            mode="contained"
            color="#2266b7"
          >
            CALL
          </Button>
          <Button
            icon={() => <MaterialIcon color="#fff" name="message" size={24} />}
            onPress={() => console.log('send messgage', selectedOto.customer)}
            mode="contained"
            color="#69737f"
            style={{marginTop: 4}}
          >
            SEND
          </Button>
         
        </View>
      </View>
      <View style={styles.pagination}>
        <IconButton
          icon={()=><MaterialCommunityIcon size={28}  color="black" name="skip-previous-circle" />}
          onPress={()=>console.log("ok")}
          size={20}
        />
        <IconButton
          icon={()=><MaterialCommunityIcon size={28} color="green" name="skip-next-circle" />}
          onPress={()=>console.log("ok")}
          size={16}
        />    
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container:{width:"100%",backgroundColor:"#fff", padding: 8},
  topBox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding:4
  },
  itemInfo: {
    flexDirection: 'row',
    padding: 4,
  },
  text: {
    marginLeft: 4,
    fontSize: 16,
  },
  pagination: {
    alignItems:"center",
    flexDirection:"row",
    justifyContent:"center",
    borderTopWidth:1,
    borderTopColor:"#ddd"
  }
});
