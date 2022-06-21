import React, {useState} from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import AppContext from './src/components/AppContext'
import Header2 from './src/components/Header2'
import {
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Bag,
  Medicines,
  Distributors,
  RegisterStep2
} from './src/screens'

const Stack = createStackNavigator()

export default function App() {

  const [userData, setUserData] = useState({})
  const globalData ={
    userData,
    userDataHandler: (data) => setUserData(data)
  }

  return (
    <AppContext.Provider value={globalData}>
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          // initialRouteName="LoginScreen"
          screenOptions={({navigation}) => ({
            headerShown: true,
            headerRight : () => <Header2 navigation={navigation} />,
          })}
        >
          <Stack.Screen options={{headerShown: false}} name="LoginScreen" component={LoginScreen} />
          <Stack.Screen options={{headerShown: false}} name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen options={{headerShown: false}} name="RegisterStep2" component={RegisterStep2} />
          <Stack.Screen name="Distributors" component={Distributors} />
          <Stack.Screen name="Medicines" component={Medicines} />
          <Stack.Screen name="Bag" component={Bag} />
          <Stack.Screen
            options={{headerShown: false}}
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    </AppContext.Provider>
  )
}
