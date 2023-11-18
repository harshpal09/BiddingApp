import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RenderIf, globalStyles} from '../../export';
import {BLUE_COLOR, LARGE_FONT_SIZE,SMALL_FONT_SIZE,CONTAINER_BORDER,PALATINO_BOLD_FONT, width} from '../../Styles/global';
import RenderMainImage from '../ReuseableComponents/RenderMainImage';
import CountdownTimer from '../ReuseableComponents/CountdownTimer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import FastImage from 'react-native-fast-image';
 

export default function Nagotiation({navigation}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setIsloading(true);
    let id = await AsyncStorage.getItem('user_id');
    try {
      const response = await axios.post(
        'https://crm.unificars.com/api/auctionstatus',
        {
          user_id: id,
          status: 1,
        },
      );
    } catch (error) {
      console.error('Network request error:', error);
    } finally {
      setIsloading(false)
    }
  };
  renderItem = ({ item }) => {
    return (
      // <TouchableOpacity
      //   style={[globalStyles.contentContainer]}
      //   activeOpacity={0.9}
      //   onPress={() => { navigation.navigate('car_profile', { auction_id: item.id }) }}>
          
      //   {/* {console.log(item.id," name ",item.lead.brand)} */}
      //   <View style={globalStyles.flexBox}>
      //     <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmbz0ELuNovZruM2dBUbLnLghxb5z_o8C4pOlt13ZLMtWa9IN1vmGTw_RUKd9gNMjn6fg&usqp=CAU' }} style={[globalStyles.image]}>
      //       <FastImage style={globalStyles.image} source={item.lead.images.length > 0 ?  {  uri : item.lead.images[0].image ,priority:FastImage.priority.high}: null} />
      //       <View style={[globalStyles.textContainer]}>
      //         <Text style={[globalStyles.text]}>
      //           {item.lead.model + " "}
      //           {item.lead.brand}
      //         </Text>
      //       </View>
      //     </ImageBackground>
      //   </View>
      //   <View
      //     style={[
      //       globalStyles.wrapContainer,
      //       globalStyles.belt,
      //       globalStyles.rowContainer,
      //       globalStyles.flexBoxJustify,
      //     ]}>
      //     <View
      //       style={[
      //         globalStyles.rowContainer,
      //         globalStyles.flexBox,
      //         globalStyles.beltItem,
      //       ]}>
      //       <MaterialCommunityIcons
      //         name="gas-station-outline"
      //         size={15}
      //         style={globalStyles.beltItemIcon}
      //       />
      //       <Text style={globalStyles.beltItemText}>
      //         {item.lead.engine_type}
      //       </Text>
      //     </View>
      //     <View
      //       style={[
      //         globalStyles.rowContainer,
      //         globalStyles.flexBox,
      //         globalStyles.beltItem,
      //       ]}>
      //       <MaterialCommunityIcons
      //         name="car-shift-pattern"
      //         size={13}
      //         style={globalStyles.beltItemIcon}
      //       />
      //       <Text style={globalStyles.beltItemText}>Manual</Text>
      //     </View>
      //     <View
      //       style={[
      //         globalStyles.rowContainer,
      //         globalStyles.flexBox,
      //         globalStyles.beltItem,
      //       ]}>
      //       <MaterialCommunityIcons
      //         name="road-variant"
      //         size={15}
      //         style={globalStyles.beltItemIcon}
      //       />
      //       <Text style={globalStyles.beltItemText}>{item.lead.km_driven}</Text>
      //     </View>
      //     <View
      //       style={[
      //         globalStyles.rowContainer,
      //         globalStyles.flexBox,
      //         globalStyles.beltItem,
      //       ]}>
      //       <MaterialCommunityIcons
      //         name="account-outline"
      //         size={16}
      //         style={globalStyles.beltItemIcon}
      //       />
      //       <Text style={globalStyles.beltItemText}>{item.lead.ownership}</Text>
      //     </View>
      //     <View
      //       style={[
      //         globalStyles.rowContainer,
      //         globalStyles.flexBox,
      //         globalStyles.beltItem,
      //       ]}>
      //       <Entypo
      //         name="location"
      //         size={13}
      //         style={globalStyles.beltItemIcon}
      //       />
      //       <Text style={globalStyles.beltItemText}>
      //         {item.lead.registration_in.substring(0, 4) + "XXXX"}
      //       </Text>
      //     </View>
      //   </View>
      //   <View
      //     style={[
      //       globalStyles.rowContainer,
      //       { justifyContent: 'space-between' },
      //     ]}>
      //     <View>
      //       <View
      //         style={[globalStyles.negoHighestBidContainer, globalStyles.flexBox,{width:width-10}]}>
      //         <View
      //           style={[
      //             globalStyles.flexBox,
      //           ]}>
      //           <Text
      //             style={{
      //               color: '#fff',
      //               fontWeight: '700',
      //               fontSize: SMALL_FONT_SIZE,
      //             }}>
      //             Highest Bid
      //           </Text>
      //           <Text
      //             style={{
      //               color: '#ffffff',
      //               fontSize: LARGE_FONT_SIZE,
      //               fontWeight: '700',
      //             }}>
      //             Rs. {parseInt(item.highest_bid).toLocaleString('en-IN')}
      //           </Text>
      //         </View>
      //       </View>
      //     </View>
         
      //   </View>
      // </TouchableOpacity>
        <View style={globalStyles.cartProductContainer} >
          <View style={globalStyles.cartImageContainer} >
            <FastImage style={globalStyles.cartImage} source={item.lead.images.length > 0 ?  {  uri : item.lead.images[0].image ,priority:FastImage.priority.high}: null} />
          </View>
          <View style={globalStyles.negoContentContainer}>
            <View style={globalStyles.cartTextContainer}>
              <Text style={globalStyles.cartProductTitle}>{item.lead.model + " "}{item.lead.brand}</Text>
            </View>
            <View style={globalStyles.cartTextContainer}>
              <Text style={globalStyles.cartModelText}> Unit Price: {item}</Text>
            </View>
            <View style={globalStyles.cartTextContainer}>
              <Text style={globalStyles.cartModelText}> Total Price: {item.total}</Text>
            </View>
          </View>
        </View>
    );
  };

  return (
    <SafeAreaView style={[globalStyles.flexBox, {height: '100%'}]}>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={'black'} />
      ) : (
        <>
          {data.length == 0 ? (
            <Text
              style={{
                fontSize: LARGE_FONT_SIZE,
                color: '#000',
                fontWeight: '800',
              }}>
              No data Available
            </Text>
          ) : (
            <FlatList
              data={data}
              renderItem={renderItem}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
