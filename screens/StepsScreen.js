//@ts-nocheck

import { View, Text, Button, ActivityIndicator, ToastAndroid, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FitnessTracker } from '@kilohealth/rn-fitness-tracker';
import { GoogleFitDataTypeByKey } from '@kilohealth/rn-fitness-tracker/src/constants/fitness';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import Icon from 'react-native-vector-icons/FontAwesome';
//import { SvgUri } from 'react-native-svg';
import { SvgXml } from 'react-native-svg';
import { authorize } from '@kilohealth/rn-fitness-tracker/src/api/fitnessTracker';


const markerRendering = `<svg xmlns="http://www.w3.org/2000/svg"
     width="80" height="80" viewBox="0 0 275 200">
  <defs>
    <marker id="Triangle" viewBox="0 0 10 10" refX="1" refY="5"
            markerUnits="strokeWidth" markerWidth="4" markerHeight="3"
            orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" />
    </marker>
  </defs>

  <g fill="none" stroke-width="10" marker-end="url(#Triangle)">
    <path stroke="crimson" d="M 100,75 C 125,50 150,50 175,75" marker-end="url(#Triangle)"/>
    <path stroke="olivedrab" d="M 175,125 C 150,150 125,150 100,125" marker-end="url(#Triangle)"/>
  </g>
</svg>`;

const StepsScreen = ({navigation}) => {
  const [steps, setSteps] = useState(0);
  const [weeklySteps, setWeeklySteps] = useState([]);
  const [authorized,setAuthorized] = useState(0);
  const [loading, setLoading] = useState(false);
  //const syncIcon = <Icon name="rocket" size={30} color="#900" />;

  const permissions = {
    //healthReadPermissions: [HealthKitDataType.StepCount],
    googleFitReadPermissions: [GoogleFitDataTypeByKey.Steps],
  };

  const storeAuthData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const storeStepsData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key_steps', jsonValue)
    } catch (e) {
      // saving error
    }
  }


  useEffect(()=>{

    const handleGFit = async() => {

      //setLoading(true);
      FitnessTracker.UNSAFE_isTrackingAvailable(GoogleFitDataTypeByKey.Steps);
      //console.log(track);
      //const track = FitnessTracker.authorize(googleFitReadPermissions);
      

      const jsonValueAuth = await AsyncStorage.getItem('@storage_Key')
      jsonValueAuth != null ? setAuthorized(JSON.parse(jsonValueAuth)) : null;

      // if(authorized !== 1){ 
      //   setSteps(0);
      //   await FitnessTracker.authorize(permissions);
      //   //console.log(typeof(authorized))
      //   if (FitnessTracker.isTrackingAvailable(GoogleFitDataTypeByKey.Steps))
      //   {
      //     setAuthorized(1);
      //     storeAuthData(1);
      //   }else{
      //     setAuthorized(0);
      //     storeAuthData(0);
      //   }
      //  console.log( typeof(FitnessTracker.UNSAFE_isTrackingAvailable));
        
      //   const stepsToday = await FitnessTracker.getStatisticTodayTotal(
      //     GoogleFitDataTypeByKey.Steps,
      //     );
      //   setSteps(stepsToday);
      //   storeStepsData(stepsToday);

      // }else{ 
        const jsonValueSteps = await AsyncStorage.getItem('@storage_Key_steps');
        jsonValueSteps != null ? setSteps(JSON.parse(jsonValueSteps)) :null;
      // }
        //setLoading(false);

        //syncSteps();
    }
    
    handleGFit();

  },[]);

  const getSteps = async()=>{
    const stepsToday = await FitnessTracker.getStatisticTodayTotal(
      GoogleFitDataTypeByKey.Steps,
      );

    const weekSteps = await FitnessTracker.getStatisticWeekDaily(
      GoogleFitDataTypeByKey.Steps
    );
    //console.log(weekSteps);
    setWeeklySteps(weekSteps);
    
    setSteps(stepsToday);
    storeStepsData(stepsToday);
    storeAuthData(1);
  }

  const syncSteps = async() => {
    setLoading(true);
    //console.log(authorized);
    try{ 
    if(authorized == 0){ 
      await FitnessTracker.authorize(permissions);
      getSteps();
      ToastAndroid.show(`Steps Synced Successfully`, ToastAndroid.SHORT);
    }else
    {
      getSteps();
      // const jsonValueSteps = await AsyncStorage.getItem('@storage_Key_steps');
      // jsonValueSteps != null ? setSteps(JSON.parse(jsonValueSteps)) :null;
      ToastAndroid.show(`Steps Synced Successfully`, ToastAndroid.SHORT);
    }
    
   }catch(e){
    //getSteps();
    //await FitnessTracker.authorize(permissions);
    ToastAndroid.show(`Permission Denied`, ToastAndroid.SHORT);
  }
    
    setLoading(false);
  }

    

  return (
    <SafeAreaView style={{backgroundColor:'white',height:"100%"}}> 
    <View style={{display:'flex',flexDirection:'column',justifyContent:'center',marginHorizontal:20}}>
  
        <View style={{display:'flex',marginVertical:20,justifyContent:'space-between',borderWidth:1,flexDirection:'row',alignItems:'center',paddingHorizontal:10,borderColor:'gray',height:60}}> 
            <Text style={{fontSize:20,fontWeight:'800'}}>Google Fit (Sync Steps)</Text>
            
            <View  
              style={`${loading && {transform:{rotateZ: "360deg"}}}`}
            >
              <SvgXml onPress={()=>syncSteps()} xml={markerRendering} />
            </View>
            {/* <Text>{syncIcon}</Text> */}
        </View>

        

        { loading &&
        <View style={{flex:1,justifyContent:'center',padding:10}}>
           <ActivityIndicator size="large" color="#e74b1b" /></View>}

        <Text style={{justifyContent:'center',alignSelf:'center',display:'flex' ,fontSize:20, fontWeight:'500',marginTop:40}}>Today's Steps: {steps}</Text>

        <Text style={{marginTop:40,fontSize:18,fontWeight:'bold'}}>Weekly Steps</Text>


        {/* weekly steps */}
        <View
          style={{display:'flex',flexDirection:'row',marginTop:20}}
        > 

          {/* weekly steps dates key */}
          <View style={{marginRight:40}}>
            <Text style={{marginBottom:20,fontWeight:'bold'}}>Dates</Text>
            {Object.keys(weeklySteps).map((key)=>(
          
              <Text key={key} style={{marginBottom:20}}>{key}</Text>
            ))}
          </View>

          {/* weekly steps values */}
          <View  style={{}}>
          <Text style={{marginBottom:20,fontWeight:'bold'}}>Steps</Text>
          {Object.values(weeklySteps).map((val)=>(
            <Text key={val} style={{marginBottom:20}}>{val}</Text>
          ))}
          </View>
        </View>
        
    </View>
    </SafeAreaView>
  )
}

export default StepsScreen