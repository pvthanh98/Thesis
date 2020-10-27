export default function () {
    return {
        container:{
            justifyContent:"center",
            alignItems:"center",
            flex:1,
            backgroundColor:"#1e90ff",
            padding:12
        }, 
        welcome : {
            textAlign:"center",
            color:"#fff",
            fontSize:30,
            marginBottom:24
        },
        inputText: {
            backgroundColor:"#fff",
            width: "100%",
            padding:12,
            margin:8
        },
        btnContainer: {
            flexDirection:"row",
            justifyContent:"space-between"
        },
        btn:{
            backgroundColor:"#FFD700",
            padding:16,
            width:"45%",
            margin:12
        },
        btnText : {
            color:"black",
            textAlign:"center",
        }
    }
}