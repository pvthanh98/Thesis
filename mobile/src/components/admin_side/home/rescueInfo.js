import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button,IconButton} from 'react-native-paper';
export default ({selectedOto, rescueList,setSelectedOto, getDirection}) => {
  const navigateRescueNext = () =>{ 
    const index = rescueList.findIndex((e)=>e._id===selectedOto._id)
    if(index>=0){
      let nextIndex = index + 1;
       if(nextIndex===rescueList.length) {
          setSelectedOto({...rescueList[0]});
          getDirection(rescueList[0].coordinate.lat,rescueList[0].coordinate.lng)
       }
       if(nextIndex < rescueList.length) {
          setSelectedOto({...rescueList[nextIndex]});
          getDirection(rescueList[nextIndex].coordinate.lat,rescueList[nextIndex].coordinate.lng)
       }
    }
  }
  const navigateRescuePrevious = () =>{ 
    const index = rescueList.findIndex((e)=>e._id===selectedOto._id)
    if(index>=0){
      let previousIndex = index - 1;
       if(previousIndex<0) {
        setSelectedOto({...rescueList[rescueList.length-1]});
        getDirection(rescueList[rescueList.length-1].coordinate.lat, rescueList[rescueList.length-1].coordinate.lng)
       }
       if(previousIndex >=0) {
        setSelectedOto({...rescueList[previousIndex]})
        getDirection(rescueList[previousIndex].coordinate.lat, rescueList[previousIndex].coordinate.lng)
       }
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <View style={styles.info}>
          <View style={styles.itemInfo}>
            <MaterialIcon name="person" color="#962803" size={22} />
            <Text style={styles.text}>{selectedOto.customer_id.name}</Text>
          </View>
          <View style={styles.itemInfo}>
            <MaterialIcon name="directions-car" color="#962803" size={22} />
            <Text style={styles.text}>{selectedOto.distance ? selectedOto.distance.text: ""}</Text>
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
            onPress={() => console.log('send messgage', selectedOto.customer_id)}
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
          onPress={navigateRescuePrevious}
          size={20}
        />
        <IconButton
          icon={()=><MaterialCommunityIcon size={28} color="green" name="skip-next-circle" />}
          onPress={navigateRescueNext}
          size={16}
        />    
        <View style={{position:"absolute", right:-10, bottom:-15}}>
          <IconButton
            icon={()=><MaterialIcon size={18} color="red" name="cancel" />}
            onPress={()=>setSelectedOto(null)}
            size={16}
          />  
        </View>
      </View>

    </View>
  );
};
const styles = StyleSheet.create({
  container:{width:"100%",backgroundColor:"#fff"},
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
    borderTopColor:"#ddd",
    position:"relative",
  }
});
