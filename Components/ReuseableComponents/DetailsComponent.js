import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect,useState } from 'react'
import {DetailsChild,globalStyles} from '../../export'
import { height } from '../../Styles/global';

export default function DetailsComponent({data,sendValueToParent,getHeight}) {
  const [sendValue, setSendValue] = useState('');
  const [childHeight,setChildHeight] = useState('');
  const [heightArray,setHeightArray] = useState([]);

  useEffect(() => {
    sendValues();
  }, [sendValue])
  
  const sendValues = ()=>{
    sendValueToParent(sendValue);
  }

  useEffect(() => {
    finalArray();
  }, [heightArray])

  const fillArray = (value,index) =>{
    const newArray = [...heightArray];
    // Update the value at the specified index
    newArray[index] = value;
      setHeightArray(newArray);
  }

  const finalArray =()=>{
    getHeight(heightArray);
  }
  
  
  

  // console.log("from details => ",childHeight);
  return (
    <SafeAreaView  onLayout={(e)=> setSendValue(e.nativeEvent.layout.y)} style={[globalStyles.flexBoxAlign,{marginBottom:height}]}>
      {data.map((item,i)=>(
        <DetailsChild  height={fillArray} index={i}  data={item} key={i} />
      ))}
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})