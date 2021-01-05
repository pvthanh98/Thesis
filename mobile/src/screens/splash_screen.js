import React from 'react';
import {View, Text, StyleSheet, StatusBar, Image,ActivityIndicator} from 'react-native';

export default ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#01877c" />
      <View style={styles.header}>
        {/* <Text style={styles.appTitle}>OTO RESCUING</Text> */}
        <Image 
          source={require('../assets/images/logo1.png')} 
          style={{height:200, width:"100%"}}
          resizeMethod="auto"
        />
        <Text style={{fontSize:40, color:"white", fontFamily:"sans-serif"}}>OTO RESCUING</Text>
        <ActivityIndicator size="large" color="#fff" />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01877c',
  },
  header: {

    alignItems:"center",
    flex:2
  },
  footer: {
    flex:1,
    backgroundColor:"#fff",
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    paddingVertical:50,
    paddingHorizontal:30
  },
  title : {
    fontSize:28,
    fontWeight:"bold"
  },
  btnContainer: {
      width: "100%",
      flexDirection:"row",
      justifyContent:"flex-end"
  },
  btn :{ 
      padding:8,
      borderRadius:30,
      paddingHorizontal:30,
      alignItems:"center",
      justifyContent:"center",
      flexDirection:"row",
      width:210
  },
  appTitle: {
      color:"#fff",
      fontSize:30
  }
});

// import React from 'react';
// import login_style from '../assets/styles/login_style';
// import {
//     View, Text, StyleSheet, ActivityIndicator,StatusBar
// } from 'react-native';
// const styles = StyleSheet.create(login_style())
// export default () => {
//     return (
//         <View style={styles.container}>
//             <StatusBar backgroundColor='#295a59' barStyle="light-content"/>
//             <Text style={styles.welcome}>OTO RESCUING</Text>
//             <ActivityIndicator size="large" color="#fff" />
//         </View>
//     )
// }
