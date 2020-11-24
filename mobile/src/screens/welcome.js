import React from 'react';
import {View, Text, StyleSheet, StatusBar, TouchableOpacity, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
export default ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#01877c" />
      <View style={styles.header}>
        {/* <Text style={styles.appTitle}>OTO RESCUING</Text> */}
        <Image 
          source={require('../assets/images/logo2.png')} 
          style={{height:150, width:"80%"}}
          resizeMethod="auto"
        />
      </View>
      <Animatable.View 
        style={styles.footer}
        animation="fadeInUpBig"
      >
        <Text style={styles.title}>Let's checking for rescuing store nearby you</Text>
        <Text>Sign in to application</Text>
        <View style={[styles.btnContainer,{marginTop:20}]}>
            <TouchableOpacity onPress={()=> navigation.navigate('login')}>
                <View style={[styles.btn,{backgroundColor:"#01877c"}]}>
                    <Text style={{color:"#fff"}}>
                        Login as user
                    </Text>
                    <MaterialIcons name="navigate-next" color="#fff" size={20} />
                </View>  
            </TouchableOpacity>
        </View>
        <View style={[styles.btnContainer,{marginTop:4}]}>
            <TouchableOpacity
              onPress={()=>navigation.navigate("store_login")}
            >
                <View style={[styles.btn,{backgroundColor:"#69737f"}]}>
                    <Text style={{color:"#fff"}}>
                        Login as store
                    </Text>
                    <MaterialIcons name="navigate-next" color="#fff" size={20} />
                </View>  
            </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01877c',
  },
  header: {
    justifyContent:"center",
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
      width:180
  },
  appTitle: {
      color:"#fff",
      fontSize:30
  }
});
