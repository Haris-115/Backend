import React, { useState, useContext } from 'react'
import { TouchableOpacity, StyleSheet, View, ActivityIndicator } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import AppContext from '../components/AppContext'

export default function LoginScreen({ navigation }) {
  const myContext = useContext(AppContext)
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [loading, setLoading] = useState(false)


  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    setLoading(true)
    fetch("https://6360-119-160-99-125.ngrok.io/api/Users/authenticate", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      })
      
    }).then(response => response.json())
      .then(data => {
        if (data) {
          if (data.detail_type == "medstores") {
            fetch(`https://6360-119-160-99-125.ngrok.io/api/Medstores/MedstoreDetail/${data.users_id}`)
            .then(response => response.json())
            .then(medstores_data => {
              setLoading(false)
                data.medstores_id = medstores_data.medstores_id
                myContext.userDataHandler(data)
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Distributors' }],
                })
            })
          }
          else {
            setLoading(false)
            setPassword({ value: password, error: "you are distributor go to web admin dashboard" })
          }

        }
        else {
          setLoading(false)
          setPassword({ value: password, error: "wrong email or password" })
        }
      })
  }

  return (
    <Background>
      <Header>Welcome to MDMS</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      {loading ?
        <ActivityIndicator size={50} color={"blue"} />
        :
        <Button mode="contained" onPress={onLoginPressed}>
          Login
        </Button>}
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})