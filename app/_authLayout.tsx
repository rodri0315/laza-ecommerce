// React native navigation Auth stack 

// https://reactnavigation.org/docs/auth-flow/

// https://reactnavigation.org/docs/auth-flow/#react-native-navigation-auth-stack

import { Stack } from 'expo-router'

import SignIn from './signin'
import SignUp from './signup'
import Onboarding from './onboarding'

const AuthStack = () => {
  return (
    <Stack>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="signin" />
      <Stack.Screen name="signup" />
    </Stack>
  )
}