import { View, Text } from 'react-native'
import React, { useState } from 'react';
import { BottomNavigation,Button } from 'react-native-paper';
import StepsScreen from './StepsScreen';
import VideosScreen from './VideosScreen';
//import PlayVideo from './PlayVideo';


const ActivDayzRoute = () => <StepsScreen/>;
const VideosRoute = () => <VideosScreen/>;
//const PlayRoute = () => <PlayVideo/>;

const BottomMenu = ({navigation}) => {
    const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'steps', title: 'Steps', },
    { key: 'videos', title: 'Videos', },
    
  ]);

  const renderScene = BottomNavigation.SceneMap({
    steps: ActivDayzRoute,
    videos: VideosRoute,
    
  });
  return (
    <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          />
  )
}

export default BottomMenu