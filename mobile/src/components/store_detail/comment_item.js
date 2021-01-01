import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Title} from 'react-native-paper';
import {AirbnbRating} from 'react-native-ratings';
import formatDate from '../../service/formatDate';
import {server} from '../../constants/index';
export default (props) => {
  return (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <Avatar.Image
          size={30}
          source={{
            uri: `${server}/images/${props.customer_id.image}`,
          }}
        />
        <Title style={{marginLeft: 8}}>{props.customer_id ? props.customer_id.name: "Unknow"}</Title>
      </View>
      <View style={styles.commentBody}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AirbnbRating 
            defaultRating={props.rating ? props.rating :1} 
            count={5} 
            size={15} 
            showRating={false}
          />
          <Text> - {formatDate(props.timestamp ? props.timestamp : (new Date()))}</Text>
        </View>
        <Text style={{marginTop: 4}}>
          {props.content ?props.content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
      backgroundColor: '#fff',
      width: '100%',
      alignItems: 'center',
    },
    basisInfo: {
      marginTop: 6,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    basisInfo_2: {
      marginTop: 6,
      width: '100%',
      flexDirection: 'row',
    },
    text: {
      fontSize: 16,
    },
    ratingDetail: {
      flexDirection: 'row',
      width: '100%',
      alignItems:"center",
      marginTop:8
    },
    totalRating: {
      width:"30%",
      justifyContent:"center",
      alignItems:"center"
    },
    commentContainer: {
      width:"100%",
      marginTop:8
    },
    commentHeader: {
        flexDirection:"row"
    },
    commentBody:{
        marginTop:8,
        alignItems:"flex-start",
        borderColor:"#ddd",
        borderWidth:1,
        padding:8,
        borderRadius:12,
        width:"100%"
    }
  });