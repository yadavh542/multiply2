import { View, Text } from 'react-native'
import React from 'react';
import { WebView } from 'react-native-webview';


const PlayVideo = ({navigation,route}) => {
  return (
    // <View>
    //   <Text>PlayVideo:  {route.params.yturl}</Text>
      <WebView 
      useWebView2={true}
      style={{height: '100%', width: '100%',}}
      source={{ uri: `https://www.youtube.com/watch?v=${route.params.yturl}` }} />
    // </View> 
  )
}

export default PlayVideo