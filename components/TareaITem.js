import React from "react";
import { View, Text, Button, Image, StyleSheet } from 'react-native'
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';

export default function HomeScreen({ navigation }) {

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Inter_300Light
    })
}

export default function TareaItem({ tarea, onVer }) {
    return (
        <View style={styles.list}>
            <Text style={styles.nameText}>{tarea.nombre}</Text>
            <Text style={styles.text}>{tarea.fecha}</Text>
            <Image source={require('../assets/Circle.png')} style={{width:20, height:20, tintColor:'#BEEAB3'}}/>
            <Image source={require('../assets/Chevron.png')} style={{width:10, height:20, tintColor:'lightGray'}}/>
        </View>
    )
}

const styles = StyleSheet.create({

    list: {
        alignItems: 'flex-start',
        alignContent: 'stretch',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#eee'
    },
    nameText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 15,
    },
    text: {
        fontFamily: 'Inter_400Regular',
        fontSize: 15,
        color: '#3f3c3c'
    },

})