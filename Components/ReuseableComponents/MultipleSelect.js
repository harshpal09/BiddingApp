import { SafeAreaView, StyleSheet, Text, View, Animated, Easing, TextInput, TouchableOpacity } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import globalStyles, { BLUE_COLOR, LIGHT_BLUE, width, height, MEDIUM_FONT_SIZE } from '../../Styles/global'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

export default function MultipleSelect({ data ,setUpdatedModelArray,allData,mainIndex}) {
    const [AllSelected, setAllSelected] = useState(false)
    const [dataModel,setDataModel] = useState([...data]);
    const [toggle, setToggle] = useState(false);
    const [accordion, setAccordion] = useState(true);
 
    useEffect(() => {
        setDataModel([data])
    }, [data])

    
    const spinValue = useRef(new Animated.Value(0)).current;
    const spin = () => {
        spinValue.setValue(1);
        Animated.timing(spinValue, {
            toValue: 2,
            duration: 300, 
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };
    const spinAnimation = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: toggle == true || toggle == undefined ? ['0deg', '180deg'] : ['180deg', '0deg'], // Adjust the rotation range as needed
    });

    const toggleSelection = (index) => {
            const updatedArray = [...data];
            updatedArray[0].models[mainIndex].model[index].selected == true ? updatedArray[0].models[mainIndex].model[index].selected = false:updatedArray[0].models[mainIndex].model[index].selected=true;
            // console.log("itm =>",updatedArray[0].models[mainIndex].model[index].selected)
            setUpdatedModelArray(updatedArray);   
    };
    const selectAllItems = () => {
        const updatedArray = [...data];
        updatedArray[0].models[mainIndex].model.forEach((item) => {
           !AllSelected == true ? item.selected = true:item.selected=false;
        });
        setUpdatedModelArray(updatedArray);
        setAllSelected(!AllSelected);
    };
    return (
        <View style={[globalStyles.mainContainer, { backgroundColor: 'transparent' }]}>
            <TouchableOpacity activeOpacity={0.7} style={[globalStyles.childDetailContainer, globalStyles.flexBoxJustify, { width: '100%', marginBottom: 0, marginTop: 10, borderBottomLeftRadius: accordion ? 0 : 10, borderBottomRightRadius: accordion ? 0 : 10, }]} onPress={() => { spin(), setToggle(!toggle), setAccordion(!accordion) }} >
                <View style={[globalStyles.rowContainer, { justifyContent: 'space-between', }]}>
                    <View style={[globalStyles.rowContainer, { padding: 10 }]}>
                        <Text style={{ color: BLUE_COLOR, fontWeight: '700' }}>{data[0].models[mainIndex].brand_name}</Text>
                    </View>
                    <Animated.View style={[styles.rotatedBox, { padding: 10, transform: [{ rotate: spinAnimation }] }]} >
                        <MaterialCommunityIcons name='chevron-down' size={18} style={{ marginHorizontal: 8, }} color={BLUE_COLOR} />
                    </Animated.View>
                </View>
            </TouchableOpacity>
            {accordion &&
            <>
                <TouchableOpacity style={[globalStyles.mainContainer, globalStyles.rowContainer, { padding: 10, backgroundColor: 'transparent' }, globalStyles.flexBoxAlign]} onPress={() => { setAllSelected(!AllSelected), selectAllItems(); }}>
                    <MaterialIcons name={AllSelected ? 'check-box' : 'check-box-outline-blank'} size={21} style={{ paddingHorizontal: 10, color: BLUE_COLOR, }} />
                    <Text style={[{ color: BLUE_COLOR, fontWeight: '800', fontSize: MEDIUM_FONT_SIZE }]}>Select All</Text>
                </TouchableOpacity>
                
                {data != undefined && data[0].models[mainIndex].model.map((item, i) => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[
                            globalStyles.flexBoxJustify,
                            {
                                width: '100%',
                                marginBottom: 0,
                                marginTop: 10,
                                backgroundColor: 'transparent',
                                borderBottomWidth: 0.5,
                                borderTopWidth: i === 0 ? 0.5 : 0,
                            },
                        ]}
                        onPress={() => toggleSelection(i)}
                        key={i}
                    >
                        <View style={[globalStyles.rowContainer, { justifyContent: 'space-between' ,width:'100%',backgroundColor:'transparent'}]}>
                            <View style={[globalStyles.rowContainer, { padding: 10 ,width:'70%',backgroundColor:'transparent'}]}>
                                <Text style={{ color: BLUE_COLOR, fontWeight: '700',width:'100%' ,backgroundColor:'transparent'}}>{item.name}</Text>
                            </View>
                            {item.selected == true ?
                                <MaterialCommunityIcons
                                    name="check-circle"
                                    size={18}
                                    style={{ marginHorizontal: 8, padding: 10 ,width:'30%',textAlign:'center',backgroundColor:'transparent'}}
                                    color={BLUE_COLOR}
                                />
                                :<></>
                            }
                        </View>
                    </TouchableOpacity>
                ))}
            </>
}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginRight: 10,
    },
    textInput: {
        height: 40,
        width: '95%',
        // padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
        borderRadius: 10,
        //   paddingLeft: 40
    },
});