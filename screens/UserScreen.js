//@ts-nocheck
import { View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { BottomNavigation,Button } from 'react-native-paper';




const UserScreen = ({navigation, route}) => {
  

  return (
    <SafeAreaView style={{backgroundColor:'white',height:"100%"}}>
      <View style={{marginHorizontal:20}}> 

      <View style={{marginVertical:20,marginBottom:80}}>
        <Text 
        style={{fontSize:16,fontWeight:'600'}}>
          Users Name: {route.params.profileName.split("*")[0]}</Text>
        <Text 
        style={{fontSize:16, marginTop:20, fontWeight:'600'}}
        >Member ID: {route.params.profileName.split("*")[1]}</Text>
      </View>

        {/* buttons */}
        <View style={{marginTop:150}}> 
        <View>
        
          <Button mode="contained-tonal" onPress={() =>navigation.navigate('Steps')}>
          Active Dayz
          </Button>
        </View>

        <View style={{marginTop:40}}>
        
          <Button mode="contained-tonal" onPress={() =>navigation.navigate('Videos')}>
          Watch Videos
          </Button>
        </View>

        {/* <View style={{marginTop:40}}>
        
          <Button mode="contained-tonal" onPress={() =>navigation.navigate('Menu')}>
          Bottom Menu
          </Button>
        </View> */}

        </View>


        

      </View>
    </SafeAreaView>
  )
}

export default UserScreen