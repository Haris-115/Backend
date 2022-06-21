import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';

export default function Header2({navigation}) {
  return (
        <TouchableOpacity style={{marginRight:20}} onPress={() => {navigation.navigate("Bag")}}>
            <Feather name="shopping-bag" size={22} color="black" />
        </TouchableOpacity>
  )
}