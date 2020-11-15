import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {useSelector, useDispatch} from 'react-redux';
import Loading from '../../components/load';
import axios from '../../service/store_axios';
import MystoreMarker  from '../../components/admin_side/home/store_marker';
import RescueTopInfo  from '../../components/admin_side/home/rescueInfo';
import OtoMarker from '../../components/admin_side/home/oto_marker';


const defaultPosition = {
    lat: 10.860281,
    lng: 106.650232
};
export default function Home(props) {
    const mystore = useSelector(state => state.mystore);
    const dispatch = useDispatch();
    const markerRef = React.createRef();
    const [mapInit, setMapinit] = React.useState(true);
    const [rescueList, setRescueList] = React.useState(null);
    const [selectedOto, setSelectedOto] = React.useState(null)


    React.useEffect(()=>{
        loadOto();
        loadMyStore()
    },[])
    
   
    const loadMyStore = ()=>{ 
        console.log("loading stores");
        axios.get('/api/store/me')
        .then(({data})=>{
            dispatch({type:"GET_MYSTORE", mystore: data})
        })
        .catch(err=>console.log(err))
    }


    const loadOto = () => {
        axios
        .get(`/api/rescue/mobile`)
        .then((resp) => {
            setRescueList(resp.data.rescuelist)
        })
        .catch((err) => alert("err"));
    }

    const renderOtoRescue = () => (
        rescueList.map(e=>(<OtoMarker setSelectedOto={setSelectedOto} key={e._id} {...e} />))
    )


    if(!mystore) return <Loading text="Đang tải vị trí của hàng" />
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#00786a" barStyle="light-content" />
            {mystore && 
            <MapView
                showsUserLocation
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: selectedOto ? selectedOto.customer.latitude : mystore.latitude, 
                    longitude: selectedOto ? selectedOto.customer.longtitude : mystore.longtitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.0121,
                }}
                // onRegionChangeComplete={() => {
                //     if (mapInit && markerRef.current) {
                //         markerRef.current.showCallout();
                //         setMapinit(false);
                //     };
                // }}
            >
                <MystoreMarker mystore={mystore} markerRef={markerRef} />
                {rescueList && renderOtoRescue()}
            </MapView>}
            {selectedOto && <RescueTopInfo selectedOto={selectedOto} />}
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      calloutContainer: {
        backgroundColor: 'white',
        padding:4
      },
})