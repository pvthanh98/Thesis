import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Title} from 'react-native-paper';
const HistoryItem = (props) => {
    const {navigation} = props;
    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={() => navigation.navigate(
                'history_detail',
                {
                    id: props._id,
                    services:props.services,
                    confirm: props.confirm,
                    paid: props.paid,
                    timestamp:props.timestamp,
                    total_cost:props.total_cost
                }
            )}
        >
            <View style={styles.leftContainer}>
                <Title>{props.store_id.name}</Title>
                <Text>Số lượng dịch vụ: {props.services.length}</Text>
                <View style={{flexDirection:"row"}}>
                    <Text>Tổng tiền:</Text>
                    <Text style={{color:"red", fontWeight:"bold"}}>
                        {props.total_cost} VND
                    </Text>
                </View>    
            </View>
            <View style={styles.rightContainer}>
                <View style={{flexDirection:"row"}}>
                    <Text>
                        {" "}<Icon name="check-circle" color={props.paid ? "green" : "black"} size={20} />
                    </Text>
                    <Text> Thanh toán</Text>
                </View>
                <View style={{flexDirection:"row"}}>
                    <Text>{" "}<Icon name="check-circle" color={props.confirm ? "green" : "black"} size={20} /></Text>
                    <Text> Xác nhận</Text>
                </View>
            </View>
        </TouchableOpacity> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:"row",
        padding:8,
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:"#FFF",
        margin:4,
        shadowColor:"#000",
        shadowOpacity:0.3,
        shadowRadius:10
    },
    leftContainer: {
        width:"70%", 
        overflow:"hidden"
    }
})

export default HistoryItem;