import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { lisenceValidator } from '../helpers/lisenceValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { numberValidator } from '../helpers/numberValidator'

export default function RegisterScreen({ navigation, route }) {
  const [number, setNumber] = useState({ value: '', error: '' })
  const [lisence, setLisence] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onNextPressed = () => {
    const numberError = numberValidator(number.value)
    const licenceError = lisenceValidator(lisence.value)
    const passwordError = passwordValidator(password.value)
    if (licenceError || passwordError || numberError) {
      setNumber({ ...number, error: numberError })
      setLisence({ ...lisence, error: licenceError })
      setPassword({ ...password, error: passwordError })
      return
    }
    fetch(`https://6360-119-160-99-125.ngrok.io/api/Users`, {
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            name:route.params.name,
            email:route.params.email,
            address:route.params.address,
            lisence:lisence.value,
            number:parseInt(number.value),
            password:password.value,
            detail_type: "medstores",
            username:route.params.name
        })
    }).then(() => {
      navigation.navigate("LoginScreen")
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <TextInput
        label="Phone Number"
        returnKeyType="next"
        value={number.value}
        onChangeText={(text) => setNumber({ value: text, error: '' })}
        error={!!number.error}
        errorText={number.error}
      />
      <TextInput
        label="Licence Number"
        returnKeyType="next"
        value={lisence.value}
        onChangeText={(text) => setLisence({ value: text, error: '' })}
        error={!!lisence.error}
        errorText={lisence.error}
      />
      
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onNextPressed}
        style={{ marginTop: 24 }}
      >
        Register
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})