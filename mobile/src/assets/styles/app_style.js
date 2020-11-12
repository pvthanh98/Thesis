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
        },
        centeredView: {
          flex: 1,
          justifyContent: "center",
          marginTop: 22
        },
        modalView: {
          margin: 10,
          backgroundColor: "white",
          borderRadius: 20,
          padding: 25,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5
        },
        openButton: {
          backgroundColor: "#F194FF",
          borderRadius: 20,
          padding: 10,
          elevation: 2
        },
        textStyle: {
          color: "white",
          fontWeight: "bold",
          textAlign: "center"
        },
        modalText: {
          marginBottom: 15,
        },
        topBox: {
          position:"absolute",
          top:0,
          backgroundColor:"#ddd",
          width:"100%",
          height:50,
          justifyContent:"center",
          alignItems:"center"
        },
        store_infoContainer: {
          width:"100%"
        },
        ratingContainer: {
          justifyContent:"center",
          alignItems:"center"
        }

      }
}