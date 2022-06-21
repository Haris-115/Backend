import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { theme } from '../core/theme'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BagCard({ product, bgQuantity, changeHandler }) {

    const [quantity, setQuantity] = useState(1)


    const quantityHandler = (val, med_id) => {
        if ((quantity + val) > 0) {
            setQuantity(quantity + val)
        }

        let updateBag = async () => {
            const jsonValue = await AsyncStorage.getItem("bag_items")
            let new_bag_items = null
            if (jsonValue != null) {
                let bag_items = JSON.parse(jsonValue)
                let same_item = bag_items.filter(e => e.medicines_id == med_id)[0]
                same_item.quantity += val
                if (same_item.quantity > 0) {
                    new_bag_items = [...bag_items.filter(e => e.medicines_id != med_id), same_item]

                }
                else {
                    new_bag_items = [...bag_items.filter(e => e.medicines_id != med_id)]

                }
            }
            const newJsonValue = JSON.stringify(new_bag_items)
            await AsyncStorage.setItem("bag_items", newJsonValue)
            changeHandler()
        }

        updateBag()


    }



    useEffect(() => {
        setQuantity(bgQuantity)
        
    }, [])


    return (
        <View style={styles.list_component}>
            <View style={{ flexDirection: 'row', flex: 1, marginBottom: 5 }}>
                <Text style={{ flex: 1 }}>{product.medicines_name}</Text>
                <Text>Rs. {product.price}</Text>
            </View>
            <View style={{ flexDirection: 'row', flex: 1 }}>

                <View style={{ flex: 1, flexDirection: "row", padding: 5 }}>
                    <TouchableOpacity onPress={() => { quantityHandler(-1, product.medicines_id) }}><Text style={{ paddingRight: 15 }}>-</Text></TouchableOpacity>
                    <Text>{quantity}</Text>
                    <TouchableOpacity onPress={() => { quantityHandler(1, product.medicines_id) }}><Text style={{ paddingLeft: 15 }}>+</Text></TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    list_component: {
        paddingHorizontal: 8,
        paddingTop: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderColor: '#e9edef',
    },
    button: {
        color: theme.colors.primary,
        fontWeight: "bold",
        fontSize: 12,
        marginTop: 14,
        textAlign: "right"
    }
})