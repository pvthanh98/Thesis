import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Title} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
export default (props) => {
  return (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <Avatar.Image
          size={30}
          source={require('../../assets/images/profile.png')}
        />
        <Title style={{marginLeft: 8}}>Thanh Phan</Title>
      </View>
      <View style={styles.commentBody}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Rating startingValue={3} ratingCount={5} imageSize={15} />
          <Text> - 12/10/1998</Text>
        </View>
        <Text style={{marginTop: 4}}>
          Tôi không thể tin được thật tuyệt vời lần đầu tôi chơi chưa hiểu cách
          chơi nhưng sau khi nó hướng dẫn xong là có thể chơi thoải mái
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
        alignItems:"flex-start"
    }
  });