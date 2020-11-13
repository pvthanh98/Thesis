import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Avatar, Title, Button} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
import Progress from '../components/progress/progress';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CommentItem from '../components/store_detail/comment_item';
import axios from '../service/axios';
import {server} from '../constants/index';
const StoreDetail = (props) => {
  const [store, setStore] = React.useState(null);
  const [totalRating, setTotalRating] = React.useState(null);
  const [ratingPercentage, setRatingPercentage] = React.useState(null);
  React.useEffect(()=>{ 
    const {store_id} = props.route.params
    axios.get(`/api/store/id/${store_id}`)
    .then(res=>{
        const total = caculateRating(
          res.data.rating.one, res.data.rating.two, res.data.rating.three,
          res.data.rating.four, res.data.rating.five
        )
        if(total=== 0) {
          console.log("===0");
          setRatingPercentage({
            rating_one:0,rating_two:0,rating_three:0,rating_four:0,rating_five:0
          });
        } else {
          const rating_one = Math.ceil(parseInt(res.data.rating.one)/total * 100)
          const rating_two = Math.ceil(parseInt(res.data.rating.two)/total * 100)
          const rating_three = Math.ceil(parseInt(res.data.rating.three)/total * 100)
          const rating_four = Math.ceil(parseInt(res.data.rating.four)/total * 100)
          const rating_five = Math.ceil(parseInt(res.data.rating.five)/total * 100)
          setRatingPercentage({
            rating_one,rating_two,rating_three,rating_four,rating_five
          })
        }
        setStore(res.data);
        setTotalRating(total);
    })   
    .catch(err=> console.log(err))
  },[])

  const caculateRating  = (one,two,three,four,five) => {
    return parseInt(one)+parseInt(two)+ parseInt(three)+parseInt(four)+ parseInt(five)
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <Avatar.Image
          size={100}
          source={{uri: `${server}/images/${store ? store.image : ""}`}}
        />
        <Title style={{textAlign: 'center'}}>
          {store && store.name}
        </Title>
        <Text>{store && store.description}</Text>
        <View style={styles.basisInfo}>
          <Button mode="contained" color="blue">
            GỬI ĐÁNH GIÁ
          </Button>
          <Button mode="contained" style={{marginLeft: 8}} color="#e0e0e0">
            NHẮN TIN
          </Button>
        </View>
        <View style={styles.basisInfo_2}>
          <Text style={styles.text}>
            <MaterialIcons name="location-on" size={24} color="#0d5e18" /> Địa
            chỉ: {store && store.address}
          </Text>
        </View>
        <View style={styles.basisInfo_2}>
          <Text style={styles.text}>
            <MaterialIcons name="directions-car" size={24} color="#0d5e18" />{' '}
            Cách bạn: {props.route.params.distance}
          </Text>
        </View>
        <View style={styles.ratingDetail}>
          <View style={styles.totalRating}>
            <Text style={{fontSize: 40}}>{store && (parseInt(store.rating.total))}</Text>
            <Rating startingValue={4.5} ratingCount={5} imageSize={20} />
            <Text >{totalRating && totalRating} đánh giá</Text>
          </View>
          <View style={{width: '70%'}}>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <Text style={{width: '10%'}}>5</Text>
              <Progress
                style={{marginTop: 4, width: '90%', marginLeft: 4}}
                color="green"
                width={(ratingPercentage) ? ratingPercentage.rating_five : 1}
              />
            </View>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <Text style={{width: '10%'}}>4</Text>
              <Progress
                style={{marginTop: 4, width: '90%', marginLeft: 4}}
                color="green"
                width={ratingPercentage ? ratingPercentage.rating_four:0}
              />
            </View>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <Text style={{width: '10%'}}>3</Text>
              <Progress
                style={{marginTop: 4, width: '90%', marginLeft: 4}}
                color="green"
                width={ratingPercentage ? ratingPercentage.rating_three:0}
              />
            </View>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <Text style={{width: '10%'}}>2</Text>
              <Progress
                style={{marginTop: 4, width: '90%', marginLeft: 4}}
                color="green"
                width={ratingPercentage ? ratingPercentage.rating_two:0}
              />
            </View>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <Text style={{width: '10%'}}>1</Text>
              <Progress
                style={{marginTop: 4, width: '90%', marginLeft: 4}}
                color="green"
                width={ratingPercentage ? ratingPercentage.rating_one:0}
              />
            </View>
          </View>
        </View>
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </View>
    </ScrollView>
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
    alignItems: 'center',
    marginTop: 8,
  },
  totalRating: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StoreDetail;
