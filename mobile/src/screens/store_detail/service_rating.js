import React from 'react';
import {View, Text, StyleSheet, StatusBar, TextInput} from 'react-native';
import {Title, Button} from 'react-native-paper';
import {AirbnbRating} from 'react-native-ratings';
import axios from '../../service/axios';
export default ({route, navigation}) => {
  const [rating, setRating] = React.useState(4);
  const [comment, setComment] = React.useState('');
  const {service_id} = route.params;
  React.useEffect(() => {
    
  });
  const submit = () => {
    axios.post("/api/service/rating",{
      service_id,
      content:comment,
      rating
    })
    .then(()=>{
      alert("Cám ơn bạn đã đóng góp ý kiến");
      navigation.goBack();
    })
    .catch(err=>console.log(err));
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#202125" barStyle="light-content" />
      <View>
        <Title >Đánh giá trãi nghiệm của bạn</Title>
        <View style={styles.ratingContainer}>
          <AirbnbRating
            count={5}
            reviews={['Bad', 'Meh', 'OK', 'Good', 'Very good']}
            defaultRating={rating}
            onFinishRating={(value) => setRating(value)}
            size={50}
            selectedColor="#02a173"
            reviewColor="#02a173"
          />
        </View>
        <View style={styles.comment}>
          <TextInput
            placeholder="Để lại nhận xét (không bắt buộc)"
            value={comment}
            onChangeText={(text) => setComment(text)}
            style={{
              borderColor: '#ddd',
              borderWidth: 1,
              borderRadius: 8,
              textAlign: 'center',
              height: 100,
            }}
            multiline
          />
        </View>
      </View>
      <Button color="#02a173" mode="contained" onPress={submit}>
        Đăng
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
  },
  ratingContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  comment: {
    width: '100%',
    marginTop: 16,
  },
});
