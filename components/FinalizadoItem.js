import React from "react";
import { View, Text, Button, Image, StyleSheet, Pressable } from 'react-native'
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';

//Componente para mostrar tareas finalizadas en el dashboard

export default function FinalizadoItem({ tarea, onVer }) {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_300Light,
  });

  return (
    <Pressable onPress={onVer}>
    <View style={styles.finished}>
      <Image
        source={require("../assets/check.png")}
        style={{ width: 50, height: 50, tintColor: "#00e013" }}
      />
      <Text style={[styles.text, { fontSize: 20, marginLeft: 5 }]}>{tarea.nombre}</Text>
    </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  finished: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,

    height: 60,
    marginTop: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#919191",
    backgroundColor: "#eee",
  },

  text: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
  },
});
