import React, { useRef } from 'react';
import { ScrollView, View, Button, Dimensions } from 'react-native';
// import { MyAutions } from '../../export';

const { height } = Dimensions.get('window');

const MyAutions = () => {
  const scrollViewRef = useRef();

  const scrollToComponent = (componentNumber,n) => {
    const yOffset = componentNumber === 1 ? 0 : (height * n)*(componentNumber-1);
    scrollViewRef.current.scrollTo({ x: 0, y: yOffset, animated: true });
  };

  return (
    <View>
      <Button title="Component 1" onPress={() => scrollToComponent(1,1)} />
      <Button title="Component 2" onPress={() => scrollToComponent(2,1)} />
      <Button title="Component 3" onPress={() => scrollToComponent(3,1)} />

      <ScrollView ref={scrollViewRef}>
        <View style={{ height: height * 1, backgroundColor: 'red' }}>
          {/* Component 1 content */}
        </View>
        <View style={{ height: height * 1, backgroundColor: 'blue' }}>
          {/* Component 2 content */}
        </View>
        <View style={{ height: height * 1, backgroundColor: 'green' }}>
          {/* Component 3 content */}
        </View>
      </ScrollView>
    </View>
  );
};

export default MyAutions;
