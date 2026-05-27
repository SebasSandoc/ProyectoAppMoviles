import {Modal, View, Text, StyleSheet,ScrollView,Pressable,TextInput, Image, ActivityIndicator, Touchable, TouchableOpacity} from 'react-native'
import { useFonts,Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';
import { TareaContext } from '../context/TareaContext';
import { useContext, useState, useEffect } from 'react';
import { materias as localMaterias, materias} from '../data/materias';
import { Picker } from '@react-native-picker/picker';
import { actualizarTarea, crearTarea } from '../services/tareaService';
import { obtenerMaterias } from '../services/materiaService';

import { Calendar } from "react-native-calendars";

//ventana para crear nueva tarea

export default function NewTaskScreen({route,navigation}){

    //sin uso
    const tarea = route.params?.tarea

    //constante de materias obtenidas de firebase
    const [materias,setMaterias] = useState([])
    //constante de control de carga
    const[loading,setLoading] = useState(true);


    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Inter_300Light
    })

    
    //constante de datos ingresado por el usuario
    const [nombre, setNombre] = useState( "");
    const [fechaMax, setFechaMax] = useState("");
    const [notas, setNotas] = useState("");
    const [prioridad, setPrioridad] = useState( "");
    const [materiaSel, setMateriaSel] = useState("");
    const [finalizada, setFinalizada] = useState(false)
    const [hora,setHora] = useState("")
    const [minuto,setMinuto] = useState("")
    const [materiaArray,setMateriaArray] =useState([]);

    //constante de control de visibilidad de popup de calendario
    const [calendarioVisible, setCalendarioVisible] = useState(false)
    //constante de control de visibilidad de popup de alerta
    const [notiVisible, setNotiVisible] = useState(false)
    //formato de fecha
    const [fecha, setFecha] = useState(null)

    //texto de mensaje de error
    const [errorMsg, setErrorMsg] = useState("")

    //fecha de error
    const hoy = new Date().toISOString().split("T")[0]

    //agregar nueva materia seleccionada del dropdown
    const agregarMateria = (materiaId) =>{

        const id = Number(materiaId);

        if (materiaId== 0)  {return}

        setMateriaSel(id);

        if(materiaArray.includes(id)){
            return;
        }

        setMateriaArray([...materiaArray,id]);
    };

    //eliminar materia de la lista selecionada del dropdown
    const eliminarMateria = (id) => {
        
        setMateriaArray(
            materiaArray.filter((m) => m!== id)
        );

    }

    //verificar campos vacios
    const verificar = () => {

        console.log(nombre)

        if (nombre == ""){
             console.log("nombre vacio")
            return false
        }

        if (fecha == ""){
            console.log("fecha vacio")
            return false
        }

        if (prioridad == ""){
            console.log("prioridad vacio")
            return false
        }

        if (materiaSel == ""){
            console.log("materiaSel vacio")
            return false
        }

        if (hora == ""){
            console.log("nombre vacio")
            return false
        }

        if (minuto == ""){
            return false
        }

        return true
    }

    //crear nueva materia
    const guardar = async () => {

        console.log(materiaArray)
        console.log(JSON.stringify(materiaArray))

        if(!verificar()){
            setNotiVisible(true)
            setErrorMsg("No pueden existir campos vacios")
            console.log("Algun campo esta vacio")
            return
        }

        const fechaFormateada = `${fecha}T${hora}:${minuto}:59Z`;

        console.log(fechaFormateada)

        const nuevo = {
            nombre,
            prioridad,
            materias: [materiaArray],
            fechaMax: fechaFormateada,
            notas,
            finalizada
        }

        let resultado

        resultado =  await crearTarea(nuevo);

        if (resultado) {
            console.log("creada correctamente")
            navigation.navigate("ConfirmTask")
        }
    }

    //carga de datos de firebase
    const cargar = async () => {
        setLoading(true);
        const data = await obtenerMaterias();
        setMaterias(data || localMaterias);
        setLoading(false);
    };
    
    //control de carga
    useEffect(() => {
        cargar();
    }, []);
  
    //esperar que la carga finalice
  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

    return(
    <View style={styles.container}>
        <View style={styles.topbar}>
            <Text style={styles.barText}>Nueva tarea</Text>
            <Pressable onPress={()=> navigation.goBack()}>
                <Image source={require('../assets/Close.png')} style={{width:65,height:65, tintColor:'#fff', marginLeft:5}}/>
            </Pressable>        
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
                <View>
                    <Picker
                    style={styles.inputField}
                    selectedValue={materiaSel}
                    onValueChange={(itemValue) => agregarMateria(itemValue)}
                    >
                        <Picker.Item label="Seleccionar materia..." value="" />
                            {materias.map((materia) => (
                        <Picker.Item
                            key={materia.id}
                            label={materia.nombre}
                            value={materia.id}
                        />
                        ))}
                    </Picker>

                    <View style={[styles.materiasContainer]}>
                        {materiaArray.map((id) => {
                            const materia = materias.find(
                                (m) => m.id === id
                            )

                            if(!materia) return null;

                            return(
                                <TouchableOpacity
                                    key={id}
                                    style={[styles.subjectContainer, {backgroundColor:materia.color}]}
                                    onPress={()=> eliminarMateria(id)}
                                >
                                    <Text style={styles.subjectText}>{materia.nombre} X</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
       
                <Text style={styles.textLarge}>Fecha limite:</Text>
                        
                <Pressable 
                    onPress={() =>setCalendarioVisible(true)}
                    style={{
                    padding:10,
                    alignItems:"center",
                    borderWidth:2,
                    width:250,
                    borderRadius:10,
                    flexDirection:"row",
                    gap:10,
                    backgroundColor:'#ffffff',
                    borderColor:'#a3a3a3'
                    }}>
                    <Image source={require('../assets/Calendar.png')} style={{width:30, height:30, tintColor:'#5f6360'}}/>
                    <Text style={styles.textMedium}>Seleccionar fecha</Text>
                </Pressable>
                
                <View style={{flexDirection:"row", gap:20}}>
                    <View>
                        <Text style={styles.textMedium}>Dia:</Text>
                        <Text style={styles.inputField}>{fecha ? `${fecha}` : "Elegir fecha..."}</Text>       
                    </View>
                    <View>
                        <Text style={styles.textMedium}>Horas:</Text>        
                        <TextInput onChangeText={setHora} placeholder='23' placeholderTextColor='#7e7a7a' style ={[styles.inputField, {width:100}]}/>
                    </View>
                    <View>
                        <Text style={styles.textMedium}>Minutos:</Text>        
                        <TextInput onChangeText={setMinuto} placeholder='59' placeholderTextColor='#7e7a7a' style ={[styles.inputField, {width:100}]}/>
                    </View>
                </View>
                

                
                <Text style={styles.textLarge}>Prioridad:</Text>
                <View style={{flexDirection:'Row', justifyContent:'space-between'}}>
                    <Pressable
                        onPress={()=> setPrioridad("Baja")}
                        style={[
                        styles.priorityContainer,
                        prioridad === "Baja" && {backgroundColor: '#A8E6A1', borderWidth:2,borderColor:'#639b5d'}]}
                        >
                        <Text style={styles.subjectText}>Baja</Text>
                    </Pressable>

                    <Pressable
                        onPress={()=> setPrioridad("Media")}
                        style={[styles.priorityContainer,prioridad === "Media" && {backgroundColor: '#EEF0A8', borderWidth:2, borderBlockColor:'#999b5d'}]}>
                        <Text style={styles.subjectText}>Media</Text>
                    </Pressable>

                    <Pressable
                        onPress={()=> setPrioridad("Alta")}
                        style={[styles.priorityContainer,prioridad === "Alta" && {backgroundColor: '#F69191', borderWidth:2,borderColor:'#aa5959'}]}>
                        <Text style={styles.subjectText}>Alta</Text>
                    </Pressable>
                </View>
                <Text style={styles.textLarge}>Notas (opcional):</Text>
                            
                <TextInput placeholder='' placeholderTextColor='#7e7a7a' style ={styles.NotesContainer} multiline
                    value={notas}
                    onChangeText={setNotas}
                />
                <Pressable onPress={guardar}>
                    <Text style={styles.ButtonDelete}>Crear tarea</Text>
                </Pressable>
            </View>
        </ScrollView>

        <Modal
        visible={calendarioVisible}
        transparent={true}
        animationType="fade"
        >
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <Calendar
              minDate={hoy}
              onDayPress={(dia) => {
                setFecha(dia.dateString);
                setCalendarioVisible(false);
              }}
              markedDates={{
                [fecha]: {
                  selected: true,
                  selectedColor: "#4CAF50",
                },
              }}
            />

            <TouchableOpacity onPress={() => setCalendarioVisible(false)}>
              <Text >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

        <Modal transparent={true} visible={notiVisible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <View style={[styles.modalTopbar, {width:'100%'}]}>
              <Text style={[styles.barText]}>Error</Text>
            </View>
            <View style={{padding:20, gap:10}}>
              <Text style={styles.textMedium}>{errorMsg}</Text>
            </View>     
            <Pressable onPress={()=>setNotiVisible(false)} style={[styles.ButtonPrimary,{margin:20}]}>
                <Text style={[styles.ButtonText, {textAlign:'center'}]}>Cerrar</Text>
              </Pressable>    
          </View>
        </View>
      </Modal>
    </View>       
    );
}

const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },

    popup: {
        backgroundColor: 'white',
        borderRadius: 5,
    },

    modalContent: {
        width: "90%",
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
    },

    container:{
        flex:1,
        backgroundColor: '#e2e2e2', 
    },

    materiasContainer:{
        marginTop:20,
        borderWidth:2,
        borderRadius:3,
        padding:10,
        backgroundColor:"#fff",
        flexDirection:"row",
        gap:5
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