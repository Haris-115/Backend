import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { theme } from '../core/theme'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProductCard({ productId, distributorsId }) {

    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(false)


    const quantityHandler = (val) => {
        if ((quantity + val) > 0) {
            setQuantity(quantity + val)
        }

    }

    const addToBagHandler = async (med_id, medicines_name, price) => {

        const jsonValue = await AsyncStorage.getItem("bag_items")
        let new_bag_items = null
        if (jsonValue != null) {
            let bag_items = JSON.parse(jsonValue)
            if (bag_items.filter(e => e.medicines_id == med_id).length > 0) {
                new_bag_items = [...bag_items.filter(e => e.medicines_id != med_id), { medicines_id: med_id, medicines_name: medicines_name, price: price, quantity: quantity, distributors_id: distributorsId }]
            } else {
                new_bag_items = [...bag_items, { medicines_id: med_id, medicines_name: medicines_name, price: price, quantity: quantity, distributors_id: distributorsId }]
            }
        }
        else {
            new_bag_items = [{ medicines_id: med_id, medicines_name: medicines_name, price: price, quantity: quantity, distributors_id: distributorsId }]

        }
        const newJsonValue = JSON.stringify(new_bag_items)
        await AsyncStorage.setItem("bag_items", newJsonValue)

    }

    useEffect(() => {
        fetch(`https://6360-119-160-99-125.ngrok.io/api/Stocks/StockDetails/${productId}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data[0])
            })
    }, [])



    return (
        <View style={styles.list_component}>
            {!loading ?
                product ?
                    <>
                        <View style={{ flexDirection: 'row', flex: 1, marginBottom: 5 }}>
                            <Text style={{ flex: 1 }}>{product.medicines_name}</Text>
                            <Text>Rs. {product.price}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1 }}>

                            <View style={{ flex: 1, flexDirection: "row", padding: 5 }}>
                                <TouchableOpacity onPress={() => { quantityHandler(-1) }}><Text style={{ paddingRight: 15 }}>-</Text></TouchableOpacity>
                                <Text>{quantity}</Text>
                                <TouchableOpacity onPress={() => { quantityHandler(1) }}><Text style={{ paddingLeft: 15 }}>+</Text></TouchableOpacity>
                            </View>


                            <TouchableOpacity onPress={() => { addToBagHandler(product.medicines_id, product.medicines_name, product.price) }} style={{ flex: 1 }}>
                                <Text style={styles.button}>Add to bag</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    :
                    null
                :
                <View>
                    <ActivityIndicator color={"blue"} size={40} style={{ padding: 10 }} />
                </View>
            }
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