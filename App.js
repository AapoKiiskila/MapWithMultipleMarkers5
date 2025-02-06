import { StatusBar } from 'expo-status-bar'
import { StyleSheet, SafeAreaView, Platform } from 'react-native'
import Map from './screens/Map.js'
import Constants from 'expo-constants'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Map />
      <StatusBar style='auto' />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0
  },
})
