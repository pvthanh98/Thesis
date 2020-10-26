import { StyleSheet } from 'react-native';
export default function app_style () {
    return {
        container: {
          ...StyleSheet.absoluteFillObject,
          height: '100%',
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center',
        },
        map: {
          ...StyleSheet.absoluteFillObject,
        },
        calloutContainer: {
          backgroundColor: 'white',
          padding: 8,
        },
        title: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        description: {},
      }
}