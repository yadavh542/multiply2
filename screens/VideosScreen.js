//@ts-nocheck

import { View, Text, FlatList, Image, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
//import Video from 'react-native-video';


const VideosScreen = ({navigation}) => {
  const [videos , setVideos] = useState({});
  const [loading, setLoading] = useState(false);
  //const axios = require('axios');

  const videoUrl = 'https://wpre.adityabirlahealth.com/wServices_V2/api/Support/WorkoutVideos';

  const requestHeaders = {
    // 'Content-Type': 'application/json',
    // 'x-abhi-api-key': 'ZMsJVnVxxjL4CYxDBRBH',
    // 'x-abhi-token': 'V2kpIQwOsP2mroTNZhRk',
    // 'x-client-token': '0dcebbe9-a715-4deb-bfec-13ad66eb09f6',
    'p1': '1181738',
    // 'p2': 'android',
    // 'p3': '7.5',
    // 'p5': 'TTA-ABCMultiply',
    // 'X-NewRelic-ID': 'VgcHVlRaDBADU1BSBQEGXlc=',
  }

  useEffect(()=>{
    const fetchVideos = async() => {
     
      setLoading(true);
        await fetch(videoUrl,
            {
                method: 'GET', // or 'PUT'
                headers: requestHeaders,
                //body: JSON.stringify(null),
            }

            )
            .then(res=>res.json())
            .then(data=>setVideos(data))
            .catch(e=>console.log(e.message));


        //console.log(videos.data.UpcomingEvents[1].Events);
        //console.log(videos);
        setLoading(false);
    }
    fetchVideos();
  },[])
  
  // const renderItem = ({ item }) => (
  //   <View style={{padding:20, marginHorizontal:16, marginVertical:8}}>
  //     <Image
  //       style={{height:200,width:400}}
  //       source={{
  //         uri: `${videos.data.UpcomingEvents[1].Events}/Image`,
  //       }}
  //     />
  //   </View>
  // );

  return (
    <ScrollView style={{backgroundColor:'white',}}>

       {
        videos && videos?.data?.UpcomingEvents[1]?.Events.map((video)=>
          
             (<Pressable 
              key={video.Id} 
              onPress={()=>navigation.navigate('Play',{yturl:`${video.RedirectURL}`})}>
              
                <View style={{flex:1, borderRadius:10}}> 
                  {/* {loading && <ActivityIndicator style={{height:20,marginTop:15}} size="large" color="#e74b1b" /> } */}
                  <Image
                    style={{flex:1,marginHorizontal:10,height:220,marginVertical:10,padding:10, borderRadius:10}}
                    source={{
                    uri: `${video.Image}`,
                    }}
                  />
                  
                </View>
                
            </Pressable>)
                
          
        )
      } 

    </ScrollView>
  )
}

export default VideosScreen