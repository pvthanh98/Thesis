import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Text,
  TextInput,
  Button,
  IconButton,
} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {shallowEqual} from 'react-redux';
import {useSelector, useDispatch} from 'react-redux';
import axios from '../../../service/store_axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {server} from '../../../constants/index';
export default function Profile(props) {
  const mystore = useSelector((state) => state.mystore, shallowEqual);
  const dispatch = useDispatch();
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [lat, setLat] = React.useState('');
  const [lng, setLng] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [photo, setPhoto] = React.useState(null);
  const [filename, setFilename] = React.useState(null);
  React.useEffect(() => {
    loadInput();
  }, []);
  const loadInput = () => {
    setName(mystore.name);
    setAddress(mystore.address);
    setLat(mystore.latitude);
    setLng(mystore.longtitude);
    setPhone(mystore.phone);
    setDescription(mystore.description);
    setImageUrl(mystore.image)
  };

  const refreshStore = () => {
    axios
      .get('/api/store/me')
      .then(({data}) => {
        dispatch({type: 'GET_MYSTORE', mystore: data});
      })
      .catch((err) => console.log(err));
  }

  const handleChoosePhoto = () => {
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
        setImage(source.uri);
        setPhoto(response.data);
        setFilename(response.fileName);
      }
    });
  };

  const submit = async () => {
    try {
      const user_token = await AsyncStorage.getItem('admin_token');
      let coordinate = `${lat},${lng}`;
      let data = [
        {name: 'name', data: name},
        {name: 'description', data: description},
        {name: 'address', data: address},
        {name: 'phone', data: phone},
        {name: 'coordinate', data: coordinate},
      ];
      if (image)
        data.push({name: 'file_store', filename: filename, data: photo});
      RNFetchBlob.fetch(
        'POST',
        `${server}/api/store/modify`,
        {
          Authorization: `Bearer ${user_token}`,
          'Content-Type': 'multipart/form-data',
        },
        data,
      )
        .then((resp) => {
          alert("Cập nhật thành công")
          refreshStore();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (exception) {
  //    console.log(exception);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.coverPhoto}></View>
      <View style={styles.infoContainer}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            source={
              !image
                ? {uri: `${server}/images/${imageUrl}`}
                : {uri: image}
            }
            size={100}
          />
          <View style={{position: 'absolute', right: -8, bottom: 0}}>
            <IconButton
              icon={() => (
                <MaterialIcon name="camera-alt" color={'black'} size={24} />
              )}
              onPress={handleChoosePhoto}
              size={20}
            />
          </View>
        </View>
        <View style={{marginTop: -70}}>
          <View style={styles.item}>
            <TextInput
              label="Tên cửa hàng"
              style={{width: '100%', backgroundColor: '#fff'}}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={styles.item}>
            <TextInput
              label="Mô tả"
              style={{width: '100%', backgroundColor: '#fff'}}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </View>
          <View style={styles.item}>
            <TextInput
              label="Address"
              style={{width: '100%', backgroundColor: '#fff'}}
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
          </View>
          <View style={styles.item}>
            <TextInput
              label="Phone"
              style={{width: '100%', backgroundColor: '#fff'}}
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
          </View>
          <View style={styles.item}>
            <TextInput
              label="Latitude"
              style={{width: '100%', backgroundColor: '#fff'}}
              value={`${lat}`}
              onChangeText={(text) => setLat(`${text}`)}
            />
          </View>
          <View style={styles.item}>
            <TextInput
              label="Longitude"
              style={{width: '100%', backgroundColor: '#fff'}}
              value={`${lng}`}
              onChangeText={(text) => setLng(`${text}`)}
            />
          </View>
          <View
            style={[styles.item, {justifyContent: 'flex-end', marginTop: 4}]}>
            <Button
              mode="contained"
              icon={() => (
                <MaterialIcon name="save-alt" size={20} color="#fff" />
              )}
              onPress={submit}>
              UPDATE
            </Button>

            <Button
              mode="contained"
              color="#c9162b"
              style={{marginLeft: 4}}
              onPress={loadInput}>
              CANCEL
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  coverPhoto: {
    flex: 1,
    backgroundColor: '#ddd',
    width: '100%',
  },
  infoContainer: {
    flex: 4,
    position: 'relative',
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 4,
    paddingRight: 4,
  },
  nameContainer: {
    width: '100%',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    top: -70,
  },
});
