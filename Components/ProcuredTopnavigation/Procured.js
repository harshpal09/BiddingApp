import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import axios from 'axios';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {globalStyles} from '../../export';
  import {LARGE_FONT_SIZE} from '../../Styles/global';

export default function Procured() {
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
          status: 3,
        },
      );
      if (response.data.code === 200) {
        // console.log("data =>",response.data.data)
        setData(response.data.data);
      } else {
        setData(response.data.data);
      }
    } catch (error) {
      console.error('Network request error:', error);
    } finally {
      setIsloading(false);
    }
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
            <Text
              style={{
                fontSize: LARGE_FONT_SIZE,
                color: '#000',
                fontWeight: '800',
              }}>
              Data Available
            </Text>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({})