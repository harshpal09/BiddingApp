import {SafeAreaView, StyleSheet, Text, View,TouchableOpacity,Image,Linking, ActivityIndicator} from 'react-native';
import React, { useEffect,useState} from 'react';
import {DataTable} from 'react-native-paper';
import globalStyles, { LARGE_FONT_SIZE } from '../../Styles/global';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBoolean } from '../../Redux/Actions/booleanActions';
import axios from 'axios';

// import { Image } from 'react-native-reanimated/lib/typescript/Animated';

export default function Profile({navigation}) {
  const [userData, setuserData] = useState({});
  const [error, setError] = useState('');
  const[isLoading,setIsLoading] = useState(true);
  const dispatch =useDispatch();

  useEffect(()=>{
    getData();
  },[])

  const getData = async()=>{
      let id = await AsyncStorage.getItem('user_id');
      setIsLoading(true)
      try{
      let response = await axios.post('https://crm.unificars.com/api/dealer-profile',{'dealer_id':id})
        if(response.data.code == 200){
          setuserData(response.data.data);
        }
        else{
          setError('error code ',response.data.code);
        }
      }
      catch(error){
        setError('Network request failed');
      }
      finally{
        setIsLoading(false)
      }

  }
  

  const openPhoneDialer = () => {
    const phoneNumber = '1234567890'; // Replace with the phone number you want to call
  
    // Use the tel: scheme to initiate a phone call
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const openWebBrowser = async () => {
    const url = 'https://www.unificars.com/sell-used-car'; // Replace with your desired URL
  
    // Check if the URL is supported
    const supported = await Linking.canOpenURL(url);
  
    if (supported) {
      // Open the URL in the user's default web browser
      await Linking.openURL(url);
    } else {
      console.error(`Don't know how to open this URL: ${url}`);
    }
  };

  const logout = async() =>{
    try{
      await AsyncStorage.removeItem('user_id').then(()=> dispatch(toggleBoolean(false)))
      // console.log('global state in function on logout page is => ',boolstate);
    }catch{
      console.log("error in logged out")
    }
  }


  
  return (
    <SafeAreaView style={[globalStyles.mainContainer]}>
      {isLoading ? <ActivityIndicator size={'large'} />:<>
      <View style={[globalStyles.profileHeader]}>
          <View style={[globalStyles.rowContainer]}>
            <View style={[globalStyles.flexBox,globalStyles.profileHeaderImageContainer]}>
              <Image style={[globalStyles.profileHeaderImage]} source={require('../../Assets/Images/avatar_img.jpeg')  } />
            </View>
            <View style={[globalStyles.columnContainer,globalStyles.flexBox,globalStyles.profileHeaderTextConatainer]}>
              <View >
                <Text style={[{fontSize:LARGE_FONT_SIZE,letterSpacing:1,fontWeight:'400',color:'white'}]}>Hello</Text>
                <Text style={[globalStyles.profileHeaderText]}>{userData.name}</Text>
              </View>
            </View>
          </View>
      </View>
      <DataTable style={globalStyles.dataTable_2}>
        <DataTable.Row style={globalStyles.rowStyles}>
          <DataTable.Cell>
            <TouchableOpacity
              activeOpacity={0.9}
              style={globalStyles.profileHeadings}
              onPress={() => navigation.navigate('manage_profile',{ data:userData})}>
              {/* <AntDesign style={globalStyles.gestureIcon} name='profile' size={21} color={'#6D6D6D'} /> */}
              <Text style={globalStyles.profileHeadingText}>Manage Profile</Text>
              <MaterialIcons
                name="navigate-next"
                color={'#6D6D6D'}
                size={25}
                style={globalStyles.profileIcons}
              />
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={globalStyles.rowStyles}>
          <DataTable.Cell>
            <TouchableOpacity
              activeOpacity={0.9}
              style={globalStyles.profileHeadings}
              onPress={() => navigation.navigate('payment',{ data:userData})}>
              {/* <MaterialCommunityIcons style={globalStyles.gestureIcon} name='account-edit' size={23} color={'#6D6D6D'} /> */}
              <Text style={globalStyles.profileHeadingText}>
                Payment Details
              </Text>
              <MaterialIcons
                name="navigate-next"
                color={'#6D6D6D'}
                size={25}
                style={globalStyles.profileIcons}
              />
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={globalStyles.rowStyles}>
          <DataTable.Cell>
            <TouchableOpacity
              activeOpacity={0.9}
              style={globalStyles.profileHeadings}
              onPress={() => navigation.navigate('address',{ data:userData})}>
              {/* <MaterialCommunityIcons style={globalStyles.gestureIcon} name='form-textbox-password' size={23} color={'#6D6D6D'} /> */}
              <Text style={globalStyles.profileHeadingText}>Address</Text>
              <MaterialIcons
                name="navigate-next"
                color={'#6D6D6D'}
                size={25}
                style={globalStyles.profileIcons}
              />
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={globalStyles.rowStyles}>
          <DataTable.Cell>
            <TouchableOpacity
              activeOpacity={0.9}
              style={globalStyles.profileHeadings}
              onPress={() => openWebBrowser()}>
              {/* <FontAwesome style={globalStyles.gestureIcon} name='address-book' size={23} color={'#6D6D6D'} /> */}
              <Text style={globalStyles.profileHeadingText}>
                Sell via UnifiCars
              </Text>
              <MaterialIcons
                name="navigate-next"
                color={'#6D6D6D'}
                size={25}
                style={globalStyles.profileIcons}
              />
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row>
        {/* <DataTable.Row style={globalStyles.rowStyles}>
                            <DataTable.Cell>
                                <TouchableOpacity activeOpacity={0.9} style={globalStyles.profileHeadings} onPress={() => this.props.navigation.navigate('wishlist')} >
                                    <MaterialIcons style={globalStyles.gestureIcon} name='favorite-border' size={23} color={'#6D6D6D'} />
                                    <Text style={globalStyles.profileHeadingText}>Wish List</Text>
                                    <MaterialIcons name='navigate-next' color={'#6D6D6D'} size={25} style={globalStyles.profileIcons} />
                                </TouchableOpacity>
                            </DataTable.Cell>
                        </DataTable.Row> */}
        <DataTable.Row style={globalStyles.rowStylesBottom}>
          <DataTable.Cell>
            <TouchableOpacity
              activeOpacity={0.9}
              style={globalStyles.profileHeadings}
              onPress={() => openPhoneDialer()}>
              {/* <FontAwesome style={globalStyles.gestureIcon} name='first-order' size={23} color={'#6D6D6D'} /> */}
              <Text style={globalStyles.profileHeadingText}>Help & Support</Text>
              <MaterialIcons
                style={globalStyles.profileIcons}
                name="navigate-next"
                color={'#6D6D6D'}
                size={25}
              />
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={globalStyles.rowStylesBottom}>
          <DataTable.Cell>
            <TouchableOpacity
              activeOpacity={0.9}
              style={globalStyles.profileHeadings}
              onPress={() => logout()}>
              {/* <FontAwesome style={globalStyles.gestureIcon} name='first-order' size={23} color={'#6D6D6D'} /> */}
              <Text style={globalStyles.profileHeadingText}>Logout</Text>
              <MaterialIcons
                style={globalStyles.profileIcons}
                name="navigate-next"
                color={'#6D6D6D'}
                size={25}
              />
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row>
        {/* <DataTable.Row style={globalStyles.rowStyles}>
          <DataTable.Cell>
            <TouchableOpacity
              activeOpacity={0.9}
              style={globalStyles.profileHeadings}
              onPress={() => this.props.navigation.navigate('trackorders')}>
              <Text style={globalStyles.profileHeadingText}>
                States
              </Text>
              <MaterialIcons
                name="navigate-next"
                color={'#6D6D6D'}
                size={25}
                style={globalStyles.profileIcons}
              />
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row> */}

        {/* <DataTable.Row style={globalStyles.rowStylesBottom}>
          <DataTable.Cell>
            <TouchableOpacity
              activeOpacity={0.9}
              style={globalStyles.profileHeadings}
              onPress={() => this.props.navigation.navigate('mycredits')}>
              <Text style={globalStyles.profileHeadingText}>Allow Notification</Text>
              <MaterialIcons
                name="navigate-next"
                color={'#6D6D6D'}
                size={25}
                style={globalStyles.profileIcons}
              />
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row> */}
      </DataTable>
      </>} 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
