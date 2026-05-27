import {StyleSheet, Text, View, ScrollView, Image, SafeAreaView, Pressable, FlatList} from 'react-native'
import { useFonts,Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';
import { eliminarTareaAPI } from '../services/tareaService';

//pantalla para que el usuario confirme si desea borrar una tarea

export default function DeleteTaskScreen({route,navigation}){

    //recibe la tarea a eliminar pasada por la pagina anterior
    const tarea = route.params?.tarea
    console.log(tarea)

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Inter_300Light
    })

 //elementos visuales
  return(
    <View style={styles.container}>
        <Text style={styles.text}>¿Esta seguro de eliminar esta tarea? esta accion no se puede deshacer</Text>

        <Pressable onPress={
            async () => {
                let eliminado

                eliminado = await eliminarTareaAPI(tarea.id);
                console.log(eliminado)
                
                if (eliminado) {
                    console.log("creada correctamente")
                    navigation.navigate("ConfirmTask")
                }
            }
        } style={styles.ButtonPrimary}>
            <Text style={styles.textButton}>ELIMINAR</Text>
        </Pressable>
        <Pressable onPress={()=> navigation.goBack()} style={styles.buttonSec}>
            <Text style={styles.textButton}>Cancelar</Text>
        </Pressable>
    </View>
  )

}

const styles = StyleSheet.create({

    buttonSec: {
        fontFamily: 'Inter_400Regular',
        backgroundColor: '#39C3B7',
        height: 45,
        padding:20,
        paddingTop:30,
        paddingBottom:30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },    
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        gap:10
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
        
        backgroundColor: '#993434',
        padding:20,
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        marginTop: 10,
        borderRadius: 8,
        alignItems:'center'
    },
})