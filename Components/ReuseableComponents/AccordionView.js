import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
} from 'react-native';
import {globalStyles} from '../../export';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {MEDIUM_FONT_SIZE, height, width} from '../../Styles/global';
import Image from 'react-native-image-lazy-loading';
import {
  EXTRA_LARGE_FONT_SIZE,
  LARGE_FONT_SIZE,
  TOP_TAB_TEXT_COLOR,
} from '../../Styles/global';
import FastImage from 'react-native-fast-image';
// import TowDimentional from './TowDimentional';
import TwoDimensional from './TwoDimensional';
import ImageViewer from 'react-native-image-zoom-viewer';
import VideoPlayer from './VideoPlayer';
import Video from 'react-native-video';
import { Button } from 'react-native';
// import { ImageZoom } from '@likashefqet/react-native-image-zoom';

export default AccordionView = ({title, content, expanded, subchild}) => {
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [selectedText, setSelectedText] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isVideoModalVisible, setVideoModalVisible] = useState(false);

  const toggleModal = (image, text) => {
    setSelectedImage(image);
    setSelectedText(text);
    setModalVisible(!isModalVisible);
  };
  const toggleVideo = (video) => {
    setSelectedVideo(video);
    setVideoModalVisible(!isVideoModalVisible);
  };

  return (
    <SafeAreaView
      style={[
        globalStyles.container,
        globalStyles.flexBoxJustify,
        {borderWidth: expanded && subchild == undefined ? 1 : 0},
      ]}>
      {expanded &&
        content.map((item, i) => (
          <View style={globalStyles.content} key={i}>
            <View
              style={[
                globalStyles.rowContainer,
                {
                  minHeight: 10,
                  justifyContent: 'space-around',
                  padding: 5,
                },
                globalStyles.flexBoxAlign,
              ]}>
                
              <View
                style={[
                  globalStyles.rowContainer,
                  {width: '50%'},
                  globalStyles.flexBoxAlign,
                ]}>
                <MaterialCommunityIcons
                  name={
                    item.status == 'notok' ? 'alert-circle' : 'check-circle'
                  }
                  size={20}
                  color={item.status == 'notok' ? 'red' : 'green'}
                  style={{padding: 10}}
                />
                <Text style={[globalStyles.key, {color: '#000'}]}>
                  {item.name}
                </Text>
              </View>
              <Text
                style={[
                  globalStyles.value,
                  {
                    width:
                     ( item.image != undefined && item.image.length > 0 ) || item.video != "" 
                        ? '25%'
                        : '50%',
                    color: '#000',
                  },
                ]}>
                {item.condition}
              </Text>
              {item.image != undefined && item.image.length > 0 ? (
                <TouchableOpacity
                  onPress={() =>
                    toggleModal(
                      item.image[0].image,
                      item.name + ' - ' + item.condition,
                    )
                  }>
                  <FastImage
                    source={{
                      uri: item.image[0].image,
                      priority: FastImage.priority.high,
                    }}
                    style={{height: 60, width: 75}}
                  />
                </TouchableOpacity>
              ) : (
                <></>
              )}
              {item.video != undefined && item.video != "" ? (
                <TouchableOpacity
                  style={{backgroundColor:'transparent',paddingRight:20}}
                  onPress={() =>
                    toggleVideo(item.video)
                  }>
                  <VideoPlayer isFullView={false} height={60} width={75} uri={item.video} />
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>
          </View>
        ))}
      {selectedImage && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => toggleModal(null, null)}>
          {/* Modal Content */}
          <MyBottomSheet
            toggleModal={() => toggleModal(null, null)}
            data={selectedImage}
            text={selectedText}
          />
        </Modal>
      )}
      {selectedVideo && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVideoModalVisible}

          onRequestClose={() => toggleVideo(null)}>
           <SafeAreaView style={{backgroundColor:"black",width:width,height}}>
           {/* <TouchableOpacity style={{height:30,width:width,backgroundColor:'#fff',position:'absolute',top:50}} onPress={() => console.log("agya")}>
              <MaterialCommunityIcons
                onPress={()=>console.log("agya icon")}
                size={40}
                name="chevron-down"
                color={'#000'}
              />
          </TouchableOpacity> */}
           <VideoPlayer isFullView={true} onPressCancel={toggleVideo} uri={selectedVideo} height={height} width={width} />
          </SafeAreaView>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const MyBottomSheet = ({toggleModal, data, text}) => {
  const images = [{ url: data }];
  return (
    <SafeAreaView
      style={[
        globalStyles.flexBox,
        {flex: 1, width: '100%', backgroundColor: 'transparent', marginTop: 20},
      ]}>
      <TouchableOpacity
        onPress={toggleModal}
        style={[
          {
            width: '100%',
            backgroundColor: TOP_TAB_TEXT_COLOR,
            height: 40,
            paddingHorizontal: 10,
          },
          globalStyles.flexBoxAlign,
          globalStyles.rowContainer,
        ]}
        activeOpacity={0.9}>
        <TouchableOpacity onPress={toggleModal}>
          <MaterialCommunityIcons
            size={40}
            name="chevron-down"
            color={'#FFF'}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      <View
        style={[
          globalStyles.rowContainer,
          {width: '100%', height: '100%', backgroundColor: '#FFFFFF'},
        ]}>
        <ImageViewer
        imageUrls={images}
        enableSwipeDown={true}
        onCancel={toggleModal}
        renderHeader={() => (
          <TouchableOpacity onPress={toggleModal} style={{ position: 'absolute', top: 10, right: 10 }}>
            <MaterialCommunityIcons onPress={toggleModal}  size={30} name='close' color={'#FFF'} />
          </TouchableOpacity>
        )}
      />
      </View>
      <View
        style={[
          globalStyles.textContainer,
          {bottom: 50, justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Text style={[globalStyles.text]}>{text}</Text>
      </View>
    </SafeAreaView>
  );
};
