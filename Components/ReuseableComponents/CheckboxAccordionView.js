import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Modal } from 'react-native';
import React,{useState,useEffect} from 'react'
import { globalStyles } from '../../export';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectMultiple from 'react-native-select-multiple'

const fruits = ['Apples', 'Oranges', 'Pears']
export default function CheckboxAccordionView({ expanded, content }) {
    const [SelectedItems, setSelectedItems] = useState([])
    useEffect(() => {
        oneDArray
    }, [])
    const oneDArray = content.reduce((accumulator, currentArray) => {
        return accumulator.concat(currentArray);
      }, []);
    // console.log("content = ",expanded)
    onSelectionsChange = (items) =>{
        setSelectedItems(items);
        // console.log("selected items",SelectedItems)
    }
    return (
        <SafeAreaView style={[globalStyles.container, globalStyles.flexBoxJustify, { borderWidth: expanded ? 1 : 0}]}>
            {expanded && (
                    <View style={[globalStyles.content]}>
                        <SelectMultiple
                            onselectAll
                            items={oneDArray}
                            selectedItems={SelectedItems}
                            onSelectionsChange={onSelectionsChange} 
                            />
                    </View>
                )
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})