import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TurboModuleRegistry,
  Button,
  ActivityIndicator,
  Alert,
  Modal
} from 'react-native';
import Share from 'react-native-share';
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
} from 'react';
import globalStyles, {
  BLUE_COLOR,
  CONTAINER_BORDER,
  LARGE_FONT_SIZE,
  LIGHT_BLUE,
  MEDIUM_FONT_SIZE,
  PALATINO_BOLD_FONT,
  RP_S,
  SMALL_FONT_SIZE,
  VERY_SMALL_FONT_SIZE,
} from '../../Styles/global';
import ImageViewer from 'react-native-image-zoom-viewer';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native-gesture-handler';
import {DetailsComponent, RenderIf} from '../../export';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import LazyloadImage from 'react-native-image-lazy-loading';
import BidBottemSheet from './BidBottomSheet';
import LoadingComponent from '../ReuseableComponents/LoadingComponent';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

export default function CarProfile({route}) {
  const [val, setVal] = useState(0);
  const [index, setIndex] = useState(0);
  const [height_val, setHeightVal] = useState('');
  const [offset, setOffset] = useState('');
  const [heightArray, setHeightArray] = useState([]);
  const [weightArray, setWeightArray] = useState([]);
  const [prefixSumArray, setPrefixSumArray] = useState([]);
  const [widthPrefixSum, setWidthPrefixSum] = useState([]);
  const [selectedCar, setSelectedCar] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [all_data, setAll_data] = useState({});
  const [auction_detail_data, setAuctionDetailData] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const [car_item, setCarItem] = useState([
    {
      name: 'exterior',
      number: 1,
    },
    {
      name: 'interior',
      number: 2,
    },
    {
      name: 'others',
      number: 3,
    },
    {
      name: 'damage',
      number: 4,
    },
  ]);
  const [nameLayout, setNameLayout] = useState('name');
  const [name, setName] = useState('');
  const [car_item_length, setCarItemLength] = useState(0);
  const [bidData, setBidData] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // const [types,setType] = useState("")

  const navigation = useNavigation();
  const {auction_id, type, closure_amount} = route.params;

  // console.log("id = >",auction_id);
  const flatListRef = useRef(null);

  const scrollToIndex = index => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({index, animated: true});
    }
  };

  const oneClickBuy = async auction_id => {
    let id = await AsyncStorage.getItem('user_id');
    // console.log("id =>",id," auction id =>",auction_id)
    if (id != null) {
      try {
        let response = await axios.post(
          'https://crm.unificars.com/api/ocbwinner',
          {dealer_id: id, auction_id: auction_id},
        );
        if (response.data.code == 200) {
          Alert.alert(
            'Succesfully !',
            'Congratulations Now you owned this car ...!',
            [
              {
                text: 'OK',
                onPress: () => {
                  fetchData();
                },
              },
            ],
          );
        }
      } catch (e) {
        console.log('error =>', e);
      } finally {
      }
    }
  };

  const handleSwipe = () => {
    // Handle the swipe action here
    console.log('Swiped!');
  };
  const shareApp = async () => {
    try {
      // Define the content you want to share, including a URL or file path
      const shareOptions = {
        title: 'Share App',
        message: 'Check out this amazing app!',
        url: '',
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing the app:', error);
    }
  };

  useEffect(() => {
    setIsloading(true);
    navigation.setOptions({
      title: 'Details',
      headerTintColor: 'black',
    });
    fetchData();
  }, []);

  // useEffect(() => {
  //   fetchData();
  // }, [auction_detail_data])

  // const getData = async () => {

  //   await axios.post('https://crm.unificars.com/api/auctiondetail', {
  //     'auction_id': auction_id,
  //   })
  //     .then(function (response) {
  //       // console.log("response",response.data);
  //       if (response.data.code == 200) {
  //         setAuctionDetailData(response.data.data)

  //       }
  //       else {
  //         console.log(response.data.status);
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   // setIsloading(false);
  // }
  const fetchData = async () => {
    // console.log("aa raha hai");
    setIsloading(true);
    if (auction_id) {
      await axios
        .post('https://crm.unificars.com/api/cardetail', {
          auction_id: auction_id,
        })
        .then(function (response) {
          if (response.data.code == 200) {
            // console.log("aa raha hai ",response.data.data);
            setAll_data(response.data.data);
            setAuctionDetailData(response.data.data.auctiondetail);
            setName(
              response.data.data.lead.model +
                ' ' +
                response.data.data.lead.brand,
            );
            setBidData({
              auction_id: response.data.data.auctiondetail.id,
              current_price: response.data.data.auctiondetail.highest_bid,
              step_price: response.data.data.auctiondetail.step_price,
            });
            // setIsloading(false);
          } else {
            console.log(response.data.status);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      setInterval(() => setIsloading(false), 1000);
      // setIsloading(false);
      makeCarItemArray();
    }
  };

  makeCarItemArray = () => {
    const updatedArray = car_item.map(item => ({
      ...item,
      images: all_data[item.name], // Set the value for the new key here
    }));

    updatedArray.forEach(item => {
      if (item.images !== undefined) {
        setCarItemLength(prevCarItemLength => prevCarItemLength + 1);
      }
    });

    // console.log("length =>",car_item_length);

    setCarItem(updatedArray);
  };
  // console.log(car_item)

  useEffect(() => {
    prefixSum();
  }, [heightArray]);

  const reciveValueFromChild = value => {
    // console.log('inside recive function =>',value);
    setVal(value);
    // setHeightVal(height);
  };
  const reciveHeightValue = value => {
    setHeightArray(value);
  };
  prefixSum = () => {
    let length = heightArray.length;
    prefixSumArray[0] = heightArray[0];
    for (let i = 1; i < length; i++) {
      prefixSumArray[i] = heightArray[i] + prefixSumArray[i - 1];
    }
    setPrefixSumArray(prefixSumArray);
  };
  const updateHeaderTitle = val => {
    if (val > nameLayout) {
      navigation.setOptions({
        title: name,
        headerTintColor: 'black',
      });
    } else {
      navigation.setOptions({
        title: 'Details',
        headerTintColor: 'black',
      });
    }
  };

  // console.log("car_item => ", car_item);
  const scrollViewRef = useRef();
  const horizontalScrollviewRef = useRef();
  const scrollToHorizontalComponent = n => {
    const xOffset = n === 0 ? 0 : n * 80;
    horizontalScrollviewRef.current.scrollTo({
      x: xOffset,
      y: 0,
      animated: true,
    });
    // console.log(horizontalScrollviewRef.current);
  };
  const scrollToComponent = componentNumber => {
    // console.log('index',heightArray);
    // setIndex(componentNumber);
    const yOffset =
      componentNumber === 0
        ? val - 10
        : prefixSumArray[componentNumber - 1] + (val - 45);
    scrollViewRef.current.scrollTo({x: 0, y: yOffset, animated: true});
  };

  const getIndex = offset => {
    // console.log("offset  => ",offset);
    let n = 45.1;
    if (offset <= val - n + prefixSumArray[0]) setIndex(0);
    else if (
      offset > val - n + prefixSumArray[0] &&
      offset <= val - n + prefixSumArray[1]
    )
      setIndex(1);
    else if (
      offset > val - n + prefixSumArray[1] &&
      offset <= val - n + prefixSumArray[2]
    )
      setIndex(2);
    else if (
      offset > val - n + prefixSumArray[2] &&
      offset <= val - n + prefixSumArray[3]
    )
      setIndex(3);
    else if (
      offset > val - n + prefixSumArray[3] &&
      offset <= val - n + prefixSumArray[4]
    )
      setIndex(4);
    else if (
      offset > val - n + prefixSumArray[4] &&
      offset <= val - n + prefixSumArray[5]
    )
      setIndex(5);
  };
  const updateFetchData = async () => {
    if (auction_id) {
      await axios
        .post('https://crm.unificars.com/api/cardetail', {
          auction_id: auction_id,
        })
        .then(function (response) {
          if (response.data.code == 200) {
            // console.log("aa raha hai ",response.data.data);
            setAll_data(response.data.data);
            setAuctionDetailData(response.data.data.auctiondetail);
            setName(
              response.data.data.lead.model +
                ' ' +
                response.data.data.lead.brand,
            );
          } else {
            // console.log(response.data.status);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const handleScroll = useCallback(
    event => {
      const index = Math.round(event.nativeEvent.contentOffset.x / width);
      setToggle(false);
      scrollToIndex(index);
      setSelectedCar(index);
    },
    [width],
  );
  const toggleModal = (index) => {
    setSelectedImageIndex(index);
    setModalVisible(!isModalVisible);
  };


  const renderCarImage = useCallback(
    ({item,i}) => (
      <TouchableOpacity onPress={()=>toggleModal(i)}>
        <FastImage
          source={
            item.image
              ? {uri: item.image, priority: FastImage.priority.high}
              : null
          }
          style={{
            width: width - 20,
            height: Dimensions.get('window').height / 2.7,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableOpacity>
    ),
    [width],
  );

  const keyExtractor = useCallback((_, index) => index.toString(), []);

  // console.log("index =>",index)
  return (
    <View
      style={[
        globalStyles.mainContainer,
        globalStyles.flexBoxAlign,
        {flex: 1},
      ]}>
      {
        isLoading ? (
          <LoadingComponent />
        ) : (
          <>
            <ScrollView
              ref={horizontalScrollviewRef}
              horizontal={true}
              style={{
                height: val != 0 && val <= offset ? 60 : 0,
                width: '100%',
                backgroundColor: LIGHT_BLUE,
                overflow: 'hidden',
                position: 'absolute',
                top: 0,
                zIndex: 1,
                paddingLeft: 0,
              }}
              showsHorizontalScrollIndicator={false}>
              {all_data.detaiapi != undefined &&
                all_data.detaiapi.map((item, i) => (
                  <View
                    style={[{height: 60, padding: 5}, globalStyles.flexBox]}
                    onLayout={e =>
                      setWeightArray([
                        ...weightArray,
                        e.nativeEvent.layout.width,
                      ])
                    }
                    key={i}>
                    <TouchableOpacity
                      style={[
                        globalStyles.flexBoxJustify,
                        globalStyles.rowContainer,
                        {
                          padding: 10,
                          borderRadius: 15,
                          backgroundColor: index == i ? '#FFF' : 'transparent',
                        },
                      ]}
                      onPress={() => scrollToComponent(i)}>
                      <MaterialCommunityIcons
                        name={item.icon_name}
                        size={15}
                        style={{marginHorizontal: 5}}
                        color={BLUE_COLOR}
                      />
                      <Text style={{color: BLUE_COLOR, fontWeight: '700'}}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
            </ScrollView>
            <ScrollView
              ref={scrollViewRef}
              scrollEventThrottle={1}
              onScroll={e => {
                setOffset(e.nativeEvent.contentOffset.y),
                  getIndex(e.nativeEvent.contentOffset.y),
                  scrollToHorizontalComponent(index),
                  updateHeaderTitle(e.nativeEvent.contentOffset.y);
              }}
              style={[globalStyles.scrollViewContainer]}>
              <View style={{width: width - 20}}>
                <FlatList
                  pagingEnabled
                  horizontal
                  data={all_data.images}
                  onScroll={handleScroll}
                  renderItem={renderCarImage}
                  keyExtractor={keyExtractor}
                />
              </View>
              {isModalVisible && (
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={isModalVisible}>
                  <ImageViewer
                    imageUrls={all_data.images.map(img => ({url: img.image}))}
                    index={selectedImageIndex}
                    enableSwipeDown={true}
                    onCancel={() => toggleModal(null)}
                  />
                </Modal>
              )}
              {/* <View style={[{width: '100%', marginTop: 5}, {height: height / 9}]}>
          <FlatList
            ref={flatListRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedCar(index), setToggle(true);
                  }}>
                  <Image
                    source={item}
                    style={{
                      width: (width - 10) / 4.3,
                      height: Dimensions.get('window').height / 10,
                      margin: 2,
                      borderWidth: 3,
                      borderRadius: 8,
                      borderColor:
                        selectedCar == index ? BLUE_COLOR : '#8e8e8e',
                    }}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View> */}
              <View style={[globalStyles.wrapContainer, {marginTop: 15}]}>
                {car_item.map((item, i) =>
                  item.images != undefined ? (
                    <TouchableOpacity
                      style={[
                        globalStyles.flexBoxAlign,
                        {
                          height: 75,
                          width: 75,
                          marginHorizontal: 5,
                          borderColor: 'lightgrey',
                          borderWidth: 0.5,
                          borderRadius: 8,
                        },
                      ]}
                      key={i}
                      onPress={() =>
                        navigation.navigate('photo', {
                          screen: item.name,
                          id: auction_detail_data.lead_id,
                          length: car_item_length,
                          item: car_item,
                        })
                      }>
                      <View
                        style={[
                          globalStyles.flexBoxAlign,
                          {
                            width: '100%',
                            height: 53,
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                          },
                        ]}>
                        <FastImage
                          style={{
                            width: 75 - 1,
                            height: 53,
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                          }}
                          source={
                            item.images != undefined
                              ? {
                                  uri: item.images[0].image,
                                  priority: FastImage.priority.high,
                                }
                              : null
                          }
                        />
                      </View>
                      <Text
                        style={{
                          fontSize: VERY_SMALL_FONT_SIZE,
                          textAlignVertical: 'center',
                          width: '100%',
                          textAlign: 'center',
                          height: 22,
                          lineHeight: 22,
                          color: '#000',
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          position: 'absolute',
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          textAlign: 'center',
                          textAlignVertical: 'center',
                          fontSize: VERY_SMALL_FONT_SIZE,
                          borderColor: 'black',
                          borderWidth: 1,
                          right: -12,
                          top: -12,
                          lineHeight: 15,
                          color: '#000',
                        }}>
                        {item.images != undefined ? item.images.length : 2}
                      </Text>
                    </TouchableOpacity>
                  ) : null,
                )}
              </View>

              <View
                onLayout={e => setNameLayout(e.nativeEvent.layout.y)}
                style={[
                  {width: '100%', padding: 10},
                  globalStyles.rowContainer,
                ]}>
                <View style={{width: '60%'}}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: LARGE_FONT_SIZE,
                      width: '100%',
                      color: 'black',
                    }}>
                    {all_data.lead.model + ' '}
                    {all_data.lead.brand}
                  </Text>
                </View>
                <View style={[{width: '40%'}, globalStyles.flexBox]}>
                  <Text
                    style={{
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      color: '#3d3d3d',
                    }}>
                    {all_data.lead.unique_id}
                  </Text>
                  <TouchableOpacity
                    style={[
                      {
                        backgroundColor: 'lightgrey',
                        borderRadius: 10,
                        width: '60%',
                        marginVertical: 5,
                        padding: 5,
                      },
                      globalStyles.flexBox,
                    ]}
                    onPress={() => shareApp()}>
                    <MaterialCommunityIcons
                      //  style={{
                      //     textAlign: 'center',
                      //     textAlignVertical: 'center',
                      //     color: '#3d3d3d',
                      //   }}
                      name="share"
                      size={25}
                      color={'black'}
                    />
                    <Text
                      style={[{fontSize: MEDIUM_FONT_SIZE, fontWeight: '800'}]}>
                      Share
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={[
                  globalStyles.flexBoxJustify,
                  {width: '100%', paddingHorizontal: 10},
                ]}>
                <View
                  style={[
                    globalStyles.rowContainer,
                    {
                      backgroundColor: '#e37617',
                      padding: 5,
                      borderRadius: 10,
                      margin: 5,
                      width: 80,
                    },
                  ]}>
                  <Text
                    style={{
                      fontSize: VERY_SMALL_FONT_SIZE,
                      fontWeight: '600',
                      color: '#ffffff',
                    }}>
                    Engine {auction_detail_data.engine_rating}
                  </Text>
                  <FontAwesome
                    name="star"
                    color="#ffffff"
                    size={9}
                    style={{padding: 1, paddingHorizontal: 5}}
                  />
                </View>
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
                    {all_data.lead.engine_type}
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
                  <Text style={globalStyles.beltItemText}>
                    {all_data.lead.feature}
                  </Text>
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
                    {all_data.lead.km_driven}
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
                    size={16}
                    style={globalStyles.beltItemIcon}
                  />
                  <Text style={globalStyles.beltItemText}>
                    {all_data.lead.ownership}
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
                    size={13}
                    style={globalStyles.beltItemIcon}
                  />
                  <Text style={globalStyles.beltItemText}>
                    {all_data.lead.registration_in != null
                      ? all_data.lead.registration_in.substring(0, 4) + 'XXXX'
                      : ''}
                  </Text>
                </View>
              </View>
              {/* <View style={[globalStyles.flexBox, { width: '100%' }]}>
              <Text style={{ fontWeight: '700', fontSize: LARGE_FONT_SIZE, padding: 10 }}>
                200 points inspection checklist
              </Text>
            </View> */}
              <DetailsComponent
                getHeight={reciveHeightValue}
                sendValueToParent={reciveValueFromChild}
                data={all_data.detaiapi}
              />
            </ScrollView>
            {type == 'ocb' ? (
              <View
                style={{
                  backgroundColor: 'transparent',
                  width: width - 30,
                  position: 'absolute',
                  bottom: 30,
                }}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    oneClickBuy(auction_id);
                  }}
                  style={[globalStyles.flexBox, {borderRadius: 10}]}>
                  <View
                    style={[
                      {
                        width: '100%',
                        height: 40,
                        backgroundColor: BLUE_COLOR,
                        borderRadius: 10,
                        // borderBottomLeftRadius: CONTAINER_BORDER,
                        // borderTopRightRadius: CONTAINER_BORDER,
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
                      Click To Buy{' '}
                      {RP_S + parseInt(closure_amount).toLocaleString('en-IN')}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <BidBottemSheet
                callGetData={updateFetchData}
                toggleModal={() => toggleBidModal(null, null)}
                data={bidData}
                isProfile={true}
              />
            )}
          </>
        )
        // <></>
      }
    </View>
    // <></>
  );
}

const styles = StyleSheet.create({});
