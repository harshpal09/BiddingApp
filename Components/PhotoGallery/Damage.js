

import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, Dimensions } from 'react-native';
import { globalStyles } from '../../export';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { useRoute } from '@react-navigation/native';


const numColumns = 1; // Number of columns in the grid

export default function Damage() {

  const route = useRoute(); // Use useRoute here to access route parameters

  const { id ,item} = route.params;
  const renderItem = ({ item }) => (
    <View style={globalStyles.galleryItemContainer}>
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
        data={item[1].images}
        renderItem={renderItem}
        keyExtractor={(item) => item.image}
        // numColumns={numColumns}
        // columnWrapperStyle={styles.galleryColumnWrapper}
      />
    </SafeAreaView>
  );
}


