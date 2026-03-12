import {View, Text, Button, StyleSheet, TextInput, Pressable,Image,ScrollView,SafeAreaView } from 'react-native'

export default function LoginScreen({navigation}){
    return(
        <SafeAreaView>
            <View style={styles.topbar}>
                <Text style= {styles.barText}>Iniciar sesion</Text>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <View style={{justifyContent: 'center',alignItems:'center', flex:1}}>
                        <Image source={require('../assets/applogo.png')} style={styles.img}/>
                    </View>
                    
                    <Text style={styles.text}>Ingresa tu usuario</Text>
                    <TextInput placeholder='nombre de usuario' placeholderTextColor='#7e7a7a' style ={styles.inputField}/>
                    <Text style={styles.text}>Ingresa tu contraseña</Text>
                    <TextInput placeholder='Contraseña'  placeholderTextColor='#7e7a7a' secureTextEntry={true} style ={styles.inputField}/>

                    <Pressable onPress={()=>navigation.navigate("Home") } 
                    style={({ pressed }) => [
                    styles.buttonPri,
                    pressed && styles.buttonPriressed
                    ]}>
                        <Text style={styles.buttonText}>Ingresar</Text>
                    </Pressable>
                    
                    <Pressable onPress={()=>navigation.navigate("Register") } 
                    style={({ pressed }) => [
                    styles.buttonSec,
                    pressed && styles.buttonSecPressed
                    ]}>
                        <Text style={styles.buttonText}>Registrarme</Text>
                    </Pressable >
                    
                    <View 
                        style={{
                            marginTop:5,
                            marginBottom:5,
                            borderBottomColor: '#757575',
                            borderBottomWidth: 1,
                        }}
                    />
                    <Pressable onPress={()=>navigation.navigate("Profile") }>
                        <Text style ={[styles.text, {justifyContent:'center',alignItems:'center',textAlign:'center',fontWeight:'bold',fontSize:18}]}>Olvide mi contraseña</Text>
                    </Pressable>
                    
                </View>
            </ScrollView>
        </SafeAreaView>
        
        
        
    );
}

const styles = StyleSheet.create({
    buttonPri:{
        backgroundColor: '#34994F',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop:10
    },

    img:{
        width:200,
        height:200,
    },

    inputField:{
        borderWidth:1,
        fontFamily: 'Arial',
        fontWeight: 'medium',
        borderColor: '#c4c4c4',
        borderRadius: 5,
        height:30,
        fontSize:15,
        padding:5,
    },

    buttonSec:{
        backgroundColor: '#39C3B7',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop:10
    },

    buttonPriressed:{
        backgroundColor: '#26793c',
    },

    buttonSecPressed:{
        backgroundColor: '#2b9b91',
    },

    buttonText:{
        fontFamily: 'Arial',
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },

    container: {
        padding: 20,
        gap: 10
    },

    topbar: {
        height: 70,
        backgroundColor: '#37CDD8',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    
    text:{
        fontFamily: 'Arial',
        fontSize: 15,
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    barText:{
        fontFamily: 'Arial',
        fontSize: 25,
        color: '#fff',
        textAlign: 'center'
    }
})