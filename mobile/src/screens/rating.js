import React from 'react';
import {View, Text, StyleSheet, StatusBar, TextInput} from 'react-native';
import {Title, Button} from 'react-native-paper';
import {AirbnbRating} from 'react-native-ratings';
import axios from '../service/axios';
export default ({route, navigation}) => {
  const [rating, setRating] = React.useState(4);
  const [comment, setComment] = React.useState('');
  React.useEffect(() => {
    navigation.setOptions({title: route.params.store_name});
  });
  const onSubmit = () => {
    axios
      .post(`/api/rating`, {
        content: comment,
        rating,
        store_id: route.params.store_id,
      })
      .then((res) => {
        if (res.status === 200) {
          alert('Cảm ơn bạn đã đánh giá ứng dụng của chúng tôi');
          navigation.goBack();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#202125" barStyle="light-content" />
      <View>
        <Title style={{color: '#fff'}}>Đánh giá trãi nghiệm của bạn</Title>
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
            placeholder="Để lại nhận xét của bạn"
            placeholderTextColor="#fff"
            value={comment}
            onChangeText={(text) => setComment(text)}
            style={{
              borderColor: '#fff',
              borderWidth: 1,
              borderRadius: 8,
              textAlign: 'center',
              height: 100,
            }}
            color="#fff"
            multiline
          />
        </View>
      </View>
      <Button color="#02a173" mode="contained" onPress={onSubmit}>
        Đăng
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202125',
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
