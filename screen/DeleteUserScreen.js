import {StyleSheet, Text, View, ScrollView, Image, SafeAreaView, Pressable, FlatList} from 'react-native'
import { useFonts,Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { eliminarUsuarioAPI } from '../services/usuarioService';

export default function DeleteUserScreen({navigation}){

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Inter_300Light
    })

    const {usuario} = useContext(AuthContext);
    const { logout } = useContext(AuthContext);

    const eliminar = async  () => {
        let eliminado

        eliminado = await eliminarUsuarioAPI(usuario.id);
        console.log(eliminado)
                
        if (eliminado) {
            console.log("creada correctamente")
            //navigation.navigate("ConfirmTask")
            logout()
        }

    }

 
    return(
    <View style={styles.container}>
        <Text style={styles.text}>¿Esta seguro de eliminar su perdir? esta accion no se puede deshacer</Text>

        <Pressable onPress={eliminar} style={styles.ButtonPrimary}>
            <Text style={styles.textButton}>ELIMINAR</Text>
        </Pressable>
        <Pressable onPress={()=> navigation.goBack()} style={styles.ButtonPrimary}>
            <Text style={styles.textButton}>Cancelar</Text>
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