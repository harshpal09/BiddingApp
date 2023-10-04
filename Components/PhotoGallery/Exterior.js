

import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, Dimensions } from 'react-native';
import { globalStyles } from '../../export';
import { useRoute } from '@react-navigation/native';
const data = [
  {
    "image": "https://crm.unificars.com/uploads/inpectedImages/8147file_2023_59_05_6232583896250605876.jpg",
    "title": "Bonnet Hood"
  },
  {
    "image": "https://crm.unificars.com/uploads/inpectedImages/7942file_2023_58_33_5470495511058220228.jpg",
    "title": "Front Bumper"
  },
  {
    "image": "https://crm.unificars.com/uploads/inpectedImages/1385file_2023_08_43_161192050864258845.jpg",
    "title": "Grill "
  },
  {
    "image": "https://crm.unificars.com/uploads/inpectedImages/9002file_2023_02_43_2752061000723673891.jpg",
    "title": "LHS A Pillar"
  },
  {
    "image": "https://crm.unificars.com/uploads/inpectedImages/3788file_2023_02_39_8458570949914730199.jpg",
    "title": "LHS B Pillar"
  },
  {
    "image": "https://crm.unificars.com/uploads/inpectedImages/1960file_2023_02_36_2733287888323697302.jpg",
    "title": "LHS C Pillar"
  },
  {
    "image": "https://crm.unificars.com/uploads/inpectedImages/1456file_2023_04_00_6989014025598792632.jpg",
    "title": "LHS Fender"
  },
  {
    "image": "https://crm.unificars.com/uploads/inpectedImages/5718file_2023_08_31_5655609790985249770.jpg",
    "title": "LHS Front Tyre"
  },
  {
    "image": "https://crm.unificars.com/uploads/inpectedImages/4294file_2023_07_32_1778511782975379827.jpg",
    "title": "LHS Headlight"
  },
  {
    "image": "https://crm.unificars.com/uploads/inpectedImages/9275file_2023_03_26_5925900655805119885.jpg",
    "title": "LHS Rear Door"
  },
  {
    "image": "https://crm.unificars.com/uploads/inpectedImages/6437file_2023_05_30_3097133338650646143.jpg",
    "title": "Lower Cross Member"
  },
  {
    "image": "https://crm.unificars.com/uploads/inpectedImages/1575file_2023_58_39_4694623475421339964.jpg",
    "title": "Rear Bumper"
  },
  {
    "image": "https://crm.unificars.com/uploads/inpectedImages/3875file_2023_00_38_5470716410233911445.jpg",
    "title": "RHS A Pillar"
  },
  {
    "image": "https://crm.unificars.com/uploads/inpectedImages/5615file_2023_00_30_7853779255454290496.jpg",
    "title": "RHS B Pillar"
  },
  {
    "image": "https://crm.unificars.com/uploads/inpectedImages/3043file_2023_00_34_5445545724221100396.jpg",
    "title": "RHS C Pillar"
  },
  {
    "image": "https://crm.unificars.com/uploads/inpectedImages/2859file_2023_59_23_7015606744861001905.jpg",
    "title": "RHS Fender"
  },
  {
    "image": "https://crm.unificars.com/uploads/inpectedImages/9188file_2023_59_52_6044894033511896740.jpg",
    "title": "RHS Front Door"
  },
  {
    "image": "https://crm.unificars.com/uploads/inpectedImages/1728file_2023_08_37_7107720039024521783.jpg",
    "title": "RHS Front Tyre"
  },
  {
    "image": "https://crm.unificars.com/uploads/inpectedImages/3613file_2023_07_37_3047601289618970641.jpg",
    "title": "RHS Headlight"
  },
  {
    "image": "https://crm.unificars.com/uploads/inpectedImages/2458file_2023_08_16_7284990234823551257.jpg",
    "title": "Spare Tyre"
  },
  {
    "image": "https://crm.unificars.com/uploads/inpectedImages/8246file_2023_05_52_7292906813168039067.jpg",
    "title": "Upper Cross Member"
  },
  {
    "image": "https://crm.unificars.com/uploads/inpectedImages/9934file_2023_07_02_6530888593784703664.jpg",
    "title": "Windsheild Rear"
  }
];



const numColumns = 1; // Number of columns in the grid

export default function Exterior() {


  const route = useRoute(); // Use useRoute here to access route parameters

  const { id ,item} = route.params;
  // console.log('id => ', item[0].images);

  // useEffect(() => {
  //   getData
  // }, [])
  


  const renderItem = ({ item }) => (
    <View style={globalStyles.galleryItemContainer}>
      {/* {console.log('item=> ',item)} */}
      <Image
        source={{ uri: item.image }}
        style={globalStyles.galleryItemImage}
        resizeMode="cover"
      />
      <Text style={globalStyles.galleryItemTitle}>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.galleryContainer}>
      <FlatList
        data={item[0].images}
        renderItem={renderItem}
        keyExtractor={(item) => item.image}
        // numColumns={numColumns}
        // columnWrapperStyle={styles.galleryColumnWrapper}
      />
    </SafeAreaView>
  );
}


