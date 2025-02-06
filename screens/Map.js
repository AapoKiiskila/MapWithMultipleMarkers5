import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import uuid from 'react-native-uuid'

export default function Map() {
    const [markers, setMarkers] = useState([])
    const [location, setLocation] = useState({
        latitude: 65.0800,
        longitude: 25.4800,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })

    useEffect(() => {
        (async() => {
            getUserPosition()
        })()
    }, [])

    const getUserPosition = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync()

        try {
            if (status !== 'granted') {
                console.log('Geolocation failed')
                return
            }
            const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
            setLocation({...location, 'latitude': position.coords.latitude, 'longitude': position.coords.longitude})
        } catch (error) {
            console.log(error)
        }
    }

    const showMarker = (e) => {
        const coordinates = e.nativeEvent.coordinate
        const newItem = {
            id: uuid.v4(),
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
        }
        setMarkers([...markers, newItem])
    }

    return (
        <MapView
            style={styles.map}
            region={location}
            onLongPress={showMarker}
        >
            {markers.map(marker => (
                    <Marker key={marker.id} coordinate={{latitude: marker.latitude, longitude: marker.longitude}} />
                ))
            }
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%'
    }
})
