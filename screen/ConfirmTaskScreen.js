import {StyleSheet, Text, View, ScrollView, Image, SafeAreaView, Pressable, FlatList} from 'react-native'
import { useFonts,Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';

export default function ConfirmTaskScreen({route,navigation}){

    const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_300Light
  })

  const {passed} = route.params

  return(
    <View style={styles.container}>
        {passed ? (
            <Text style={styles.text}>La tarea se guardo correctamente</Text>
        ):(
            <Text>Error al guardar la tarea</Text>
        )}

        <Pressable onPress={()=>navigation.navigate("Home")} style={styles.ButtonPrimary}>
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