//@ts-nocheck

import { View, Text, SafeAreaView, ToastAndroid, ActivityIndicator, Keyboard } from 'react-native'
import React,{useEffect, useState} from 'react';
import { Button } from 'react-native-paper';
import { TextInput, useTheme } from 'react-native-paper';


const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginResponse,setLoginResponse] = useState({});
  const [loading,setLoading] = useState(false);
  const [showPass,setShowPass] = useState(false);
  const theme = useTheme();

  const loginUrl = "https://wpre.adityabirlahealth.com/wServices_V2/api/Registration/LoginStandard";

    const bodyData = {
        "emailId": username,
        "password": "e034db55b346a08b8debcd4c9a9b5ec39e8ae89a",
        'deviceType': 'android',
        'device': 'android',
        'fcmtoken':
            'crvcjlJUQuKIvuvOvLD2HO:APA91bFhY54VUmzOcAf12l6Ia_sc779WCjgmseLB2PnW4DBHViGSG3YtUN-uCk01LaQaXga6bHYANozsL5peknYgZ_yQWuwSEtfwU_BzehXJU6d2Pon3l8TrqWD2pgLO9bZ5s7Jeq3rr',
        'osVersion': '7.5',
        'IsRemember': true,
        'IsFingerPrintLogin': false,
        'RegFingerPrint': false
      }

      const requestHeaders = {
        "x-local-user-token": "dd77e4fa-e299-4e44-8d1c-8a83d176a2e8",
        "Content-Type": "application/json",
        "x-abhi-api-key": "ZMsJVnVxxjL4CYxDBRBH",
        "x-abhi-token": "V2kpIQwOsP2mroTNZhRk",
        "x-client-token": "",
        "p1": "",
        "p2": "android",
        "p3": "7.5",
        "p5":"" ,
        "X-NewRelic-ID": "VgcHVlRaDBADU1BSBQEGXlc=",
      }

    

    const fetchLogin = async() => {

      setLoading(true);

      await fetch(loginUrl,
        {
            method: 'POST', // or 'PUT'
            headers: requestHeaders,
            body: JSON.stringify(bodyData),
        }

        )
        .then(res=>res.json())
        .then(data=>setLoginResponse(data))
        .catch(e=>console.log(e.message));

        setLoading(false);
        //console.log(loginResponse);
        //ToastAndroid.show(`${loginResponse.message}`, ToastAndroid.SHORT);
    }

    useEffect(()=>{
        fetchLogin();
    },[username,password])

    const handleLoginButton = async() => {

        Keyboard.dismiss();
         
        //console.log(JSON.stringify(loginResponse));
      
        //alert(`Name: ${loginResponse.data.name}`);
        
        if(!(username && password)){
          ToastAndroid.show(`${!username?'Enter Username':'Enter Password'}`, ToastAndroid.SHORT);
        }else {

          //fetchLogin();
            // while(true){
            //    fetchLogin();
            //    if(loginResponse.message==="Success"){
            //         break;
            //    }
            // }
            
            if(loginResponse.data.name){
          
            navigation.navigate('User',
            {profileName:`${loginResponse.data.name}*${loginResponse.data.contractMember} `,
            memberId:`${loginResponse.data.contractMember}`,
            
            });
           
            ToastAndroid.show(`${loginResponse.message}`, ToastAndroid.SHORT);
          }else{
              ToastAndroid.show(`${loginResponse.message}`, ToastAndroid.SHORT);
              //setIsLoggedIn(false);
          }}

          
    }

  return (
    <SafeAreaView style={{backgroundColor: 'white',height:'100%'}}>
        <View style={{marginHorizontal:20}}> 
        {/* {loading && <ActivityIndicator style={{height:20,marginTop:15}} size="large" color="#e74b1b" />} */}

        <Text style={{color:'#DE2E1F',fontSize:20,marginTop:50,marginBottom:20}}>Login</Text>

        <Text style={{fontSize:12,fontWeight:"500",marginVertical:5}}>Already have an account with us? Login through your account credentials.</Text>
        {/* username enter */}
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:40,alignItems:'center'}}>
          <Text style={{fontSize:18}}></Text>
          <Text style={{fontSize:12,color:'#DE2E1F'}}>Forgot Username!</Text>
        </View>
        <TextInput
        mode="outlined"
        label="Username"
        // placeholder=""
        right={<TextInput.Affix text="/100" />}
        onChangeText={setUsername}
        value={username}
        />

        {/* password enter */}
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:20,alignItems:'center'}}>
          <Text style={{fontSize:18}}></Text>
          <Text style={{fontSize:12,color:'#DE2E1F'}}>Forgot Password!</Text>
        </View>
        <TextInput
          mode="outlined"
          label="Password"
          //placeholder="username"
          secureTextEntry={showPass? false : true}
          right={<TextInput.Icon onPress={()=>setShowPass(!showPass)} icon="eye" />}
          onChangeText={setPassword}
          value={password}
          />

        {/* login button */}
          <View style={{marginTop:60}}>
          <Button 
          buttonColor='#DE2E1F'
          mode="contained" 
          onPress={() => handleLoginButton()}>
          Login
          </Button>
          </View>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen