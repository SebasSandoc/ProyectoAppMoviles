import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Image, ActivityIndicator, Modal } from 'react-native';
import { useFonts,Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';
import { useContext, useState, useEffect } from 'react';
import { crearUsuario, obtenerUsuarios } from '../services/usuarioService';

//pantalla de registro de nuevo usuario

export default function RegisterScreen({navigation}){

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_300Light
  })

  //mensaje de error a mostrar
  const [errorMsg,setErrorMsg] = useState("")

  //datos ingresados por el usuario
  const [usuarios,setUsuarios] = useState([]);
  const [nombre,setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [confirmar, setConfirmar] = useState("");

  //constante de carga
  const[loading,setLoading] = useState(true);
  //control de visibilidad de popup de error
  const[notiVisible,setNotiVisible] =useState(false);

  //verificar si hay datos vacios
  const verificar = () => {
    if (nombre == "") return false
    if (correo == "") return false
    if (contrasenia == "") return false
    if (confirmar == "") return false

    return true
  }

  //crear nuevo usuario
  const guardar = async () => {

    if (!verificar()){
      setErrorMsg("Todos los campos deben ser llenados.")
      setNotiVisible(true)
      return
    }

    if (contrasenia != confirmar) {
      console.log("Contraseñas no coiniciden")
      setErrorMsg("las contraseñas ingresadas no coinciden")
      setNotiVisible(true)
      return
    }

    const nuevo = {
      nombre,
      correo,
      contrasenia
    }

    const yaRegistrado = usuarios.some(
      (item)=>item.correo.toLowerCase() === correo.toLowerCase()
    );

    if(yaRegistrado) {
      setErrorMsg("Correo ya registrado")
      setNotiVisible(true)
      return
    }

    let status 

    status = await crearUsuario(nuevo)

    if (status) {
      navigation.navigate("ConfirmRegister")
    }
  }

  //carga de datos
  const cargar = async () => {
      setLoading(true);
      const data = await obtenerUsuarios();
      setUsuarios(data || null);
      setLoading(false);
  };
  
  //estado de carga
    useEffect(() => {
        cargar();
    }, []);
  
  //esperar a que finalice la carga
  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

    return(
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.barText}>Registrar</Text>
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../assets/applogo.png')} style={styles.img} />
        </View>

        <Text style={styles.textLarge}>Nombre:</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Usuario"
          placeholderTextColor="#7e7a7a"
          onChangeText={setNombre}
        />

        <Text style={styles.textLarge}>Correo electronico:</Text>
        <TextInput
          style={styles.inputField}
          placeholder="correoelectronico@dominio.com"
          placeholderTextColor="#7e7a7a"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setCorreo}
        />

        <Text style={styles.textLarge}>Contraseña:</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Contraseña"
          placeholderTextColor="#7e7a7a"
          secureTextEntry
          onChangeText={setContrasenia}
        />

        <Text style={styles.textLarge}>Confirma contraseña:</Text>
        <TextInput
          style={[styles.inputField]}
          placeholder="Confirma tu contraseña"
          placeholderTextColor="#7e7a7a"
          secureTextEntry
          onChangeText={setConfirmar}
        />



        <Pressable
          onPress={guardar}
          style={({ pressed }) => [styles.buttonPri, pressed && { backgroundColor: '#26793c' }]}
        >
          <Text style={styles.ButtonText}>Registrarme</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Login')}
          style={({ pressed }) => [styles.buttonOut, {padding:10},  pressed && { backgroundColor: '#eee' }]}
        >
          <Text style={[styles.ButtonText, {color:'#000'}]}>Cancelar</Text>
        </Pressable>
      </ScrollView>

      <Modal transparent={true} visible={notiVisible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <View style={[styles.modalTopbar, {width:'100%'}]}>
              <Text style={[styles.barText]}>Error</Text>
            </View>

            <View style={{padding:20, gap:10}}>
              <Text style={styles.textMedium}>{errorMsg}</Text>
            </View>      
            <Pressable onPress={()=>setNotiVisible(false)} style={[styles.buttonPri,{margin:20}]}>
                <Text style={[styles.ButtonText]}>Cerrar</Text>
              </Pressable>    
          </View>
        </View>
      </Modal>
    </View> 

    );
}

const styles = StyleSheet.create({

  buttonOut: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#0f5337',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#fff',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  popup: {
    backgroundColor: 'white',
    borderRadius: 5,
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
  modalTopbar: {
    zIndex: 1,
    top:0,
    alignItems:'stretch',
    width:'100%',
    height: 70,
    backgroundColor: '#37CDD8',        
    alignItems:'center',
    flexDirection:'row',
    padding:20, 
    justifyContent:'space-between'
  },

  container: {
    flex: 1,
    backgroundColor: '#e2e2e2',
  },
  topbar: {
    height: 70,
    backgroundColor: '#37CDD8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
  },
  form: {
    padding: 20,
    gap: 8,
    paddingBottom: 40,
  },
  img: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  label: {
    fontFamily: 'Inter_300Light',
    fontSize: 15,
    marginTop: 4,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 5,
    height: 35,
    fontSize: 18,
    padding: 5,
    backgroundColor: '#fff',
    fontFamily: 'Inter_400Regular',
  },
  errorText: {
    color: '#E74C3C',
    fontFamily: 'Arial',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
  },
  buttonPri: {
    backgroundColor: '#34994F',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
  },

  ButtonText:{
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    color: '#fff',
  },
  buttonOutText: { color: '#555', fontSize: 16, fontFamily: 'Inter_500Medium' },
});