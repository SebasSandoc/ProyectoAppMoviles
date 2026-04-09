import React from "react";
import { View, Text, Button, Image, StyleSheet, Pressable } from 'react-native'
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';

export default function TareaItem({ tarea, onVer }) {
const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Inter_300Light
    })

    const prioridadColor = {
    Baja: "#2ecc71",
    Media: "#f1c40f",
    Alta: "#e74c3c"
    };

    const color = prioridadColor[tarea.prioridad] || "#999"

    const fecha = new Date(tarea.fechaMax)

    const fechaFormato = fecha.
        toLocaleString("es-ES", {
            day: "numeric",
            month: "long",
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });

    return (
        <Pressable onPress={onVer}>
        <View style={styles.list}>
            
            <Text style={styles.nameText}>{tarea.nombre}</Text>
            <Text style={styles.text}>{fechaFormato}</Text>
            <Image source={require('../assets/Circle.png')} style={{width:20, height:20, tintColor:color}}/>
            
                <Image source={require('../assets/Chevron.png')} style={{width:10, height:20, tintColor:'lightGray'}}/>
                       
        </View>
        </Pressable> 
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