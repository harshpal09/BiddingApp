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
  KeyboardAvoidingView,
  Platform,
  
} from 'react-native';
import React, { Fragment, useRef, useState, useEffect } from 'react';
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
import Entypo from 'react-native-vector-icons/Entypo';
import { SelectCountry } from 'react-native-element-dropdown';
import RenderIf from '../ExtraScreens/RenderIf';
import Image from 'react-native-image-lazy-loading';
import Svg, { Circle, Rect, Line, Path } from 'react-native-svg';


const { width, height } = Dimensions.get('window');
import axios from 'axios';
import babelConfig from '../../babel.config';
import MyBottomSheet from '../StackScreens/MyBottomSheet';
import RenderMainImage from '../ReuseableComponents/RenderMainImage';
import BidBottemSheet from '../StackScreens/BidBottomSheet';
import PopupMessage from '../ReuseableComponents/PopupMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from '../ReuseableComponents/LoadingComponent';
import Modal from 'react-native-modal';
import { useFocusEffect } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {

  const [data, setData] = useState(undefined);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isBidModalVisible, setBidModalVisible] = useState(false);
  const [bidData, setBidData] = useState({})
  const [showButton, setShowButton] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [models, setModels] = useState([]);
  const [paramerter, setParameter] = useState({})
  const [message,setMessage] = useState("");
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleBidModal = (id, bid, step_price) => {
    setBidData({ 'auction_id': id, 'current_price': bid, 'step_price': step_price });
    setBidModalVisible(!isBidModalVisible);
  };
  const updateParameter = (newParameter) => {
    setParameter(newParameter);
  };
  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );
  useEffect(() => {
    const timer = setInterval(() => {
      setShowButton(true);
    }, 60000); // 60 seconds in milliseconds

    return () => clearInterval(timer);
  }, [showButton]);

  useEffect(() => {
    // getModel();
    // setFilterParam();
    getData();
  }, []);

  // const setFilterParam = async() =>{
  //   try {
  //     const val =  await AsyncStorage.getItem('filters');
  //     console.log()
  //   } catch (error) {
  //     console.log('error =>', error);
  //   }
  // }
  
  const getData = async () => {

    // console.log('get data filters =>',obj);

    // if (id != null) {
      try {
        setToggle(true);
        setShowButton(false);
        setIsRefreshing(true);
        let param = await AsyncStorage.getItem('filters').then(async(param)=>{
           AsyncStorage.getItem('user_id').then((id)=>{
            let obj = {...JSON.parse(param)}
            obj.user_id = id;
             axios.post('https://crm.unificars.com/api/filterauction',obj).then((response)=>{
              if (response.data.code == 200) {
                // console.log("data =>", id);
                setData(response.data.data.auction);
                if(response.data.data.auction.length == 0){
                  setMessage("No Data Available");
                }
      
              } else {
                // console.log(response.data.status);
              }
            })
          })
        })

       
        
      }
      catch (e) {
        console.log('error =>', e);
      }
      finally {
        // setModalVisible(false);
        setBidModalVisible(false);
        setToggle(false);
        setIsRefreshing(false);
        
      }
    // }
  };
  const onRefresh = () => {
    // Set isRefreshing to true to show the loading indicator
    setIsRefreshing(true);

    // Fetch data when the user pulls down to refresh
    getData();
  };
  const callGetData = async () => {
      // console.log("parameter =>",paramerter)

      try {
        AsyncStorage.getItem('user_id').then((id)=>{
          let obj = {...paramerter}
          obj.user_id = id;
          console.log('data obj=>',obj)
           axios.post('https://crm.unificars.com/api/filterauction',obj).then((response)=>{
            if (response.data.code == 200) {
              // console.log("data =>", id);
              setData(response.data.data.auction);
              if(response.data.data.auction.length == 0){
                setMessage("No Data Available");
              }
    
            } else {
              // console.log(response.data.status);
            }
          })
        })
      }
      catch (e) { 
        console.log('error =>', e);
      }
      finally {
        setModalVisible(false);
        setBidModalVisible(false);
      }
  }
  // console.log(' set',paramerter)


  const verticalScrollviewRef = useRef();
  const scrollToVerticalComponent = () => {
    if (verticalScrollviewRef.current) {
      const yOffset = 0; // Adjust the yOffset as needed
      verticalScrollviewRef.current.scrollToOffset({ offset: yOffset, animated: true });
    }
  };
  // console.log("param ",paramerter)

  const setFilters = async() =>{
    try {     
      await AsyncStorage.getItem('user_id').then(async(id)=>{

        let obj = {...paramerter}
        obj.user_id = id; 
        setParameter(obj);
        console.log("id =>",id);
         await AsyncStorage.setItem('filters',JSON.stringify(obj)).then(()=>{
          callGetData();
         })
      })
    } catch (error) {
      console.log('error =>', error);
    }
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[globalStyles.contentContainer]}
        activeOpacity={0.9}
        onPress={() => { 
          navigation.navigate('car_profile', 
          { 
            auction_id: item.id ,
            type : "details",
            closure_amount : "",
          }
          )}}>
          
        {/* {console.log(item.id," name ",item.lead.brand)} */}
        <View style={globalStyles.flexBox}>
          <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmbz0ELuNovZruM2dBUbLnLghxb5z_o8C4pOlt13ZLMtWa9IN1vmGTw_RUKd9gNMjn6fg&usqp=CAU' }} style={[globalStyles.image]}>
            <RenderMainImage item={item} />
            {console.log("uct =>",item.id == 875 ? item.my_highest:null)}
            {item.my_highest != 2 ? 
            <View style={[globalStyles.textContainer,{bottom:175,backgroundColor:item.my_highest == 1 ? 'green': 'red',borderRadius:2},globalStyles.flexBox]}>
              <Text style={[globalStyles.text]}>
              {item.my_highest == 1 ?"You are Leading!":"You are loosing the Auction"}
              </Text>
            </View>
            :<></>}

            <View style={[globalStyles.textContainer]}>
              <Text style={[globalStyles.text]}>
                {item.lead.model + " "}{item.lead.brand}
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
              {item.lead.registration_in.substring(0, 4) + "XXXX"}
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
                  { transform: [{ skewX: '20deg' }] },
                ]}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '700',
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
        <TouchableOpacity activeOpacity={0.9} onPress={() => toggleBidModal(item.id, item.highest_bid, item.step_price)} d style={[globalStyles.flexBox]}>
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

        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  // console.log("data")
  return (

    <View style={[globalStyles.mainContainer, globalStyles.flexBox]}>
      {toggle ? <LoadingComponent /> :

        <View style={{ width: '100%', height: '100%' }}>
          {showButton && (
            <TouchableOpacity style={{ paddingHorizontal: 10, top: -10, zIndex: 1 }} onPress={() => { onRefresh(), scrollToVerticalComponent() }}>
              <PopupMessage message={'Pull to Refresh'} />
            </TouchableOpacity>
          )}
          {data != undefined && Array.isArray(data) && data.length == 0? <View style={[globalStyles.flexBox,{height:height-100}]}><Text>{message}</Text></View>:

          <FlatList
            ref={verticalScrollviewRef}
            data={data != undefined && data}
            renderItem={renderItem}
            style={[globalStyles.scrollViewContainer]}
            showsVerticalScrollIndicator={false}
            // refreshControl={()=>{}}
            keyExtractor={item => item.id.toString()} // Replace with your unique key
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
          />}
          
          <Modal

            style={{ marginLeft: 0, marginBottom: 0 }}
            isVisible={isBidModalVisible}
            onBackdropPress={() => toggleBidModal(null, null)}
          >
            <></>
            <BidBottemSheet setFilters={setFilters} toggleModal={() => toggleBidModal(null, null)} data={bidData} />
          </Modal>

          <Modal
            style={{ marginLeft: 0, marginBottom: 0, position: 'relative' }}
            isVisible={isModalVisible}
            onBackdropPress={() => toggleModal(null, null)}
          >
            {/* Modal Content */}
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <MyBottomSheet callGetData={setFilters} setParam={updateParameter} models={models} toggleModal={toggleModal} />
            </KeyboardAvoidingView>
          </Modal>

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
                  width: '60%',
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
              <TouchableOpacity style={[globalStyles.rowContainer, globalStyles.flexBox,]} onPress={toggleModal}>
                <MaterialCommunityIcons
                  name="filter-menu-outline"
                  size={25}
                  style={[{ padding: 5, color: '#000' }]}
                />
                <Text
                  style={[
                    {
                      fontFamily: PALATINO_FONT,
                      fontSize: LARGE_FONT_SIZE,
                      padding: 7,
                      fontWeight: '700',
                      color: '#000'
                    },
                  ]}>
                  Filter
                </Text>

              </TouchableOpacity>
              <View
                style={[{ width: 5, height: 30, backgroundColor: 'grey' }]}></View>
              <TouchableOpacity style={[globalStyles.rowContainer, globalStyles.flexBox]} activeOpacity={0.9}>
                <MaterialCommunityIcons
                  name="heart-outline"
                  size={25}
                  color={'#000'}
                // style={[{ padding: 15 }]}
                />
                <Text
                  style={[
                    {
                      fontFamily: PALATINO_FONT,
                      fontSize: LARGE_FONT_SIZE,
                      padding: 5,
                      fontWeight: '700',
                      color: '#000'
                    },
                  ]}>
                  Wishlist
                </Text>
              </TouchableOpacity>
              {/* </View> */}
            </View>

          </View>
        </View>
      }

    </View>
  );
}

const styles = StyleSheet.create({});
