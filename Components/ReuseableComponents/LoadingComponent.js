import React, { useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image,Animated } from 'react-native';
import { globalStyles } from '../../export';
import { height, width } from '../../Styles/global';

export default function LoadingComponent() {
  const translateY = useRef(new Animated.Value(0)).current;
  const animationDuration = 700; // 2 seconds

  const startAnimation = () => {
    const upAnimation = Animated.timing(translateY, {
      toValue: -100,
      duration: animationDuration,
      useNativeDriver: false,
    });

    const downAnimation = Animated.timing(translateY, {
      toValue: -50,
      duration: animationDuration,
      useNativeDriver: false,
    });

    Animated.sequence([upAnimation, downAnimation]).start(() => {
      startAnimation();
    });
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <SafeAreaView style={[globalStyles.flexBox, { width, height, backgroundColor: 'white' }]}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        <Image source={require('../../Assets/Images/logo.png')} style={{ width: width / 2, height: height / 6 }} />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
