import React from 'react'
import { View, Dimensions, ActivityIndicator } from 'react-native'


export default function LoadingOverlay({top}) {
    

  return (
    <View style={{position:"absolute", top:0, left:0, zIndex:99}}>
        <View style={{height: Dimensions.get("window").height+30, width: Dimensions.get("window").width, backgroundColor:"black", opacity:.40, alignItems:"center", justifyContent:"center"}} >
        <ActivityIndicator color="blue" size={70} />
    </View>
    </View>
  )
}