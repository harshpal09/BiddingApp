import React from 'react';
import { View, StyleSheet } from 'react-native';
import SwipeButton from 'react-native-swipe-button';

const SwipeToggle = () => {
  const handleSwipe = () => {
    // Handle the swipe action here
    console.log('Swiped!');
  };

  return (
    <View style={styles.container}>
      <SwipeButton
        height={50}
        width={200}
        title="Swipe Me"
        onSwipeSuccess={handleSwipe}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SwipeToggle;
