import React from 'react'
import {View, StyleSheet, Image, ScrollView, TextInput} from 'react-native';
import { Title,Paragraph, Text, Button } from 'react-native-paper';
import {server} from '../../constants/index';
import {AirbnbRating} from 'react-native-ratings';
import dateFormat from '../../service/formatDate';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommentItem from '../../components/store_detail/comment_item';
export default (props) => {
    const service = props.route.params.service;
    const totalRating = service.rating.one+service.rating.two+service.rating.three+service.rating.four+service.rating.five
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Image 
                style={{height:300,width:"100%"}}
                source={{uri:`${server}/images/${service.image}`}} 
            />
            <View style={[styles.item,{marginTop:8}]}>
                <Title style={styles.title}>{service.name}</Title>
            </View>
            <View style={[styles.item,{justifyContent:"space-between"}]}>
                <View>
                    <Text style={styles.text}><Icon name="money" size={16} /> Phí dịch vụ: <Text style={{color:"red",fontWeight:"bold"}}>$ {service.price}</Text></Text>
                    <Text style={styles.text}><Icon name="calendar" size={16} /> {dateFormat(service.timestamp)}</Text>
                    <Text style={styles.text}><Icon name="user-circle" size={16} /> Đánh giá: {totalRating}</Text>
                </View>
                <View style={{justifyContent:"center", alignItems:"center"}}>
                    <Text style={{fontSize:24}}><Icon name="star-half-full" size={24} /> {service.rating.total}</Text>
                    <AirbnbRating
                        showRating={false}
                        defaultRating={service.rating.total}
                        count={5}
                        size={20}
                    />
                </View>
            </View>
            <View style={{marginTop:4}}>
                <Button 
                    mode="contained" 
                    color="blue"
                    icon={()=><MaterialIcon name="email-edit-outline" size={20} color={"#fff"} />} 
                    onPress={()=>props.navigation.navigate('chat',{
                        store_id: service.store_id,
                    })}
                >
                    LIÊN HỆ CHÚNG TÔi
                </Button>
            </View>
            <View style={styles.item}>
                <Paragraph style={{textAlign:"justify"}}>{service.detail}</Paragraph>
            </View>
            <View>
                <Button 
                    mode="contained" 
                    icon={()=><Icon name="star-half-full" color="#fff" size={24} />}
                    onPress={()=>props.navigation.navigate('service_rating')}
                >
                    GỬI ĐÁNH GIÁ
                </Button>
            </View>
            <View>
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:4
    },
    item:{
        flexDirection:"row",
        width:"100%",
        marginTop:4
    },
    title: {
        fontSize:24
    },
    text:{
        marginLeft:4,
        fontSize:16
    }
});
