import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, SafeAreaView, TextInput } from 'react-native';
import { globalStyles } from '../../export';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { BLUE_COLOR, EXTRA_LARGE_FONT_SIZE, LARGE_FONT_SIZE, CONTAINER_BORDER, PALATINO_BOLD_FONT, LIGHT_BLUE, TOP_TAB_TEXT_COLOR, RP_S, MEDIUM_FONT_SIZE, SMALL_FONT_SIZE } from '../../Styles/global';
import { KEYBOARD_DISMISS_THRESHOLD } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import { MyBottomSheet } from '../../export';

const BidBottemSheet = ({ toggleModal, data, callGetData,isProfile }) => {
  const [bid_price, setBidPrice] = useState(data.current_price);
  const [currentPrice, setCurrentPrice] = useState(data.current_price);
  const [error, setError] = useState({ 'message': '', 'color': '', 'code': '' });
  const placedBid = async () => {

    // if (bid_price > parseInt(data.current_price)) {

    let id = await AsyncStorage.getItem('user_id');
    let response = await axios.post('https://crm.unificars.com/api/setbid', {
      'dealer_id': id,
      'auction_id': data.auction_id,
      'auction_amount': bid_price,
    })
    if (response.data.code == 200) {
      setCurrentPrice(bid_price);
      callGetData();
      setError({ ...error, 'message': response.data.message, 'color': 'green', 'code': '200' });
    }
    else {
      setError({ ...error, 'message': response.data.message, 'color': 'red', 'code': response.data.code });
    }
    // }
  }
  console.log("bid price =>", error)
  return (
    <View style={[globalStyles.flexBoxAlign, { flex: 1, position: 'absolute', bottom: 0, width: '100%', backgroundColor: "#FFF", height: error.code == "" ? 200 : 230, borderRadius: 20 }]}>
      <View style={[globalStyles.rowContainer, { width: '100%', height: 40, backgroundColor: LIGHT_BLUE, borderTopRightRadius: 20, borderTopLeftRadius: 20 }]}>
        <View style={[{ width: '100%', borderTopRightRadius: 20, borderTopLeftRadius: 20, backgroundColor:"#3d3d3d", height: 40, paddingHorizontal: 10 }, globalStyles.flexBoxAlign, globalStyles.rowContainer]} activeOpacity={0.9} >
          <TouchableOpacity onPress={toggleModal}>
            { !isProfile && <MaterialCommunityIcons size={30} name='chevron-down' color={'#FFF'} />}
          </TouchableOpacity>
          <View style={[globalStyles.rowContainer, { justifyContent: 'space-around', width: '90%', paddingHorizontal: 10, alignItems: 'center' }]}>
            <Text style={[globalStyles.text, { fontSize: EXTRA_LARGE_FONT_SIZE }]} ><Text style={{ fontWeight: '500' }}>Current price:</Text> {RP_S + parseInt(currentPrice).toLocaleString('en-IN')}</Text>
          </View>
        </View>
      </View>
      <View style={[{ width: '100%', height: error.code == "" ? 0 : 30, backgroundColor: error.color, overflow: 'hidden', paddingHorizontal: 10 }, globalStyles.flexBox]}>
        <Text style={[{ color: 'white', fontWeight: '800', fontSize: MEDIUM_FONT_SIZE }]}>**{error.message}</Text>
      </View>
      <View style={[{ width: '100%', padding: 10, justifyContent: 'space-around' }, globalStyles.flexBoxAlign, globalStyles.rowContainer]}  >
        <View style={[globalStyles.rowContainer, globalStyles.flexBox, { width: '20%', height: 40, padding: 2 }]}>
          <TouchableOpacity style={[{ width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', marginHorizontal: 2, backgroundColor: BLUE_COLOR, borderRadius: 8 }]} onPress={() => data.current_price < bid_price ? setBidPrice(bid_price - parseInt(data.step_price)) : ""}><Text style={[{fontSize: 20, color: '#fff' }]}>-</Text></TouchableOpacity>
        </View>
        <TextInput keyboardType='numeric' style={[{ height: 40, width: '70%', backgroundColor: '#FFF', borderRadius: 5, paddingLeft: 15, borderWidth: 1, borderColor: '#3d3d3d', fontWeight: '700', fontSize: LARGE_FONT_SIZE }]} textAlignVertical='center' textAlign='center' value={RP_S + parseInt(bid_price).toLocaleString('en-IN')} editable={false} />
        <View style={[globalStyles.rowContainer, globalStyles.flexBox, { width: '20%', height: 40, padding: 2 }]}>
          <TouchableOpacity style={[{ width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', marginHorizontal: 2, backgroundColor: BLUE_COLOR, borderRadius: 8 }]} onPress={() => setBidPrice(parseInt(data.step_price) + bid_price)}><Text style={[{ fontSize: 20, color: '#fff' }]}>+</Text></TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={[globalStyles.button, { width: '90%' }]} onPress={() => { placedBid() }}>
        <Text style={globalStyles.buttonText}>Placed Bid</Text>
      </TouchableOpacity>

    </View>
  );
};

export default BidBottemSheet;