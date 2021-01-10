import React from 'react';
import {View, Text, StyleSheet, StatusBar, TextInput} from 'react-native';
import {Title, Button} from 'react-native-paper';
import axios from '../../service/axios';
export default ({route, navigation}) => {
  const [comment, setComment] = React.useState('');
  React.useEffect(()=>{
    console.log(route.params)
  },[]);
  const onSubmit = () => {
    axios
      .post(`/api/report`, {
        content: comment,
        store_id:route.params.store.id,
      })
      .then((res) => {
        if (res.status === 200) {
          alert('Cảm ơn bạn đã báo cáo chúng tôi!');
          navigation.goBack();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#295a59" barStyle="light-content" />
      <View>
        <Title style={{color: '#295a59'}}>{route.params && route.params.store.name}</Title>
        <View style={styles.comment}>
          <TextInput
            placeholder="Để lại nhận xét của bạn"
            placeholderTextColor="#295a59"
            value={comment}
            onChangeText={(text) => setComment(text)}
            style={{
              borderColor: '#295a59',
              borderWidth: 1,
              borderRadius: 8,
              textAlign: 'center',
              height: 100,
            }}
            color="#295a59"
            multiline
          />
        </View>
      </View>
      <Button color="#02a173" mode="contained" onPress={onSubmit}>
        GỬI
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
