import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Title, Text, IconButton, Colors} from 'react-native-paper';
import {server} from '../../constants/index';
import { Rating } from 'react-native-ratings';
export default (props) => {
  return (
    <View style={styles.infoContainer}>
      <View style={{flexDirection: 'row', paddingLeft: 8, paddingTop: 8}}>
        <View style={{flex: 2}}>
          <Title>{props.selectedStore.name}</Title>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <IconButton
            icon="close"
            animated
            color="red"
            size={20}
            onPress={() => props.setSelectedStore(null)}
          />
        </View>
      </View>
      <View style={styles.store_infoContainer}>
        <View style={styles.store_info}>
          <View style={{flex: 2}}>
            <Text>{props.selectedStore.description}</Text>
            <Text style={{fontSize: 20, alignItems:"center"}}>
              <Icon name="directions-car" color="green" size={20} />{' '}
              {props.selectedStore.distance}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Button
                style={{backgroundColor: '#1976d2'}}
                icon={() => <Icon name="email" color="#fff" size={20} />}
                mode="contained"
                onPress={() =>
                  props.navigation.navigate('chat', {
                    store_id: props.selectedStore.id,
                    store_name: props.selectedStore.name,
                  })
                }>
                Tin Nhắn
              </Button>
              <Button
                style={{marginLeft: 4, backgroundColor: '#dc004e'}}
                icon={() => <Icon color="#fff" name="info" size={20} />}
                mode="contained"
                onPress={() => props.setModalVisible(true)}>
                Cứu hộ
              </Button>
            </View>
          </View>
          <View style={styles.info_right}>
            <Image
              style={{width: 90, height: 90}}
              source={{
                uri: `${server}/images/${props.selectedStore.image}`,
              }}
            />
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <Rating
            startingValue={props.selectedStore ? props.selectedStore.rating.averate : 0}
            readonly
            ratingCount={5}
            imageSize={30}
          />
          <Text style={styles.ratingText}>
              {props.selectedStore && props.selectedStore.rating.total}
            {" "}đánh giá
          </Text>
        </View>
        <View style={styles.btn2Container}>
          <Button color="blue" mode="contained">
              Gửi đánh giá
          </Button>
          <Button 
            style={{marginLeft:8}} 
            color="#e0e0e0" 
            mode="contained"
            onPress={()=>props.navigation.navigate('store_detail',{
              distance:props.selectedStore.distance, 
              store_id: props.selectedStore.id,
              store_name: props.selectedStore.name
            })}
        >
              Thông tin cửa hàng
          </Button>
        </View>
        <View style={styles.btnContainer}>
          <IconButton
            onPress={() => props.getAllLocationAndSort(-1)}
            icon={() => <Icon name="arrow-back" size={24} />}
            size={20}
            color={Colors.red500}
          />
          <IconButton
            onPress={() => props.getAllLocationAndSort(1)}
            color="#0f53bf"
            icon={() => <Icon name="arrow-forward" color="red" size={24} />}
            size={20}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center'
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      calloutContainer: {
        backgroundColor: 'white',
        padding: 12,
        maxWidth:300
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      barContainer: {
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        width: "100%",
        height: 80
      },
      infoContainer: {
        backgroundColor:"#ffffff",
      },
      store_info : {
         width:"100%",
         paddingRight:8,
         paddingLeft:8,
         paddingBottom:8,
         flexDirection:"row"
      },
      info_right: {
        flex:1,
        justifyContent:"center",
        alignItems:"center"
      },
      btnContainer: {
        flexDirection:"row",
        marginTop:8,
        justifyContent:"center"
      },
      someText: {
        position:"absolute",
        top:1,
        left:1
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        marginTop: 22
      },
      modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
      },
      topBox: {
        position:"absolute",
        top:0,
        backgroundColor:"#ddd",
        width:"100%",
        height:50,
        justifyContent:"center",
        alignItems:"center"
      },
      store_infoContainer: {
        width:"100%"
      },
      ratingContainer: {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        padding:8
      },
      ratingText: {
        fontSize:20,
      },
      btn2Container : {
        flexDirection:"row",
        alignItems:"center",
        padding:8
      }
});