import React from 'react';
import {View} from 'react-native';
export default (props) => {
  const width = props.width ? props.width+"%" : "0%";
  return (
    <View
      style={{
        width: '100%',
        height: 12,
        backgroundColor: '#d3e3d7',
        borderRadius: 12,
        ...props.style
      }}>
      <View
        style={{
          height: '100%',
          backgroundColor: props.color ? props.color: 'blue',
          width: width,
          borderRadius: 12,
        }}></View>
    </View>
  );
};
