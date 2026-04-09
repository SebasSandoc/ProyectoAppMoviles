import {View, Text, StyleSheet,ScrollView,Pressable,TextInput, Image} from 'react-native'
import { useFonts,Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';
import { TareaContext } from '../context/TareaContext';
import { useContext, useState } from 'react';
import { materias } from '../data/materias';
import { Picker } from '@react-native-picker/picker';



export default function NewTaskScreen({navigation}){

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Inter_300Light
    })

    const {agregarTarea} = useContext(TareaContext)

    const [nombre, setNombre] = useState("");
    const [fecha, setFecha] = useState("");
    const [notas, setNotas] = useState("");
    const [prioridad, setPrioridad] = useState("Baja");
    const [materia, setMateria] = useState("")

    const guardarTarea = () => {
        try {
            const fechaConv = `${fecha}T00:00:00`;

        const nuevaTarea = {
            id: Date.now(),
            nombre: nombre,
            prioridad: prioridad,
            materias: [materia],
            fechaMax: fechaConv,
            notas: notas,
            finalizada: false
        };

        agregarTarea(nuevaTarea)

        navigation.navigate("ConfirmTask",{passed:true});
        }catch (Error) {
            navigation.navigate("ConfirmTask",{passed:false});
        }
    }   

    return(
        <View style={styles.container}>
            <View style={styles.topbar}>
                <Text style={styles.barText}>Nueva tarea</Text>
                 <Image source={require('../assets/Close.png')} style={{width:65,height:65, tintColor:'#fff', marginLeft:5}}/>
            </View>
            <ScrollView>
                <View style={{height:70}}/>
                <View style={styles.content}>
                    <Text style={styles.textLarge}>Nombre de la tarea:</Text>
                    <TextInput placeholder='Nombre de tarea' placeholderTextColor='#7e7a7a' style ={styles.inputField}
                        value={nombre}
                        onChangeText={setNombre}
                    />
                    <Text style={styles.textLarge}>Materia(s):</Text>
                    
             <View >
            <Picker style={styles.inputField}
              selectedValue={materia}
              onValueChange={(itemValue) => setMateria(itemValue)}
            >
              <Picker.Item label="Seleccionar materia..." value="" />

              {materias.map((materia) => (
                <Picker.Item
                  key={materia.id}
                  label={materia.nombre}
                  value={materia.nombre}
                />
              ))}
            </Picker>
          </View>

                    
                    <View style={styles.subjectContainer}>
                    <Text style={styles.subjectText}>Estadistica</Text>
                    <Text style={[styles.textMedium,{fontFamily:'Inter_700Bold',marginLeft:5,color:'#fff'}]}>X</Text>
                    </View>
                    <Text style={styles.textLarge}>Fecha limite:</Text>
                    

                    <TextInput placeholder='AAAA-MM-DD' placeholderTextColor='#7e7a7a' style ={styles.inputField}
                        value={fecha}
                        onChangeText={setFecha}
                    />


                    <Text style={styles.textLarge}>Prioridad:</Text>
                    <View style={{flexDirection:'Row', justifyContent:'space-between'}}>

                        <Pressable
                            onPress={()=> setPrioridad("Baja")}
                            style={[
                                styles.priorityContainer,
                                prioridad === "Baja" && {backgroundColor: '#A8E6A1', borderWidth:2,borderColor:'#639b5d'}
                            ]}
                        >
                            <Text style={styles.subjectText}>Baja</Text>
                        </Pressable>

                        <Pressable
                            onPress={()=> setPrioridad("Media")}
                            style={[
                                styles.priorityContainer,
                                prioridad === "Media" && {backgroundColor: '#EEF0A8', borderWidth:2, borderBlockColor:'#999b5d'}
                            ]}
                        >
                            <Text style={styles.subjectText}>Media</Text>
                        </Pressable>

                        <Pressable
                            onPress={()=> setPrioridad("Alta")}
                            style={[
                                styles.priorityContainer,
                                prioridad === "Alta" && {backgroundColor: '#F69191', borderWidth:2,borderColor:'#aa5959'}
                            ]}
                        >
                            <Text style={styles.subjectText}>Alta</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.textLarge}>Notas (opcional):</Text>
                    
                    <TextInput placeholder='' placeholderTextColor='#7e7a7a' style ={styles.NotesContainer} multiline
                        value={notas}
                        onChangeText={setNotas}
                    />

                    <Pressable onPress={guardarTarea}>
                            <Text style={styles.ButtonDelete}>Crear tarea</Text>
                    </Pressable>

                    

                </View>
            </ScrollView>
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