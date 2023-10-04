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

// const arr = [
//   'Diesel',
//   'Petrol',
//   '1st owenership',
//   'Less than 3 years',
//   'Scrap cars',
//   'No structure damage',
//   'Premium cars',
// ];
// const data = [
//   {
//     image:
//       'https://listings.unificars.com/_next/image?url=https%3A%2F%2Fcrm.unificars.com%2Fuploads%2Fwebsite%2F202308181658Group%2012.jpg&w=1920&q=75',
//     name: '2015 AUDI Q3 TDI QUATTRO',
//     bidding_time: 3600,
//     price: 'Rs 4,94,000',
//     highest_bidding: 'Rs 14,844',
//     car_details: {
//       engine: 'Diesel',
//       feature: 'Manual',
//       run: '1,12,32 Km',
//       owner: '1st Owner',
//       registration: 'DL6C',
//     },
//   },
//   {
//     image:
//       'https://listings.unificars.com/_next/image?url=https%3A%2F%2Fcrm.unificars.com%2Fuploads%2Fwebsite%2F202304031825WhatsApp%20Image%202023-04-03%20at%206.24.40%20PM.jpeg&w=1920&q=75',
//     name: '2013 JAGUAR XF',
//     bidding_time: 3600,
//     price: 'Rs 4,94,000',
//     highest_bidding: 'Rs 14,844',
//     car_details: {
//       engine: 'Diesel',
//       feature: 'Manual',
//       run: '1,12,32 Km',
//       owner: '1st Owner',
//       registration: 'DL3C',
//     },
//   },
//   {
//     image:
//       'https://listings.unificars.com/_next/image?url=https%3A%2F%2Fcrm.unificars.com%2Fuploads%2Fwebsite%2F202305101704Group%2014.jpg&w=1920&q=75',
//     name: '2014 AUDI A6',
//     bidding_time: 3600,
//     price: 'Rs 4,94,000',
//     highest_bidding: 'Rs 14,844',
//     car_details: {
//       engine: 'Diesel',
//       feature: 'Manual',
//       run: '1,12,32 Km',
//       owner: '1sd Owner',
//       registration: 'DL6C',
//     },
//   },
// ];
export default function HomeScreen({ navigation }) {

  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isBidModalVisible, setBidModalVisible] = useState(false);
  const [bidData, setBidData] = useState({})
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleBidModal = (id,bid,step_price) => {
    setBidData({'auction_id':id,'current_price':bid,'step_price':step_price});
    setBidModalVisible(!isBidModalVisible);
  };

  useEffect(() => {
    
    getData();
  }, []);
  const getData = async () => {
    setIsRefreshing(true);
    let response = await axios.post('https://crm.unificars.com/api/live-auctions', {
        user: 11,
      })
      if (response.data.code == 200) {
        // console.log("data =>",response.data.data.auction);
        setData(response.data.data.auction);
      } else {
        console.log(response.data.status);
      }
    setIsRefreshing(false);

    
  };

  const calculateTimeLeft = (currentDate, startTime, endTime) => {
    const currentDateObj = new Date();
    const startTimeObj = new Date(`${currentDate}T${startTime}`);
    const endTimeObj = new Date(`${currentDate}T${endTime}`);
    const currentTimestamp = currentDateObj.getTime();

    // Calculate the time left in seconds until the auction starts
    const timeLeftToStartInSeconds =
      currentTimestamp < startTimeObj.getTime()
        ? Math.floor((startTimeObj - currentTimestamp) / 1000)
        : 0;




    // console.log('time left to start in seconds =>',timeLeftToStartInSeconds);
    // Calculate the time left in seconds until the auction ends
    const timeLeftInSeconds =
      currentTimestamp >= startTimeObj.getTime()
        ? Math.floor((endTimeObj - currentTimestamp) / 1000)
        : 0;

    // Check if the auction is valid to start
    const isAuctionValid =
      currentTimestamp >= startTimeObj.getTime() &&
      currentTimestamp < endTimeObj.getTime();

    if (timeLeftToStartInSeconds > 0) {
      return {
        timeLeftInSeconds: timeLeftToStartInSeconds,
        isAuctionValid: false,
        message: `Auction starts in ${timeLeftToStartInSeconds} seconds`,
      };
    } else {
      return {
        timeLeftInSeconds: timeLeftInSeconds,
        isAuctionValid: isAuctionValid,
        message: "Auction is live",
      };
    }
  };


  const onRefresh = () => {
    // Set isRefreshing to true to show the loading indicator
    setIsRefreshing(true);

    // Fetch data when the user pulls down to refresh
    getData();
  };
  // console.log('remaining seconds =>',remainingSeconds);

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[globalStyles.contentContainer]}
        activeOpacity={0.9}
        onPress={() => { navigation.navigate('car_profile', { auction_id: item.id }) }}>
        <View style={globalStyles.flexBox}>
          <ImageBackground source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmbz0ELuNovZruM2dBUbLnLghxb5z_o8C4pOlt13ZLMtWa9IN1vmGTw_RUKd9gNMjn6fg&usqp=CAU'}} style={[globalStyles.image]}>
            <RenderMainImage item={item} />
            <View style={[globalStyles.textContainer]}>
              <Text style={[globalStyles.text]}>
                {item.lead.model+" "}
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
        <TouchableOpacity activeOpacity={calculateTimeLeft(item.start_date, item.start_time, item.end_time)
          .timeLeftInSeconds == 0 ? 0.1 : 0.1} disabled={calculateTimeLeft(item.start_date, item.start_time, item.end_time)
            .timeLeftInSeconds == 0 ? true : false} onPress={()=>toggleBidModal(item.id,item.highest_bid,item.step_price)} d style={[globalStyles.flexBox]}>
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
              Placed Bid
            </Text>
          </View>
          <Modal
            animationType="slide" // Choose an animation type (slide, fade, etc.)
            transparent={true} // Make the modal background transparent
            visible={isBidModalVisible}
            onRequestClose={() => {
              // Handle modal closing here (e.g., pressing the back button on Android)
              toggleBidModal(null,null);
            }}

          >
            {/* Modal Content */}
            <BidBottemSheet callGetData={getData} toggleModal={()=>toggleBidModal(null,null)} data={bidData} />
          </Modal>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (

    <View style={[globalStyles.mainContainer, globalStyles.flexBox]}>
      <View style={{ width: '100%', height: '100%' }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          style={[globalStyles.scrollViewContainer]}
          showsVerticalScrollIndicator={false}
          // refreshControl={()=>{}}
          keyExtractor={item => item.id.toString()} // Replace with your unique key
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        />
        <View
          style={[
            {
              position: 'absolute',
              width: '100%',
              height: 40,
              backgroundColor: 'transparent',
              bottom: 20,
            },
            globalStyles.flexBoxAlign,
          ]}>
          <View
            style={[
              {
                width: '50%',
                height: 40,
                backgroundColor: 'white',
                justifyContent: 'space-around',
                borderRadius: 8,
              },
              globalStyles.flexBoxAlign,
              globalStyles.rowContainer,
              globalStyles.shadow,
            ]}>
            {/* <View style={[globalStyles.rowContainer,{backgroundColor:'red',justifyContent:'space-around'}]}> */}
            <TouchableOpacity style={[globalStyles.rowContainer]} onPress={toggleModal}>
              <MaterialCommunityIcons
                name="filter-menu-outline"
                size={25}
                style={[{ padding: 5 }]}
              />
              <Text
                style={[
                  {
                    fontFamily: PALATINO_FONT,
                    fontSize: LARGE_FONT_SIZE,
                    padding: 7,
                    fontWeight: '500',
                  },
                ]}>
                Filter
              </Text>
              <Modal
                animationType="slide" // Choose an animation type (slide, fade, etc.)
                transparent={true} // Make the modal background transparent
                visible={isModalVisible}
                onRequestClose={() => {
                  // Handle modal closing here (e.g., pressing the back button on Android)
                  toggleModal();
                }}
                style={{}}
              >
                {/* Modal Content */}
                <MyBottomSheet toggleModal={toggleModal} />
              </Modal>
            </TouchableOpacity>
            <View
              style={[{ width: 5, height: 30, backgroundColor: 'grey' }]}></View>
            <TouchableOpacity style={[globalStyles.rowContainer]}>
              <MaterialCommunityIcons
                name="heart-outline"
                size={25}
                tyle={[{ padding: 15 }]}
              />
              <Text
                style={[
                  {
                    fontFamily: PALATINO_FONT,
                    fontSize: LARGE_FONT_SIZE,
                    padding: 5,
                    fontWeight: '500',
                  },
                ]}>
                Wishlist
              </Text>
            </TouchableOpacity>
            {/* </View> */}
          </View>

        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({});
