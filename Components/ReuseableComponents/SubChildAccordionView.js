import { StyleSheet, Text, View, Animated, Easing, TouchableOpacity } from 'react-native'
// import React from 'react'
import React, { useState, useRef } from 'react';
import { AccordionView, globalStyles } from '../../export';
import { BLUE_COLOR, TOP_TAB_TEXT_COLOR } from '../../Styles/global';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SubChildAccordionView({ content, length, index }) {
    const [toggle, setToggle] = useState(false);
    const [accordion, setAccordion] = useState(true);
    const spinValue = useRef(new Animated.Value(0)).current;

    // console.log("sdfghjkl  ",content);

    const spin = () => {
        // console.log('toggle=>', toggle);
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
        outputRange: toggle == true || toggle == undefined ? ['0deg', '180deg'] : ['180deg', '0deg'], // Adjust the rotation range as needed
    });
    return (
        <View
            style={[
                globalStyles.flexBoxJustify,
                { width: '100%', },
            ]}
        >
            <TouchableOpacity
                activeOpacity={0.7}
                style={[
                    globalStyles.childDetailContainer,
                    globalStyles.flexBoxJustify,
                    {
                        width: '100%',
                        backgroundColor: 'transparent',
                        marginTop: 10,
                        borderBottomLeftRadius: accordion ? 0 : 10,
                        borderBottomRightRadius: accordion ? 0 : 10,
                        borderBottomWidth: index == length - 1 && !accordion ? 0 : 1,
                        borderColor: 'lightgrey'

                    },
                ]}
                onPress={() => {
                    // console.log('on press toggle =>', toggle),
                    spin()
                    setToggle(!toggle)
                    setAccordion(!accordion);
                }}>
                <View
                    style={[
                        globalStyles.rowContainer,
                        { justifyContent: 'space-between', paddingHorizontal: 10 },
                    ]}>
                    <View style={[globalStyles.rowContainer, { padding: 10 }]}>
                        <Text style={{ color: TOP_TAB_TEXT_COLOR, fontWeight: '700' }}>
                            {content.name}
                        </Text>
                    </View>
                    <Animated.View
                        style={[
                            styles.rotatedBox,
                            { padding: 10, transform: [{ rotate: spinAnimation }] },
                        ]}>
                        <MaterialCommunityIcons
                            name="chevron-down"
                            size={18}
                            style={{ marginHorizontal: 8 }}
                            color={TOP_TAB_TEXT_COLOR}
                        />
                    </Animated.View>
                </View>
            </TouchableOpacity>

            <AccordionView expanded={accordion} subchild={false} content={content.car_detail} />

        </View>

    )
}

const styles = StyleSheet.create({})