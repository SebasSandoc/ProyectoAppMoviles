import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Image } from 'react-native';
import { useFonts,Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';





export default function RegisterScreen({navigation}){

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_300Light
  })


    return(
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.barText}>Registrar</Text>
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../assets/applogo.png')} style={styles.img} />
        </View>

        <Text style={styles.label}>Nombre de usuario:</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Usuario"
          placeholderTextColor="#7e7a7a"
          
        />

        <Text style={styles.label}>Correo electronico:</Text>
        <TextInput
          style={styles.inputField}
          placeholder="correoelectronico@dominio.com"
          placeholderTextColor="#7e7a7a"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Contraseña"
          placeholderTextColor="#7e7a7a"
          secureTextEntry
        />

        <Text style={styles.label}>Confirma contraseña:</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Confirma tu contraseña"
          placeholderTextColor="#7e7a7a"
          secureTextEntry
        />



        <Pressable
          onPress={()=>navigation.navigate("Home") }
          style={({ pressed }) => [styles.buttonPri, pressed && { backgroundColor: '#26793c' }]}
        >
          <Text style={styles.buttonText}>Registrarme</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Login')}
          style={({ pressed }) => [styles.buttonOut, pressed && { backgroundColor: '#eee' }]}
        >
          <Text style={styles.buttonOutText}>Cancelar</Text>
        </Pressable>
      </ScrollView>
    </View>
    );
}

const styles = StyleSheet.create({
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
    fontSize: 15,
    padding: 5,
    backgroundColor: '#fff',
    fontFamily: 'Inter_300Light',
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
  buttonOut: {
    borderWidth: 1,
    borderColor: '#c4c4c4',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonText:    { color: '#fff', fontSize: 16, fontWeight: 'bold', fontFamily: 'Inter_500Medium' },
  buttonOutText: { color: '#555', fontSize: 16, fontFamily: 'Inter_500Medium' },
});