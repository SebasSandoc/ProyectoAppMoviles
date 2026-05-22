import {View, Text, StyleSheet,ScrollView,Pressable,TextInput, Image} from 'react-native'
import { useFonts,Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';
import { TareaContext } from '../context/TareaContext';
import { useContext, useState } from 'react';
import { materias } from '../data/materias';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../context/AuthContext';
import { eliminarTareaAPI } from '../services/tareaService';



export default function UpdateProfileScreen({route,navigation}){

    const {usuario} = useContext(AuthContext);

    console.log(usuario)

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Inter_300Light
    })

    //const {agregarTarea} = useContext(TareaContext)

    const [nombre, setNombre] = useState(usuario.nombre || "");
    const [correo, setCorreo] = useState(usuario.correo || "");
    const [contrasenia, setContransenia] = useState("");
    const [newContrasenia, setNewContransenia] = useState("");
    const [confirmar, setConfirmar] = useState("");
  


    const guardar = async () => {

        

        let modificada 

        if (contrasenia !=  usuario.contrasenia){
            console.log("Contraseñas no coinciden")
            return
        }
        
        let contraseniaFinal = contrasenia

        if (newContrasenia!=""){
            if(newContrasenia != confirmar){
                return;
            }

            contraseniaFinal = newContrasenia;
        }

        const nuevo = {
            nombre,
            correo,
            contrasenia: newContrasenia,
        }

         modificada = await eliminarTareaAPI(usuario.id,nuevo);

        if (modificada){
            console.log("creada correctamente")
            navigation.navigate("ConfirmTask")
        }
    }

    

    return(
        <View style={styles.container}>
            <View style={styles.topbar}>
                <Text style={styles.barText}>Actualizar perfil</Text>
                 <Image source={require('../assets/Close.png')} style={{width:65,height:65, tintColor:'#fff', marginLeft:5}}/>
            </View>
                <View style={{height:70}}/>
                    <View style={styles.content}>
                        <Text style={styles.textLarge}>Nombre de usuario:</Text>
                        <TextInput placeholder='Nombre de usuario' placeholderTextColor='#7e7a7a' style ={styles.inputField}
                            value={nombre}
                            onChangeText={setNombre}
                        />
                        <Text style={styles.textLarge}>Correo:</Text>
                        <TextInput placeholder='Correo electronico' placeholderTextColor='#7e7a7a' style ={styles.inputField}
                            value={correo}
                            onChangeText={setCorreo}
                        />

                        <Text style={styles.textLarge}>Contraseña anterior:</Text>
                        <TextInput secureTextEntry={true} placeholder='Correo electronico' placeholderTextColor='#7e7a7a' style ={styles.inputField}
                            onChangeText={setContransenia}
                        />

                        <Text style={styles.textLarge}>Nueva contraseña:</Text>
                        <TextInput secureTextEntry={true} placeholder='Correo electronico' placeholderTextColor='#7e7a7a' style ={styles.inputField}
                            onChangeText={setNewContransenia}
                            SecureTextEntry={true}
                        />

                        <Text style={styles.textLarge}> Confirmar nueva contraseña:</Text>
                        <TextInput secureTextEntry={true} placeholder='Correo electronico' placeholderTextColor='#7e7a7a' style ={styles.inputField}
                            onChangeText={setConfirmar}                      
                        />

                        <Pressable onPress={guardar}>
                            <Text style={styles.ButtonDelete}>Actualizar usuario</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate("DeleteUser")}>
                            <Text style={styles.ButtonDelete}>ELIMINAR USUARIO</Text>
                        </Pressable>
                </View>
        </View>       
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#e2e2e2', 
    },

    topbar: {
        zIndex: 1,
        top:0,
        position: 'absolute',
        alignItems:'stretch',
        width:'100%',
        height: 70,
        backgroundColor: '#37CDD8',        
        alignItems:'center',
        flexDirection:'row',
        padding:20, 
        justifyContent:'space-between'
        },
    barText:{
        fontFamily: 'Inter_400Regular',
        fontSize: 25,
        color: '#fff',
          
    },

    textLarge:{
        fontFamily: 'Inter_700Bold',
        fontSize: 25,
    },

    textMedium:{
        fontFamily: 'Inter_400Regular',
        fontSize: 20,
    },

    textsmall:{
        fontFamily: 'Inter_300Light',
        fontSize: 18,
    },

    content:{
        padding:20,
        gap:20
    },

    subjectText:{
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: '#fff'
    },

    subjectContainer:{
        backgroundColor: '#C7318B',
        borderRadius: 15,
        padding: 5,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
        flexDirection:'row',
    },

    priorityContainer:{
        backgroundColor: '#a4aaa7',
        borderWidth: 2,
        borderColor: '#6a8074',
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 50,
        alignSelf: 'flex-start'
    },

    NotesContainer:{
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#c2c2c2',
        borderRadius: 5,
        padding: 10,
        height: 300,
        textAlignVertical: 'top',
        fontFamily:'Inter_300Light',
        fontSize:16
    },

    ButtonPrimary:{
        flex: 1,
        backgroundColor: '#34994F',
        padding:20,
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        
        borderRadius: 8,
        alignItems:'center'
    },

    ButtonSecondary:{
        flex: 1,
        backgroundColor: '#39C3B7',
        padding:20,
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        
        borderRadius: 8,
        alignItems:'center'
    },

    ButtonText:{
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: '#fff',
    },

    ButtonDelete:{
        backgroundColor: '#34994F',
        padding:20,
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: '#fff',
        borderRadius: 8,
        textAlign:'center'
    },

    inputField:{
        flex: 1,
        borderWidth:1,
        fontFamily: 'Arial',
        fontWeight: 'medium',
        borderColor: '#c4c4c4',
        backgroundColor: '#fff',
        borderRadius: 5,
        flexDirection:'row',
        fontSize:20,
        padding:5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
});