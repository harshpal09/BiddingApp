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
} from 'react-native';
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import globalStyles, { BLUE_COLOR, LARGE_FONT_SIZE, LIGHT_BLUE, MEDIUM_FONT_SIZE, RP_S, SMALL_FONT_SIZE, VERY_SMALL_FONT_SIZE } from '../../Styles/global';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { DetailsComponent, RenderIf ,} from '../../export';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
// import Image from 'react-native-image-lazy-loading';
import BidBottemSheet from './BidBottomSheet';


// const item = {
//   car_details: {
//     engine: 'Diesel',
//     feature: 'Manual',
//     run: '1,32 Km',
//     owner: '1st Owner',
//     registration: 'DL3C',
//   },
// };
// const car_item = [
//   {
//     name: 'Exterior',
//     image: require('../../Assets/Images/car_1.jpeg'),
//     number: 1,
//   },
//   {
//     name: 'Interior',
//     image: require('../../Assets/Images/interior.jpeg'),
//     number: 2,
//   },
//   {
//     name: 'Others',
//     image: require('../../Assets/Images/car_7.jpeg'),
//     number: 3,
//   },
//   {
//     name: 'Damage',
//     image: require('../../Assets/Images/car_5.webp'),
//     number: 4,
//   }
// ]
// const details = [
//   {
//     name: 'DOCUMENTS',
//     icon_name: 'file-outline',
//     car_details: [
//       {
//         key: 'RC Availability',
//         value: 'Available',
//       },
//       {
//         key: 'Insurance type',
//         value: 'Comprehensive till 07 Dec 2023',
//       },
//       {
//         key: 'No claim bonus',
//         value: 'Yes',
//       },
//       {
//         key: 'Hypothecation',
//         value: 'yes',
//       },
//       {
//         key: 'Hypothrcation',
//         Value: 'HDFC BANK LTD',
//       },
//       {
//         key: 'RC Availability',
//         value: 'Available',
//       },
//       {
//         key: 'Insurance type',
//         value: 'Comprehensive till 07 Dec 2023',
//       },
//       {
//         key: 'No claim bonus',
//         value: 'Yes',
//       },
//     ],
//     other_information: [
//       {
//         key: 'Duplicate Key',
//         value: 'No',
//       },
//       {
//         key: 'Chasis No.',
//         value: 'Yes',
//       },
//       {
//         key: 'Party Peshi Required',
//         value: 'No',
//       },
//       {
//         key: 'Engine No.',
//         value: 'yes',
//       },
//     ],
//     registration_and_fitness: [
//       {
//         key: 'Manufacturing date',
//         value: 'October 2020',
//       },
//       {
//         key: 'Registration date',
//         value: 'January 2021',
//       },
//       {
//         key: 'RTO',
//         value: 'DL3C East Delhi',
//       },
//     ],
//   },
//   {
//     name: 'EXTERIOR',
//     icon_name: 'car-lifted-pickup',
//     car_details: [
//       {
//         key: 'RC Availability',
//         value: 'Available',
//       },
//       {
//         key: 'Insurance type',
//         value: 'Uninsured',
//       },
//       {
//         key: 'No claim bonus',
//         value: 'Yes',
//       },
//       {
//         key: 'Hypothecation',
//         value: 'yes',
//       },
//     ],
//     other_information: [
//       {
//         key: 'Duplicate Key',
//         value: 'No',
//       },
//       {
//         key: 'Chasis No.',
//         value: 'Yes',
//       },
//       {
//         key: 'Party Peshi Required',
//         value: 'No',
//       },
//       {
//         key: 'Engine No.',
//         value: 'yes',
//       },
//     ],
//     registration_and_fitness: [
//       {
//         key: 'Manufacturing date',
//         value: 'October 2020',
//       },
//       {
//         key: 'Registration date',
//         value: 'January 2021',
//       },
//       {
//         key: 'RTO',
//         value: 'DL3C East Delhi',
//       },
//     ],
//   },
//   {
//     name: 'ENGINE',
//     icon_name: 'engine',
//     car_details: [
//       {
//         key: 'RC Availability',
//         value: 'Available',
//       },
//       {
//         key: 'Insurance type',
//         value: 'Uninsured',
//       },
//       {
//         key: 'No claim bonus',
//         value: 'Yes',
//       },
//       {
//         key: 'Hypothecation',
//         value: 'yes',
//       },
//       {
//         key: 'Hypothrcation',
//         Value: 'HDFC BANK LTD',
//       },
//       {
//         key: 'RC Availability',
//         value: 'Available',
//       },
//       {
//         key: 'Insurance type',
//         value: 'Comprehensive till 07 Dec 2023',
//       },
//     ],
//     other_information: [
//       {
//         key: 'Duplicate Key',
//         value: 'No',
//       },
//       {
//         key: 'Chasis No.',
//         value: 'Yes',
//       },
//       {
//         key: 'Party Peshi Required',
//         value: 'No',
//       },
//       {
//         key: 'Engine No.',
//         value: 'yes',
//       },
//     ],
//     registration_and_fitness: [
//       {
//         key: 'Manufacturing date',
//         value: 'October 2020',
//       },
//       {
//         key: 'Registration date',
//         value: 'January 2021',
//       },
//       {
//         key: 'RTO',
//         value: 'DL3C East Delhi',
//       },
//     ],
//   },
//   {
//     name: 'AC',
//     icon_name: 'air-conditioner',
//     car_details: [
//       {
//         key: 'RC Availability',
//         value: 'Available',
//       },
//       {
//         key: 'Insurance type',
//         value: 'Comprehensive till 07 Dec 2023',
//       },

//     ],
//     other_information: [
//       {
//         key: 'Duplicate Key',
//         value: 'No',
//       },
//       {
//         key: 'Chasis No.',
//         value: 'Yes',
//       },
//       {
//         key: 'Party Peshi Required',
//         value: 'No',
//       },
//       {
//         key: 'Engine No.',
//         value: 'yes',
//       },
//     ],
//     registration_and_fitness: [
//       {
//         key: 'Manufacturing date',
//         value: 'October 2020',
//       },
//       {
//         key: 'Registration date',
//         value: 'January 2021',
//       },
//       {
//         key: 'RTO',
//         value: 'DL3C East Delhi',
//       },
//     ],
//   },
//   {
//     name: 'ELECTRICALS',
//     icon_name: 'power-plug',
//     car_details: [
//       {
//         key: 'RC Availability',
//         value: 'Available',
//       },
//       {
//         key: 'Insurance type',
//         value: 'Comprehensive till 07 Dec 2023',
//       },
//       {
//         key: 'No claim bonus',
//         value: 'Yes',
//       },
//       {
//         key: 'Hypothecation',
//         value: 'yes',
//       },
//       {
//         key: 'Hypothrcation',
//         Value: 'HDFC BANK LTD',
//       },
//       {
//         key: 'RC Availability',
//         value: 'Available',
//       },
//       {
//         key: 'Insurance type',
//         value: 'Uninsured',
//       },
//       {
//         key: 'No claim bonus',
//         value: 'Yes',
//       },
//       {
//         key: 'Hypothecation',
//         value: 'yes',
//       },
//       {
//         key: 'Hypothrcation',
//         Value: 'HDFC BANK LTD',
//       },
//     ],
//     other_information: [
//       {
//         key: 'Duplicate Key',
//         value: 'No',
//       },
//       {
//         key: 'Chasis No.',
//         value: 'Yes',
//       },
//       {
//         key: 'Party Peshi Required',
//         value: 'No',
//       },
//       {
//         key: 'Engine No.',
//         value: 'yes',
//       },
//       {
//         key: 'RC Availability',
//         value: 'Available',
//       },
//       {
//         key: 'Insurance type',
//         value: 'Comprehensive till 07 Dec 2023',
//       },
//       {
//         key: 'No claim bonus',
//         value: 'Yes',
//       },
//       {
//         key: 'Hypothecation',
//         value: 'yes',
//       },
//       {
//         key: 'Hypothrcation',
//         Value: 'HDFC BANK LTD',
//       },
//     ],
//     registration_and_fitness: [
//       {
//         key: 'Manufacturing date',
//         value: 'October 2020',
//       },
//       {
//         key: 'Registration date',
//         value: 'January 2021',
//       },
//       {
//         key: 'RTO',
//         value: 'DL3C East Delhi',
//       },
//     ],
//   },
//   {
//     name: 'STEERING',
//     icon_name: 'steering',
//     car_details: [
//       {
//         key: 'RC Availability',
//         value: 'Available',
//       },
//       {
//         key: 'Insurance type',
//         value: 'Uninsured',
//       },
//       {
//         key: 'No claim bonus',
//         value: 'Yes',
//       },
//       {
//         key: 'Hypothecation',
//         value: 'yes',
//       },
//       {
//         key: 'Hypothrcation',
//         Value: 'HDFC BANK LTD',
//       },
//       {
//         key: 'RC Availability',
//         value: 'Available',
//       },
//       {
//         key: 'Insurance type',
//         value: 'Comprehensive till 07 Dec 2023',
//       },
//       {
//         key: 'No claim bonus',
//         value: 'Yes',
//       },
//       {
//         key: 'Hypothecation',
//         value: 'yes',
//       },
//       {
//         key: 'Hypothrcation',
//         Value: 'HDFC BANK LTD',
//       },
//     ],
//     other_information: [
//       {
//         key: 'Duplicate Key',
//         value: 'No',
//       },
//       {
//         key: 'Chasis No.',
//         value: 'Yes',
//       },
//       {
//         key: 'Party Peshi Required',
//         value: 'No',
//       },
//       {
//         key: 'Engine No.',
//         value: 'yes',
//       },
//     ],
//     registration_and_fitness: [
//       {
//         key: 'Manufacturing date',
//         value: 'October 2020',
//       },
//       {
//         key: 'Registration date',
//         value: 'January 2021',
//       },
//       {
//         key: 'RTO',
//         value: 'DL3C East Delhi',
//       },
//     ],
//   },
// ];

const { width, height } = Dimensions.get('window');

export default function CarProfile({ route }) {
  // const [data, setData] = useState([
  //   require('../../Assets/Images/car_1.jpeg'),
  //   require('../../Assets/Images/car_2.webp'),
  //   require('../../Assets/Images/car_3.webp'),
  //   require('../../Assets/Images/car_4.jpeg'),
  //   require('../../Assets/Images/car_5.jpeg'),
  //   require('../../Assets/Images/car_6.jpeg'),
  //   require('../../Assets/Images//car_7.jpeg'),
  // ]);
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
  const [isLoading, setIsloading] = useState(true)
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
    }
  ])
  const [nameLayout, setNameLayout] = useState('name')
  const [name, setName] = useState('')
  const [car_item_length, setCarItemLength] = useState(0);
  const [bidData, setBidData] = useState({})



  const navigation = useNavigation();
  const { auction_id } = route.params;

  const flatListRef = useRef(null);

  const scrollToIndex = index => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
  };

  const handleSwipe = () => {
    // Handle the swipe action here
    console.log('Swiped!');
  };


  useEffect(() => {
    navigation.setOptions({
      title: "Details",
      headerTintColor: 'black',
    });
    getData();
  }, [auction_id])

  useEffect(() => {

    fetchData();
  }, [auction_detail_data])



  const getData = async () => {

    await axios.post('https://crm.unificars.com/api/auctiondetail', {
      'auction_id': auction_id,
    })
      .then(function (response) {
        // console.log("response",response.data);
        if (response.data.code == 200) {
          setAuctionDetailData(response.data.data)

        }
        else {
          console.log(response.data.status);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // setIsloading(false);
  }
  const fetchData = async () => {
    // console.log(auction_detail_data.lead_id);
    setBidData({'auction_id':auction_detail_data.id,'current_price':auction_detail_data.highest_bid,'step_price':auction_detail_data.step_price});
    if (auction_detail_data.lead_id) {
      setIsloading(true);
      await axios.post('https://crm.unificars.com/api/cardetail', {
        lead_id: auction_detail_data.lead_id,
      })
        .then(function (response) {
          if (response.data.code == 200) {
            setAll_data(response.data.data);
            setName(response.data.data.lead.model + " " + response.data.data.lead.brand)
            setIsloading(false);
          }
          else {
            console.log(response.data.status);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      makeCarItemArray();
    }
  }

  makeCarItemArray = () => {
    const updatedArray = car_item.map((item) => ({
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

  }
  // console.log(car_item)

  useEffect(() => {
    prefixSum();
  }, [heightArray])

  const reciveValueFromChild = (value) => {
    // console.log('inside recive function =>',value);
    setVal(value);
    // setHeightVal(height);
  }
  const reciveHeightValue = (value) => {
    setHeightArray(value);
  }
  prefixSum = () => {
    let length = heightArray.length;
    prefixSumArray[0] = heightArray[0];
    for (let i = 1; i < length; i++) {
      prefixSumArray[i] = heightArray[i] + prefixSumArray[i - 1];
    }
    setPrefixSumArray(prefixSumArray);
  }
  const updateHeaderTitle = (val) => {
    if (val > nameLayout) {
      navigation.setOptions({
        title: name,
        headerTintColor: 'black',
      });
    }
    else {
      navigation.setOptions({
        title: "Details",
        headerTintColor: 'black',
      });
    }

  };

  // console.log("car_item => ", car_item);
  const scrollViewRef = useRef();
  const horizontalScrollviewRef = useRef();
  const scrollToHorizontalComponent = (n) => {
    const xOffset = n === 0 ? 0 : n * 80;
    horizontalScrollviewRef.current.scrollTo({ x: xOffset, y: 0, animated: true });
    // console.log(horizontalScrollviewRef.current);

  }
  const scrollToComponent = (componentNumber) => {
    // console.log('index',heightArray);
    // setIndex(componentNumber);
    const yOffset = componentNumber === 0 ? val - 10 : (prefixSumArray[componentNumber - 1] + (val - 45));
    scrollViewRef.current.scrollTo({ x: 0, y: yOffset, animated: true });
  };

  const getIndex = (offset) => {
    // console.log("offset  => ",offset);
    let n = 45.1;
    if (offset <= (val - n) + prefixSumArray[0])
      setIndex(0);
    else if (offset > (val - n) + prefixSumArray[0] && offset <= (val - n) + prefixSumArray[1])
      setIndex(1)
    else if (offset > (val - n) + prefixSumArray[1] && offset <= (val - n) + prefixSumArray[2])
      setIndex(2);
    else if (offset > (val - n) + prefixSumArray[2] && offset <= (val - n) + prefixSumArray[3])
      setIndex(3);
    else if (offset > (val - n) + prefixSumArray[3] && offset <= (val - n) + prefixSumArray[4])
      setIndex(4)
    else if (offset > (val - n) + prefixSumArray[4] && offset <= (val - n) + prefixSumArray[5])
      setIndex(5);
  }


  // console.log("index =>",index)
  return (
    <View
      style={[
        globalStyles.mainContainer,
        globalStyles.flexBoxAlign,
        { flex: 1 },
      ]}>
      {isLoading ? <ActivityIndicator size={'large'} /> :
        <>
          <ScrollView ref={horizontalScrollviewRef} horizontal={true} style={{ height: val != 0 && val <= offset ? 60 : 0, width: '100%', backgroundColor: LIGHT_BLUE, overflow: 'hidden', position: 'absolute', top: 0, zIndex: 1, paddingLeft: 0 }} showsHorizontalScrollIndicator={false}>
            {all_data.detaiapi.map((item, i) => (
              <View style={[{ height: 60, padding: 5 }, globalStyles.flexBox]} onLayout={(e) => setWeightArray([...weightArray, e.nativeEvent.layout.width])} key={i}>
                <TouchableOpacity style={[globalStyles.flexBoxJustify, globalStyles.rowContainer, { padding: 10, bordercolor: 'lightgrey', borderWidth: index == i ? .2 : 0, borderRadius: 15, backgroundColor: index == i ? '#FFF' : 'transparent' }]} onPress={() => scrollToComponent(i)}>
                  <MaterialCommunityIcons name={item.icon_name} size={15} style={{ marginHorizontal: 5 }} color={BLUE_COLOR} />
                  <Text style={{ color: BLUE_COLOR, fontWeight: '700' }}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <ScrollView ref={scrollViewRef} scrollEventThrottle={1} onScroll={(e) => { setOffset(e.nativeEvent.contentOffset.y), getIndex(e.nativeEvent.contentOffset.y), scrollToHorizontalComponent(index), updateHeaderTitle(e.nativeEvent.contentOffset.y) }} style={[globalStyles.scrollViewContainer]} >
            <View style={{ width: width - 20 }}>
              <FlatList
                pagingEnabled
                horizontal={true}
                data={all_data.images}
                onScroll={e => {
                  setToggle(false);
                  scrollToIndex((e.nativeEvent.contentOffset.x / width).toFixed(0));
                  setSelectedCar(
                    (e.nativeEvent.contentOffset.x / width).toFixed(0),
                  );
                }}
                // showsHorizontalScrollIndicator={true}
                renderItem={({ item, index }) => {
                  return (
                    <View>
                      {/* {console.log("image => ",item)} */}
                      <Image
                        source={item.image != "" ? { uri: item.image }:null}
                        style={{
                          width: width - 20,
                          height: Dimensions.get('window').height / 2.7,
                        }}
                      />
                    </View>
                  );
                }}
              />
            </View>
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
            <View style={[globalStyles.wrapContainer, { marginTop: 15 }]}>
              {car_item.map((item, i) => (
                item.images != undefined ?
                  <TouchableOpacity style={[globalStyles.flexBoxAlign, { height: 75, width: 75, marginHorizontal: 5, borderColor: 'lightgrey', borderWidth: 0.5, borderRadius: 8 }]} key={i} onPress={() => navigation.navigate('photo', { screen: item.name, id: auction_detail_data.lead_id, length: car_item_length, item: car_item })}>
                    {/* {console.log("length => ",car_item.length)} */}
                    <View style={[globalStyles.flexBoxAlign, { width: '100%', height: 53, borderTopLeftRadius: 8, borderTopRightRadius: 8 }]}>
                      <Image style={{ width: 75 - 1, height: 53, borderTopLeftRadius: 8, borderTopRightRadius: 8 }} source={item.images != undefined ?{ uri:  item.images[0].image }: null } />
                    </View>
                    <Text style={{ fontSize: VERY_SMALL_FONT_SIZE, textAlignVertical: 'center', width: '100%', textAlign: 'center', height: 22, lineHeight: 22 }}>{item.name}</Text>
                    <Text style={{ position: 'absolute', width: 20, height: 20, borderRadius: 10, textAlign: 'center', textAlignVertical: 'center', fontSize: VERY_SMALL_FONT_SIZE, borderColor: 'black', borderWidth: 1, right: -12, top: -12, lineHeight: 15 }}>{item.images != undefined ? item.images.length : 2}</Text>
                  </TouchableOpacity> : null
              ))}
            </View>

            <View onLayout={(e) => setNameLayout(e.nativeEvent.layout.y)} style={[{ width: '100%', padding: 10 }, globalStyles.rowContainer]}>
              <View style={{ width: '60%' }}>
                <Text style={{ fontWeight: '700', fontSize: LARGE_FONT_SIZE, width: '100%' }}>
                  {/* 2015 AUDI Q3 TDI QUATTRO */}
                  {all_data.lead.model + " "}{all_data.lead.brand}
                </Text>
              </View>
              <View style={{ width: '40%' }}>
                <Text
                  style={{
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: '#3d3d3d',
                  }}>
                  Auction ID: {auction_detail_data.auction_id}
                </Text>
              </View>
            </View>
            <View
              style={[
                globalStyles.flexBoxJustify,
                { width: '100%', paddingHorizontal: 10 },
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
                <Text style={{ fontSize: VERY_SMALL_FONT_SIZE, fontWeight: '600', color: '#ffffff' }}>
                  Engine {auction_detail_data.engine_rating}
                </Text>
                <FontAwesome
                  name="star"
                  color="#ffffff"
                  size={9}
                  style={{ padding: 1, paddingHorizontal: 5 }}
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
                  {/* {console.log(all_data.lead)} */}
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
                  {all_data.lead.registration_in.substring(0,4)+"XXXX"}
                </Text>
              </View>
            </View>
            {/* <View style={[globalStyles.flexBox, { width: '100%' }]}>
              <Text style={{ fontWeight: '700', fontSize: LARGE_FONT_SIZE, padding: 10 }}>
                200 points inspection checklist
              </Text>
            </View> */}
            <DetailsComponent getHeight={reciveHeightValue} sendValueToParent={reciveValueFromChild} data={all_data.detaiapi} />
          </ScrollView>
          {/* <View style={[{ width: '100%', backgroundColor: 'white', borderWidth: 1, borderColor: 'lightgrey', borderTopLeftRadius: 15, borderTopRightRadius: 15, height: 120, paddingHorizontal: 10 },globalStyles.shadow]}>
            <View style={[globalStyles.rowContainer, { justifyContent: 'space-around', height: '30%' }]}>
              <View style={{ padding: 13 }}>
                <Text style={[{ fontSize: MEDIUM_FONT_SIZE, color: 'grey', fontWeight: '700' }]}>Fair market Value</Text>
                <Text style={[{ fontSize: MEDIUM_FONT_SIZE, color: 'grey', fontWeight: '700' }]}>Rs. 3,30,000</Text>
              </View>
              <View style={[{ height:'100%',justifyContent:'space-around',width:'60%',alignItems:'center'},globalStyles.rowContainer]}>
                <Text style={[{ fontSize: LARGE_FONT_SIZE, color: 'black', fontWeight: '700' }]}>Current Bid {RP_S+parseInt(auction_detail_data.highest_bid).toLocaleString('en-IN')}</Text>
              </View>
            </View>
            <View style={[globalStyles.rowContainer, { justifyContent: 'space-around', alignItems: 'center', height: '50%', width: '100%', paddingHorizontal: 10 }]}>
              <TouchableOpacity
                style={[
                  {
                    width: '49%',
                    height: 40,
                    backgroundColor: LIGHT_BLUE,
                    borderColor: BLUE_COLOR,
                    borderWidth: 1,
                    borderRadius: 10,
                    justifyContent: 'center', // Center vertically
                    alignItems: 'center',     // Center horizontally
                  }
                ]}
              >
                <Text style={[{ fontSize: MEDIUM_FONT_SIZE, fontWeight: '700', color: BLUE_COLOR }]}>AUTO BID</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  {
                    width: '98%',
                    height: 40,
                    backgroundColor: BLUE_COLOR,
                    borderColor: BLUE_COLOR,
                    borderWidth: 1,
                    borderRadius: 10,
                    justifyContent: 'center', // Center vertically
                    alignItems: 'center',     // Center horizontally
                  }
                ]}
              >
                <Text style={[{ fontSize: MEDIUM_FONT_SIZE, fontWeight: '700', color: 'white' }]}>Placed a bid</Text>
                <Text style={[{ fontSize: SMALL_FONT_SIZE, fontWeight: '700', color: 'white' }]}>Step up Rs. 2000</Text>
              </TouchableOpacity>
            </View>
          </View> */}
        <BidBottemSheet callGetData={getData} toggleModal={()=>toggleBidModal(null,null)} data={bidData} isProfile={true} />

        </>
      }


    </View>
  );
}

const styles = StyleSheet.create({});
