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
        store_info : {
           backgroundColor:"#ffffff",
           height:200,
           width:"97%",
           padding:8,
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
        }
      }
}