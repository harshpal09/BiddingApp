import { SafeAreaView, TextInput, StyleSheet, View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyles, CustomHeader } from '../../export';
import { LARGE_FONT_SIZE, MEDIUM_FONT_SIZE, height, width } from '../../Styles/global';
import AntDesign from 'react-native-vector-icons/AntDesign'
import axios from 'axios';
import { Text } from 'react-native-paper';

export default function SearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');
  const [toggle, setToggle] = useState(undefined);
  const [data, setData] = useState([]);
  const [popular_searches, setPopularSearches] = useState([
    'Maruti Suzuki',
    'Hyundai',
    'Tata',
    'Mahindra',
    'Honda',
    'Toyota',
  ]);

  const Search = async (text) => {
    setSearchText(text)
    try {
      setToggle(true);
      const response = await axios.post('https://crm.unificars.com/api/searchauction', {
        keyword: text,
      });
      if (response.data.code === 200) {
        setError(null);
        setToggle(false);
        // setData([])
        setData(response.data.data.auction);

      } else {
        // console.log("->", response.data.status);
        setError(response.data.status);
      }
    } catch (error) {
      console.error("Network request error:", error);
      setError("Network request failed");
    } finally {
      setToggle(false);
    }
  }

  return (
    <SafeAreaView style={[globalStyles.mainContainer]}>
      <View style={[{ width: width, backgroundColor: 'transparent', paddingVertical: 10, overflow: 'hidden' }, globalStyles.flexBox]}>
        <AntDesign name='arrowleft' style={{ position: 'absolute', left: 15, textAlignVertical: 'center', zIndex: 1 }} size={25} onPress={() => navigation.goBack()} />
        <TextInput
          style={styles.textInput}
          placeholder="Search"
          defaultValue={searchText}
          onChangeText={(text) => Search(text)}
        />
      </View>
      {toggle == undefined ?
        <View style={{ width: width, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: LARGE_FONT_SIZE, fontWeight: '600', width: '80%', backgroundColor: 'transparent', paddingVertical: 10 }}>POPULAR SEARCHES</Text>
          {popular_searches.map((item, ind) => (
            <TouchableOpacity key={ind} onPress={() => Search(item)}><Text style={{ fontSize: MEDIUM_FONT_SIZE, fontWeight: '500', width: '80%', backgroundColor: 'transparent', padding: 10 }}>{item}</Text></TouchableOpacity>
          ))}
        </View> :
        <></>
      }
      {toggle ? <ActivityIndicator size={'large'} color={'black'} /> :
        <ScrollView style={[{ width: width, paddingHorizontal: 25, height: height - 100, backgroundColor: 'transparent', marginTop: 10 }]}>
          {data.map((item, index) => (
            <TouchableOpacity key={index} style={[{ backgroundColor: 'transparent', padding: 10, borderColor: 'grey', borderBottomWidth: 0.5 }, globalStyles.flexBoxJustify]} onPress={() => navigation.navigate('car_profile', { auction_id: item.id })} >
              <Text>{item.lead.brand}</Text>
            </TouchableOpacity>
          ))
          }
        </ScrollView>

      }
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight: 10,
  },
  textInput: {
    height: 40,
    width: '95%',
    // padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 10,
    paddingLeft: 40
  },
});