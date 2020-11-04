import { StyleSheet } from 'react-native';
export default function app_style () {
    return {
        container: {
          ...StyleSheet.absoluteFillObject,
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center'
        },
        map: {
          ...StyleSheet.absoluteFillObject,
        },
        calloutContainer: {
          backgroundColor: 'white',
          padding: 12,
          maxWidth:300
        },
        title: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        barContainer: {
          flexDirection:"row",
          justifyContent:"center",
          alignItems:"center",
          width: "100%",
          height: 80
        },
        infoContainer: {
          backgroundColor:"#ffffff",
        },
        store_info : {
           width:"100%",
           paddingRight:8,
           paddingLeft:8,
           paddingBottom:8,
           flexDirection:"row"
        },
        info_right: {
          flex:1,
          justifyContent:"center",
          alignItems:"center"
        },
        btnContainer: {
          flexDirection:"row",
          marginTop:8,
          justifyContent:"center"
        },
        someText: {
          position:"absolute",
          top:1,
          left:1
        }
      }
}