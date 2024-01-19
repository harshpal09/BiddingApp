

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, Dimensions, Modal } from 'react-native';
import { globalStyles } from '../../export';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { useRoute } from '@react-navigation/native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { TouchableOpacity } from 'react-native';


const numColumns = 1; // Number of columns in the grid

export default function Interior() {

  const route = useRoute(); // Use useRoute here to access route parameters

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const toggleModal = (index) => {
    setSelectedImageIndex(index);
    setModalVisible(!isModalVisible);
  };

  const { id ,item} = route.params;

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => toggleModal(index)}>
      <View style={globalStyles.galleryItemContainer}>
        <Image source={{ uri: item.image }} style={globalStyles.galleryItemImage} resizeMode="cover" />
        <Text style={globalStyles.galleryItemTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
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
      {isModalVisible && (
        <Modal animationType="slide" transparent={true} visible={isModalVisible}>
          <ImageViewer
            imageUrls={item[1].images.map((img) => ({ url: img.image }))}
            index={selectedImageIndex}
            enableSwipeDown={true}
            onCancel={() => toggleModal(null)}
          />
        </Modal>
      )}
    </SafeAreaView>
  );
}


