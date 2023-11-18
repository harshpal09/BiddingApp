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
import {
  BLUE_COLOR,
  LARGE_FONT_SIZE,
  SMALL_FONT_SIZE,
  CONTAINER_BORDER,
  PALATINO_BOLD_FONT,
  width,
  RP_S,
  MEDIUM_FONT_SIZE,
  EXTRA_LARGE_FONT_SIZE,
} from '../../Styles/global';
import RenderMainImage from '../ReuseableComponents/RenderMainImage';
import CountdownTimer from '../ReuseableComponents/CountdownTimer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
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
      if (response.data.code == 200) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error('Network request error:', error);
    } finally {
      setIsloading(false);
    }
  };
  renderItem = ({item}) => {
    return (
      <TouchableOpacity style={[globalStyles.cartProductContainer]}
      onPress={() => { navigation.navigate('car_profile', { auction_id: item.id }) }}>

        {/* {console.log("DFGHJK",item)} */}
        <View style={globalStyles.cartImageContainer}>
          <FastImage
            style={globalStyles.cartImage}
            source={
              item.lead.images.length > 0
                ? {
                    uri: item.lead.images[0].image,
                    priority: FastImage.priority.high,
                  }
                : null
            }
          />
        </View>
        <View style={globalStyles.negoContentContainer}>
          <View style={globalStyles.cartTextContainer}>
            <Text
              style={[
                globalStyles.cartProductTitle,
                {color: BLUE_COLOR, fontWeight: '800'},
              ]}>
              {item.lead.model + ' '}
              {item.lead.brand}
            </Text>
          </View>
          <View style={globalStyles.cartTextContainer}>
            <Text
              style={[
                globalStyles.cartModelText,
                {color: BLUE_COLOR, fontWeight: '600'},
              ]}>
              {' '}
              Bid Price: {RP_S+item.highest_bid}
            </Text>
          </View>
          <View
            style={[
              globalStyles.wrapContainer,
              globalStyles.belt,
              globalStyles.rowContainer,
              globalStyles.flexBoxJustify,
              {borderRadius:10,width:'95%',justifyContent:'space-around'}
            ]}>
            <View
              style={[
                globalStyles.rowContainer,
                globalStyles.flexBox,
                globalStyles.beltItem,
              ]}>
              <MaterialCommunityIcons
                name="gas-station-outline"
                size={EXTRA_LARGE_FONT_SIZE}
                style={[globalStyles.beltItemIcon,{fontWeight:'900'}]}
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
                size={EXTRA_LARGE_FONT_SIZE}
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
              <Text style={globalStyles.beltItemText}>
                {item.lead.km_driven + " KM"}
              </Text>
            </View>
            <View
              style={[
                globalStyles.rowContainer,
                globalStyles.flexBox,
                globalStyles.beltItem,
              ]}>
              <MaterialCommunityIcons
                name="account-outline"
                size={EXTRA_LARGE_FONT_SIZE}
                style={globalStyles.beltItemIcon}
              />
              <Text style={globalStyles.beltItemText}>
                {item.lead.ownership}
              </Text>
            </View>
            <View
              style={[
                globalStyles.rowContainer,
                globalStyles.flexBox,
                globalStyles.beltItem,
              ]}>
              <Entypo
                name="location"
                size={EXTRA_LARGE_FONT_SIZE}
                style={globalStyles.beltItemIcon}
              />
              <Text style={globalStyles.beltItemText}>
                {item.lead.registration_in.substring(0, 4) + 'XXXX'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
              No data
            </Text>
          ) : (
            <View style={[{padding: 10, width: '100%', flex: 1}]}>
              <FlatList data={data} renderItem={renderItem} />
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
