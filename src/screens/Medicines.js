import React, { useState, useEffect } from 'react';
import { FlatList, Text } from 'react-native';
import ProductCard from '../components/ProductCard'
import LoadingOverlay from '../components/LoadingOverlay';

export default function Medicines({ route }) {

    const [mdids, setMdids] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchFunc = () => {
        setLoading(true)
        fetch(`https://6360-119-160-99-125.ngrok.io/api/Stocks`)
            .then(response => response.json())
            .then(data => {
                let md_ids = []
                let filterted_data = data.filter(e => e.distributors_id == route.params.distributors_id)
                filterted_data.map(item => {
                    md_ids.push(item.medicines_id)
                })
                setMdids(md_ids)
                setLoading(false)
            });
        
    }


    useEffect(() => {
        fetchFunc()
    }, []);
   
    return (
        <>
        
            {loading ? <LoadingOverlay /> : null}
                <>
               
                    <FlatList style={{ flex: 1, backgroundColor: 'white', padding: 10 }}
                        data={mdids}
                        renderItem={({ item }) => {
                           
                            return (
                            
                                <ProductCard productId={item} distributorsId={route.params.distributors_id} />
                            )
                        }}
                    />
              
                </> 
        </>
    )
}