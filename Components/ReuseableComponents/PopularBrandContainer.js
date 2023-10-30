import { StyleSheet,SafeAreaView, Text, View } from 'react-native'
import React from 'react'
import DetailsChild from './DetailsChild'
import { globalStyles } from '../../export'
import MultipleSelect from './MultipleSelect'

export default function PopularBrandContainer({data,updatedModelArray}) {
    // console.log("data =>",data)
  return (
    <SafeAreaView  style={[globalStyles.flexBoxAlign,{marginBottom:100,width:'100%'}]}>
      {data.map((item,i)=>(
        <MultipleSelect setUpdatedModelArray={updatedModelArray}  data={item} key={i} />
      ))} 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})