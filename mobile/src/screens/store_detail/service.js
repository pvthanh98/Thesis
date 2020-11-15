import React from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import {Title, Button} from 'react-native-paper';
import axios from '../../service/axios';
import {server} from '../../constants/index';
import {AirbnbRating} from 'react-native-ratings';
import formatDate from '../../service/formatDate';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
export default (props) => {
  const [services, setSevices] = React.useState([]);
  React.useEffect(() => {
    props.navigation.setOptions({ title: props.route.params.store_name });
    loadServices();
  }, []);

  const loadServices = () => {
    axios
      .get(`/api/service/store/${props.route.params.store_id}`)
      .then(({data}) => setSevices(data))
      .catch((err) => console.log(err));
  };
  return (
    <View>
      <FlatList
        data={services}
        numColumns={2}
        renderItem={({item}) => {
        return (
          <View style={styles.itemContainer}>
            <View>
              <Image
                style={{width: '100%', height: 120}}
                source={{uri: `${server}/images/${item.image}`}}
              />
              <Title>{item.name}</Title>
              <View style={[styles.itemInfo,{alignItems:"center"}]}>
                <AirbnbRating
                  count={5}
                  defaultRating={4}
                  size={15}
                  showRating={false}
                />
                <Text>
                  <FontAwesomeIcon name="user" color="green" size={18} /> 20
                </Text>
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.text}>{formatDate(item.timestamp)}</Text>
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.text}>
                  <FontAwesomeIcon name="money" size={24} />
                </Text>
                <Text style={{color: 'red', fontWeight: 'bold', fontSize: 16}}>
                  $ {item.price}
                </Text>
              </View>
            </View>
            <View style={styles.itemInfo}>
              <Button 
                color="#ddd" 
                mode="contained"
                onPress={()=>props.navigation.navigate("service_detail",{
                  service:item
                })}
              >
                CHI TIẾT
              </Button>
            </View>
          </View>
        );
      }}
      keyExtractor={(item) => item.name}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 4,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 4,
    margin: 4,
    flex: 1,
    justifyContent:"space-between"
  },
  image: {
    width: '100%',
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    alignItems:"center"
  },
  text: {
    fontSize: 16,
  },
});
