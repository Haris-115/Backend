import React, { useState, useEffect, useContext } from 'react';
import { Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import LoadingOverlay from "../components/LoadingOverlay"
import AppContext from "../components/AppContext"


export default function Distributors({ navigation }) {
  const myContext = useContext(AppContext)
  const [distributors, setDistributors] = useState([])
  const [loading, setLoading] = useState(false)
  function fetchFunc() {
    setLoading(true)
    fetch(`https://6360-119-160-99-125.ngrok.io/api/Distributors`)
      .then(response => response.json())
      .then(data => {
        setDistributors(data)
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
        <Text style={{fontSize:20, padding:10, fontWeight:"bold", backgroundColor:"white"}}>Welcome {myContext.userData.username}</Text>
        {console.log(myContext.userData)}
          <FlatList
           style={{ flex: 1, backgroundColor: 'white', padding: 10 }}
            data={distributors}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => {navigation.navigate("Medicines", {distributors_id:item.distributors_id})}} style={styles.list_component}>
                  <Text style={styles.name}>{item.distributors_name}</Text>
                </TouchableOpacity>
              )
            }}
          />

        </> 
    </>
  )
}

const styles = StyleSheet.create({
  list_component: {
    paddingHorizontal: 8,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: '#e9edef',
    flexDirection: 'row',
  },
  name: {
    flex: 1, 
    fontSize: 16, 
    fontWeight: "bold"
  }
})