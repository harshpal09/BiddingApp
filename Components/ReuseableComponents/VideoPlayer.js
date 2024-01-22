// VideoPlayer.js
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Button} from 'react-native';
import Video from 'react-native-video';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import { height } from '../../Styles/global';

const VideoPlayer = ({uri,height,width,onPressCancel,isFullView}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);


  return (
    <View style={styles.container}>
      <Video 
      ref={videoRef} source={{uri: uri}} 
      style={{width:width,height:height}}
      paused={isPlaying}
      onLoad={() => {
        setIsPlaying(true)
      }}
       />
       {isFullView &&
        <TouchableOpacity style={{height:30,width:width,backgroundColor:'#fff',position:'absolute',top:50}} onPress={() => onPressCancel(null)}>
          <MaterialCommunityIcons
            onPress={()=>onPressCancel(null)}
            size={40}
            name="chevron-down"
            color={'#000'}
          />
        </TouchableOpacity>
        }
        {isFullView &&
      <TouchableOpacity
        onPress={()=>setIsPlaying(!isPlaying)}
        style={styles.playPauseButton}>
        {/* You can customize the button icon based on the video state (playing or paused) */}
        <Text>{!isPlaying ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>
}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // video: {
  //   height: he, width: wi
  // },
  playPauseButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 25,
  },
});

export default VideoPlayer;
