import { SafeAreaView, StyleSheet, Text, View,Animated,Easing, TouchableOpacity } from 'react-native'
import React ,{useRef,useEffect,useState} from 'react'
import globalStyles, { BLUE_COLOR, LIGHT_BLUE } from '../../Styles/global'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import CheckboxAccordionView from './CheckboxAccordionView';
export default function PopularBrandChildContainer({data}) {
    const [toggle, setToggle] = useState(false);
    const [accordion, setAccordion] = useState(true);
    const spinValue = useRef(new Animated.Value(0)).current;
    console.log("item => ",data)
    const spin = () => {
        // console.log('toggle=>',toggle);
        spinValue.setValue(1);
        Animated.timing(spinValue, {
          toValue: 2,
          duration: 300, // Adjust the duration to control the speed (e.g., 5000 milliseconds for 5 seconds)
          easing: Easing.linear, // You can experiment with different easing functions
          useNativeDriver: true,
        }).start(); // Restart the animation when it completes
      };
      const spinAnimation = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: toggle == true || toggle == undefined? ['0deg', '180deg']:['180deg', '0deg'], // Adjust the rotation range as needed
      });
      console.log(accordion)
    return (
        <SafeAreaView  style={[globalStyles.flexBox, { width: "100%"}]}>
            <TouchableOpacity activeOpacity={0.7} style={[globalStyles.childDetailContainer, globalStyles.flexBoxJustify, { width:'100%',marginBottom: 0, marginTop: 10, borderBottomLeftRadius: accordion ? 0 : 10, borderBottomRightRadius: accordion ? 0 : 10, }]} onPress={() => { spin(), setToggle(!toggle), setAccordion(!accordion) }} >
                <View style={[globalStyles.rowContainer, { justifyContent: 'space-between', }]}>
                    <View style={[globalStyles.rowContainer, { padding: 10 }]}>
                        {/* <MaterialCommunityIcons name={data.icon_name} size={15} style={{ marginHorizontal: 5 }} color={BLUE_COLOR} /> */}
                        <Text style={{ color: BLUE_COLOR, fontWeight: '700' }}>{data.brand_name}</Text>
                    </View>
                    <Animated.View style={[styles.rotatedBox, { padding: 10, transform: [{ rotate: spinAnimation }] }]} >
                        <MaterialCommunityIcons name='chevron-down' size={18} style={{ marginHorizontal: 8, }} color={BLUE_COLOR} />
                    </Animated.View>
                </View>
            </TouchableOpacity>
            <CheckboxAccordionView expanded={accordion} content={data.model} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})