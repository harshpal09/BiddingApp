import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Alert,
} from 'react-native';
import globalStyles, { LARGE_FONT_SIZE, ORANGE_COLOR, RP_S, SMALL_FONT_SIZE, BLUE_COLOR, CONTAINER_BORDER ,PALATINO_BOLD_FONT, height} from '../../Styles/global';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { useFocusEffect } from '@react-navigation/native';
import LoadingComponent from '../ReuseableComponents/LoadingComponent';

export default function MyAutions({ navigation }) {
  const [data, setData] = useState(undefined);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [message, setMessage] = useState('');
  const [loading,setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  useEffect(() => {
    getData();
  }, [navigation]);

  const verticalScrollviewRef = useRef();

  const scrollToVerticalComponent = () => {
    if (verticalScrollviewRef.current) {
      const yOffset = 0;
      verticalScrollviewRef.current.scrollToOffset({ offset: yOffset, animated: true });
    }
  };


  const oneClickBuy = async(auction_id) => {
    let id = await AsyncStorage.getItem('user_id');
    // console.log("id =>",id," auction id =>",auction_id)
    if (id != null) {
      try {
        let response = await axios.post('https://crm.unificars.com/api/ocbwinner', {dealer_id:id,auction_id:auction_id})
        if(response.data.code == 200){
          Alert.alert('Succesfully !', 'Congratulations Now you owned this car ...!',
          [
            {
              text: 'OK',
              onPress: () => {
                getData();
              },
            },
          ],
          );
           
        }
      }
      catch (e) {
        console.log('error =>', e);
      }
      finally {
       
      }
    }
  } 


  const getData = async () => {
    let id = await AsyncStorage.getItem('user_id');
    if (id != null) {
      try {
        setLoading(true);
        let response = await axios.get('https://crm.unificars.com/api/fetch-ocb-data', { user_id: id });
        if (response.data.code === 200) {
          setData(response.data.data.auction);
          if (response.data.data.auction.length === 0) {
            setMessage('No Data Available');
          }
        } else {
          console.log(response.data.status);
        }
      } catch (e) {
        console.log('error =>', e);
      } finally {
        setLoading(false);
        setIsRefreshing(false);
      }
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    getData();
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[globalStyles.contentContainer]}
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate('car_profile', { auction_id: item.id, type: 'ocb', closure_amount: item.closure_amount });
        }}>
        <View style={globalStyles.flexBox}>
          <ImageBackground
            source={{ uri: item.lead.images[0].image }}
            style={[globalStyles.image]}>
            <FastImage
              source={{ uri: item.lead.images[0].image, priority: FastImage.priority.high }}
              style={globalStyles.image}
            />
            <View style={[globalStyles.textContainer]}>
              <Text style={[globalStyles.text]}>
                {item.lead.model} {item.lead.brand}
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
            {marginBottom:0}
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
              {item.lead.registration_in.substring(0, 4) + "XXXX"}
            </Text>
          </View>
        </View>
        {/* <View
          style={[
            globalStyles.columnContainer,
            globalStyles.contentChildContainer,
          ]}>

        </View> */}
        {/* <View
          style={[
            globalStyles.rowContainer,
            { justifyContent: 'space-between' },
          ]}>
          <View style={{width:'100%'}}>
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
                  { transform: [{ skewX: '20deg' }] },
                ]}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: SMALL_FONT_SIZE,
                  }}>
                  Final Amount
                </Text>
                <Text
                  style={{
                    color: '#ffffff',
                    fontSize: LARGE_FONT_SIZE,
                    fontWeight: '700',
                  }}>
                  {RP_S} {parseInt(item.closure_amount).toLocaleString('en-IN')}
                </Text>
              </View>
            </View>
          </View>
        </View> */}
        <TouchableOpacity activeOpacity={0.9} onPress={() => {oneClickBuy(item.id)}} style={[globalStyles.flexBox]}>
          <View
            style={[
              {
                width: '100%',
                height: 40,
                backgroundColor: BLUE_COLOR,
                borderBottomLeftRadius: CONTAINER_BORDER,
                borderTopRightRadius: CONTAINER_BORDER,
                marginTop: 10,
              },
              globalStyles.flexBox,
            ]}>
            <Text
              style={{
                color: '#ffffff',
                fontFamily: PALATINO_BOLD_FONT,
                fontSize: LARGE_FONT_SIZE,
                fontWeight: '700',
              }}>
              Click To Buy    {RP_S} {parseInt(item.closure_amount).toLocaleString('en-IN')}
            </Text>
          </View>

      </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[globalStyles.mainContainer, globalStyles.flexBox]}>
       { loading ? <LoadingComponent /> :
      <FlatList
        ref={verticalScrollviewRef}
        data={data}
        renderItem={renderItem}
        style={[globalStyles.scrollViewContainer]}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={() => (
          <>
            {loading ? <LoadingComponent /> :
            <ScrollView style={[{flex:1, backgroundColor:'transparent',height:height-300 }]}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }>
              <View style={[globalStyles.flexBox,{height:height-300}]}>
                <Text style={{fontSize:20,fontWeight:'bold',}}>{message}</Text>
              </View>
              
            </ScrollView>
        }

          </>
        )}
      />
        }
    </View>
  );
}

