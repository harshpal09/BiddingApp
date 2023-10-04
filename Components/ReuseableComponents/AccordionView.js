import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Modal } from 'react-native';
import { globalStyles } from '../../export';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MEDIUM_FONT_SIZE, height, width } from '../../Styles/global';
import Image from 'react-native-image-lazy-loading';
import { EXTRA_LARGE_FONT_SIZE, LARGE_FONT_SIZE, TOP_TAB_TEXT_COLOR } from '../../Styles/global';

export default AccordionView = ({ title, content, expanded, subchild }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedText, setSelectedText] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = (image,text) => {
    setSelectedImage(image);
    setSelectedText(text);
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={[globalStyles.container, globalStyles.flexBoxJustify, { borderWidth: expanded && subchild == undefined ? 1 : 0, }]}>
      {expanded && (
        content.map((item, i) => (
          <View style={globalStyles.content} key={i}>
            <View
              style={[
                globalStyles.rowContainer,
                {
                  minHeight: 10,
                  justifyContent: 'space-around',
                  padding: 5
                },
                globalStyles.flexBoxAlign,
              ]}>
              <View style={[globalStyles.rowContainer, { width: '50%' }, globalStyles.flexBoxAlign]}>
                <MaterialCommunityIcons
                  name={item.status == 'notok' ? 'alert-circle' : "check-circle"}
                  size={20}
                  color={item.status == 'notok' ? 'red' : 'green'}
                  style={{ padding: 10 }}
                />
                <Text style={[globalStyles.key,]}>{item.name}</Text>
              </View>
              <Text style={[globalStyles.value, { width: item.image != undefined && item.image.length > 0 ? '25%' : '50%' }]}>{item.condition}</Text>
              {item.image != undefined && item.image.length > 0 ?
                <TouchableOpacity onPress={() => toggleModal(item.image[0].image,item.name+" - "+item.condition)}>
                  <Image source={{ uri: item.image[0].image }} style={{ height: 60, width: 75 }} />
                </TouchableOpacity>
                :
                <></>
              }
            </View>
          </View>
        ))
      )}
      {selectedImage && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => toggleModal(null,null)}
        >
          {/* Modal Content */}
          <MyBottomSheet toggleModal={() => toggleModal(null,null)} data={selectedImage} text={selectedText} />
        </Modal>
      )}
    </SafeAreaView>
  );
};

const MyBottomSheet = ({ toggleModal, data,text }) => {
  return (
    <SafeAreaView style={[globalStyles.flexBox, { flex: 1, width: '100%', backgroundColor: 'transparent', height: '100%' }]}>
      <View style={[{ width: '100%', backgroundColor: TOP_TAB_TEXT_COLOR, height: 40, paddingHorizontal: 10 }, globalStyles.flexBoxAlign, globalStyles.rowContainer]} activeOpacity={0.9} >
        <TouchableOpacity onPress={toggleModal}>
          <MaterialCommunityIcons size={30} name='chevron-down' color={'#FFF'} />
        </TouchableOpacity>
      </View>
      <View style={[globalStyles.rowContainer, { width: '100%', height: "100%", backgroundColor: '#FFFFFF'}]}>
        <Image source={{ uri: data }} style={{ width: width, height: height }} />
      </View>
      <View style={[globalStyles.textContainer,{bottom:50,justifyContent:'center',alignItems:'center'}]}>
              <Text style={[globalStyles.text]}>
                {text}
              </Text>
            </View>
    </SafeAreaView>
  );
};