import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View, TouchableOpacity, Text } from 'react-native';
import { theme } from '../core/theme'
import AppContext from '../components/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BagCard from '../components/BagCard';

export default function Bag({ navigation, route }) {
    const myContext = useContext(AppContext)
    const [bagItems, setBagItems] = useState([])
    const [changed, setChanged] = useState(false)
    const getBagItems = async () => {

        const jsonValue = await AsyncStorage.getItem("bag_items")
        if (jsonValue != null) {
            setBagItems(JSON.parse(jsonValue))
        }

    }

    const deleteBagItems = async () => {

        const newJsonValue = JSON.stringify([])
        await AsyncStorage.setItem("bag_items", newJsonValue)
        setBagItems([])
    }

    const placeOrder = () => {
        fetch(`https://6360-119-160-99-125.ngrok.io/api/Orders`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                distributors_id: bagItems[0].distributors_id,
	            medstores_id: myContext.userData.medstores_id
            })
        }).then(response => response.json())
        .then(data => {
            let orders_id = data
            bagItems.map(item => {
                fetch("https://6360-119-160-99-125.ngrok.io/api/Orderitems", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        orderitems_quantity: item.quantity,
                        orders_id: orders_id,
                        medicines_id: item.medicines_id
                    })
                }).then(() => {
                    deleteBagItems();
                })

            })
        })

    }

    const changeHandler = () => {
        setChanged(!changed)
    }


    useEffect(() => {
        getBagItems()
    }, [changed]);

    return (
        <>
            {bagItems.length > 0 ?
                <>
                    <FlatList style={{ flex: 1, backgroundColor: 'white', padding: 10 }}
                        data={bagItems}
                        renderItem={({ item }) => {
                            return (
                                <BagCard product={item} bgQuantity={item.quantity} changeHandler={changeHandler} />
                            )
                        }}
                    />

                    <TouchableOpacity onPress={placeOrder} style={{ padding: 10, backgroundColor:theme.colors.primary }}>
                        <Text style={{ textAlign: "center", color:"white" }}>Place Order</Text>
                    </TouchableOpacity>
                </> :
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor:"white" }}>
                    <Text style={{marginBottom:90}}>Nothing In Bag</Text>
                </View>
            }

        </>
    )
}