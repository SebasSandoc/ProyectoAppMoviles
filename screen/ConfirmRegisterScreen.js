import {StyleSheet, Text, View, ScrollView, Image, SafeAreaView, Pressable, FlatList} from 'react-native'
import { useFonts,Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';

//pantalla confirmacion de registro de usuario

export default function ConfirmRegisterScreen({route,navigation}){

    const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_300Light
  })

  //resultado del registro de la pagina de registro anterior
  const passed = true

  //elementos visuales
  return(
    <View style={styles.container}>
        {passed ? (
            <Text style={styles.text}>Usuario Registrado</Text>
        ):(
            <Text>Error al guardar usuario</Text>
        )}

        <Pressable onPress={()=>navigation.navigate("Login")} style={styles.ButtonPrimary}>
            <Text style={styles.textButton}>Volver al inicio</Text>
        </Pressable>
    </View>
  )

}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    textButton:{
        fontFamily:'Inter_500Medium',
        fontSize:20,
        textAlign:"center",
        color:'#fff'
    },

    text:{
        fontFamily:'Inter_700Bold',
        fontSize:40,
        textAlign:"center"
    },
    ButtonPrimary:{
        
        backgroundColor: '#34994F',
        padding:20,
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        marginTop: 10,
        borderRadius: 8,
        alignItems:'center'
    },
})