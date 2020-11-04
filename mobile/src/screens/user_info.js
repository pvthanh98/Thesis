import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {server} from '../constants/index';
import Loading from '../components/load';
import {
  Avatar,
  Title,
  DataTable,
  Button,
  Text,
  TextInput,
} from 'react-native-paper';
import axios from '../service/axios';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob'
class UserInfo extends React.Component {
  state = {
    email: '',
    name: '',
    address: '',
    phone: '',
    image: '',
    modify: false,
    photo: null,
    filename: null,
    loading:true
  };
  componentDidMount() {
    this.loadUser();
  }

  loadUser = () => {
    axios
      .get('/api/user')
      .then(({data}) => {
        this.setState({
          email: data.email,
          name: data.name,
          address: data.address,
          phone: data.phone,
          image: `${server}/images/${data.image}`,
          loading: false
        });

        
      })
      .catch((err) => {
        alert('Cannot load user');
        throw err;
      });
  }
  handleChoosePhoto = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log(response)
        this.setState({
          image: source.uri,
          photo: response.data,
          filename: response.fileName
        });
      }
    });
  };

  handleSubmit = async () => {
    try {
      const user_token = await AsyncStorage.getItem("user_token");
      let data = [
        {name: 'name', data: this.state.name},
        {name: 'address', data: this.state.address},
        {name: 'phone', data: this.state.phone},
      ]
      if(this.state.photo) data.push({name: 'file', filename: this.state.filename, data: this.state.photo})
      RNFetchBlob.fetch(
        'POST',
        `${server}/api/user/update`,
        {
          'Authorization': `Bearer ${user_token}`,
          'Content-Type': 'multipart/form-data'
        },
        data
        ,
      )
        .then((resp) => {
          this.loadUser()
          this.setState({
            modify:false
          })
        })
        .catch((err) => {
          console.log(err)
        });

    } catch (e){
      console.log(e)
    }
    
  };

  render() {
    if(this.state.loading) return <Loading />
    return (
      <View style={{flex: 1}}>
        {!this.state.modify && (
          <View style={styles.container}>
            <Avatar.Image
              size={150}
              source={this.state.image ? {uri: this.state.image} : require('../assets/images/profile.png')}
            />
            <Title>{this.state.name}</Title>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell>Email</DataTable.Cell>
                <DataTable.Cell>{this.state.email}</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Address</DataTable.Cell>
                <DataTable.Cell>{this.state.address}</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Phone</DataTable.Cell>
                <DataTable.Cell>{this.state.phone}</DataTable.Cell>
              </DataTable.Row>
            </DataTable>
            <View style={styles.btnContainer}>
              <Button
                mode="contained"
                onPress={() => this.setState({modify: true})}>
                Update
              </Button>
            </View>
            <View style={{width: '100%', alignItems: 'center'}}>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('history')}>
                <Text style={styles.link}>Your history rescuing</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {this.state.modify && (
          <View style={styles.container}>
            <TouchableOpacity onPress={this.handleChoosePhoto}>
              <Avatar.Image
                size={150}
                source={this.state.image ? {uri: this.state.image} : require('../assets/images/profile.png')}
              />
            </TouchableOpacity>
            <View style={styles.lineContent}>
              <TextInput
                label="Email"
                placeholder="Type your email"
                mode="outlined"
                disabled
                value={this.state.email}
                onChangeText={(text) => this.setState({email:text})}
                style={{width: '100%'}}
              />
            </View>
            <View style={styles.lineContent}>
              <TextInput
                label="Name"
                placeholder="Type your name"
                mode="outlined"
                value={this.state.name}
                onChangeText={(text) => this.setState({name:text})}
                style={{width: '100%'}}
              />
            </View>
            <View style={styles.lineContent}>
              <TextInput
                label="Address"
                placeholder="Type your address"
                mode="outlined"
                value={this.state.address}
                onChangeText={(text) => this.setState({address:text})}
                style={{width: '100%'}}
              />
            </View>
            <View style={styles.lineContent}>
              <TextInput
                label="Phone"
                placeholder="Type your phone number"
                mode="outlined"
                value={this.state.phone}
                onChangeText={(text) => this.setState({phone:text})}
                style={{width: '100%'}}
              />
            </View>
            <View style={styles.btnContainer}>
              <Button color="gray" mode="contained" onPress={()=>this.setState({modify:false})}>
                <Text style={{color:"#fff"}}>CANCEL</Text>
              </Button>
              <Button style={{marginLeft:8}} mode="contained" onPress={this.handleSubmit}>
                SAVE
              </Button>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  link: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
  lineContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 10,
  },
});

export default UserInfo;
