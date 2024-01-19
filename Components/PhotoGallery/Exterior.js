import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, Modal,Image } from 'react-native';
import { globalStyles } from '../../export';
import { useRoute } from '@react-navigation/native';
import ImageViewer from 'react-native-image-zoom-viewer';

const data = [
  // Your image data
];

export default function Exterior() {
  const route = useRoute(); // Use useRoute here to access route parameters
  const { item } = route.params;

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const toggleModal = (index) => {
    setSelectedImageIndex(index);
    setModalVisible(!isModalVisible);
  };

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
        data={item[0].images}
        renderItem={renderItem}
        keyExtractor={(item) => item.image}
      />

      {isModalVisible && (
        <Modal animationType="slide" transparent={true} visible={isModalVisible}>
          <ImageViewer
            imageUrls={item[0].images.map((img) => ({ url: img.image }))}
            index={selectedImageIndex}
            enableSwipeDown={true}
            onCancel={() => toggleModal(null)}
          />
        </Modal>
      )}
    </SafeAreaView>
  );
}
