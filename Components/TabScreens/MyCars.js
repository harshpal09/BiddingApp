import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  // Image,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  Modal
} from 'react-native';
import React, { Fragment, useState, useEffect } from 'react';
import HeaderSearch from '../ReuseableComponents/HeaderSearch';
import globalStyles, {
  LARGE_FONT_SIZE,
  ORANGE_COLOR,
  PALATINO_BOLD_FONT,
  PALATINO_FONT,
  SMALL_FONT_SIZE,
} from '../../Styles/global';
import { BLUE_COLOR, CONTAINER_BORDER } from '../../Styles/global';
import CountdownTimer from '../ReuseableComponents/CountdownTimer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { SelectCountry } from 'react-native-element-dropdown';
import RenderIf from '../ExtraScreens/RenderIf';
import Image from 'react-native-image-lazy-loading';


const { width, height } = Dimensions.get('window');
import axios from 'axios';
import babelConfig from '../../babel.config';
import MyBottomSheet from '../StackScreens/MyBottomSheet';
import RenderMainImage from '../ReuseableComponents/RenderMainImage';
import BidBottemSheet from '../StackScreens/BidBottomSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function MyCars({navigation}) {

  const [isLoading, setIsLoading] = useState(false);
  const [data,setData] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);


  useEffect(() => {
   getData();
  }, [])
  

  const getData = async() =>{

  let id = await AsyncStorage.getItem("user_id");
  if(id != null){ 
   let response = await axios.post('https://crm.unificars.com/api/mybids', {
        'user_id':id,
      })
      console.log("response ",response.data);
      if(response.data.code == 200){
        setData(response.data.data);
      }
      else{
        console.log('error ',response.data.code);
      }
    }
  }
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[globalStyles.contentContainer]}
        onPress={() => { navigation.navigate('car_profile', { auction_id: item.id }) }}>
        <View style={globalStyles.flexBox}>
          <ImageBackground style={[globalStyles.image]}>
            {/* {renderImage(item)} */}
            {/* <RenderMainImage item={item} /> */}
            <Image
                    source={{ uri: item.lead.images.find(
                      obj => obj.title === 'Front Main',
                  ).image }}
                    style={globalStyles.image}
                />
            <View style={[globalStyles.textContainer]}>
              <Text style={[globalStyles.text]}>
                {item.lead.model}
                {item.lead.brand}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View
          style={[
            globalStyles.wrapContainer,
            globalStyles.belt,
            globalStyles.rowContainer,
            globalStyles.flexBoxJustify,
          ]}>
          <View
            style={[
              globalStyles.rowContainer,
              globalStyles.flexBox,
              globalStyles.beltItem,
            ]}>
            <MaterialCommunityIcons
              name="gas-station-outline"
              size={15}
              style={globalStyles.beltItemIcon}
            />
            <Text style={globalStyles.beltItemText}>
              {item.lead.engine_type}
            </Text>
          </View>
          <View
            style={[
              globalStyles.rowContainer,
              globalStyles.flexBox,
              globalStyles.beltItem,
            ]}>
            <MaterialCommunityIcons
              name="car-shift-pattern"
              size={13}
              style={globalStyles.beltItemIcon}
            />
            <Text style={globalStyles.beltItemText}>Manual</Text>
          </View>
          <View
            style={[
              globalStyles.rowContainer,
              globalStyles.flexBox,
              globalStyles.beltItem,
            ]}>
            <MaterialCommunityIcons
              name="road-variant"
              size={15}
              style={globalStyles.beltItemIcon}
            />
            <Text style={globalStyles.beltItemText}>{item.lead.km_driven}</Text>
          </View>
          <View
            style={[
              globalStyles.rowContainer,
              globalStyles.flexBox,
              globalStyles.beltItem,
            ]}>
            <MaterialCommunityIcons
              name="account-outline"
              size={16}
              style={globalStyles.beltItemIcon}
            />
            <Text style={globalStyles.beltItemText}>{item.lead.ownership}</Text>
          </View>
          <View
            style={[
              globalStyles.rowContainer,
              globalStyles.flexBox,
              globalStyles.beltItem,
            ]}>
            <Entypo
              name="location"
              size={13}
              style={globalStyles.beltItemIcon}
            />
            <Text style={globalStyles.beltItemText}>
              {item.lead.registration_in}
            </Text>
          </View>
        </View>
        <View
          style={[
            globalStyles.columnContainer,
            globalStyles.contentChildContainer,
          ]}>

        </View>
        <View
          style={[
            globalStyles.rowContainer,
            { justifyContent: 'space-between' },
          ]}>
          <View>
            <View
              style={{
                width: 100,
                height: 50,
                position: 'absolute',
                backgroundColor: BLUE_COLOR,
              }}></View>
            <View
              style={[globalStyles.highestBidContainer, globalStyles.flexBox]}>
              <View
                style={[
                  globalStyles.flexBox,
                  { transform: [{ skewX: '20deg' }, { perspective: 100 }] },
                ]}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontWeight: '500',
                    fontSize: SMALL_FONT_SIZE,
                  }}>
                  Highest Bid
                </Text>
                <Text
                  style={{
                    color: '#ffffff',
                    fontSize: LARGE_FONT_SIZE,
                    fontWeight: '700',
                  }}>
                  Rs. {parseInt(item.highest_bid).toLocaleString('en-IN')}
                </Text>
              </View>
            </View>
          </View>
          <CountdownTimer
            stamps={{
              'start_time': item.start_time,
              'start_date': item.start_date,
              'end_time': item.end_time,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const onRefresh = () => {
    // Set isRefreshing to true to show the loading indicator
    setIsRefreshing(true);

    // Fetch data when the user pulls down to refresh
    getData();
  };
  // console.log("data => ",data)
  return (
    <SafeAreaView style={[globalStyles.mainContainer]}>
     <FlatList
          data={data.auction}
          // data={[]}
          renderItem={renderItem}
          style={[globalStyles.scrollViewContainer]}
          showsVerticalScrollIndicator={false}
          // refreshControl={()=>{}}
          keyExtractor={item => item.id.toString()} // Replace with your unique key
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        />

    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({})