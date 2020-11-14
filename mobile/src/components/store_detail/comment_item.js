import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Title} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
import formatDate from '../../service/formatDate';
export default (props) => {
  return (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <Avatar.Image
          size={30}
          source={require('../../assets/images/profile.png')}
        />
        <Title style={{marginLeft: 8}}>{props.customer_id.name}</Title>
      </View>
      <View style={styles.commentBody}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Rating startingValue={props.rating} ratingCount={5} imageSize={15} />
          <Text> - {formatDate(props.timestamp)}</Text>
        </View>
        <Text style={{marginTop: 4}}>
          {props.content}
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