import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing, SafeAreaView } from 'react-native';
import React, { useState, useRef } from 'react';
import { SubChildAccordionView, globalStyles } from '../../export';
import { BLUE_COLOR } from '../../Styles/global';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"


export default function SubAccordionView({ expanded, content }) {
    
    return (
        <SafeAreaView
            style={[
                globalStyles.flexBoxJustify,
                // { width: '100%',overflow:'hidden',borderWidth:1,borderTopColor:'transparent',borderColor:'lightgrey' },
                globalStyles.container,
                {borderWidth:expanded ? 1:0,}
            ]}>
            {expanded &&
                content.map((item, i) => (
                    <SubChildAccordionView length={content.length} index={i} content={item} key={i}/>
                ))}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
