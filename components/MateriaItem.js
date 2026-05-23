import React from "react";
import { View, Text, Button, Image, StyleSheet, Pressable } from 'react-native'
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';

export default function MateriaItem({ materia }) {
const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Inter_300Light
    })

    return (
        <View style={[styles.subjectContainer,{backgroundColor:materia.color}]}>           
            <Text style={styles.subjectText}>{materia.nombre}</Text>
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

    subjectText:{
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: '#fff'
    },

    subjectContainer:{
        backgroundColor: '#af2b2b',
        borderRadius: 15,
        padding: 5,
        paddingHorizontal: 10,
        alignSelf: 'flex-start'
    },

})