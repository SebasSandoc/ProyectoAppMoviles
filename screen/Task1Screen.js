import {View, Text, StyleSheet,ScrollView,Pressable, Image, ActivityIndicator} from 'react-native'
import { useFonts,Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';
import {prioridades} from '../data/prioridades';
import { materias as localMaterias} from '../data/materias';
import { tareas } from '../data/tareas';
import { useEffect, useState } from 'react';
import { obtenerMaterias } from '../services/materiaService';
import { marcarFinalizada } from '../services/tareaService';


export default function Task1creen({route,navigation}){

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Inter_300Light
    })

    const [loading,setLoading] = useState(true)
    const [materias,setMaterias] = useState([])

    const {tarea} = route.params;

    const fechaTarea = new Date(tarea.fechaMax)
    const hoy = new Date();

    const diferencia = fechaTarea.getTime() - hoy.getTime();
    const dias =  Math.floor(diferencia / (1000 * 60 * 60 * 24));

    const fecha = new Date(tarea.fechaMax)

    const fechaFormato = fecha.
        toLocaleString("es-ES", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
             timeZone: "UTC"
        });


    const prioridadColor = {
    Baja: "#2ecc71",
    Media: "#f1c40f",
    Alta: "#e74c3c"
    };

    const prioridadColorBorde = {
    Baja: "#18924b",
    Media: "#af9012",
    Alta: "#992d21"
    };

    const color = prioridadColor[tarea.prioridad] || "#999"
    const headerColor = !tarea.finalizada ? prioridadColor[tarea.prioridad] : '#37CDD8'

    const colorborde = prioridadColorBorde[tarea.prioridad] || "#999"

    const marcarComoHecha = async() =>{
        const marcada = await marcarFinalizada(tarea);

        if (marcada) {
            console.log("marcada")
            navigation.navigate("ConfirmTask")
        }
    }

    const cargar = async () => {
        setLoading(true);
        const data = await obtenerMaterias();
        setMaterias(data || localMaterias);
        setLoading(false);
    };
        
    useEffect(() => {
        cargar();
    }, []);
      
    if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

    return(
        <View style={styles.container}> 
            <View style={[styles.topbar,{backgroundColor:headerColor}]}>
                <Text style={styles.barText}>{tarea.nombre}</Text>
                <Pressable onPress={()=> navigation.goBack()}>
                    <Image source={require('../assets/Close.png')} style={{width:65,height:65, tintColor:'#fff', marginLeft:5}}/>
                </Pressable>
            </View>
            <ScrollView>
                <View style={{height:70}}/>
                
                <View style={styles.content}>
                    <Text style={styles.textLarge}>Fecha limite:</Text>
                    <Text style={styles.textMedium}>{fechaFormato}</Text>
                    <Text style={styles.textLarge}>Materia(s):</Text>
                    <View style={[styles.materiasContainer]}>
                        {tarea.materias.map((id) =>{
                            const materia = materias.find(
                                (m) => m.id === id
                            );

                            if(!materia) return null;

                            return(
                                <View
                                    key={id}
                                    style={[styles.subjectContainer, {backgroundColor:materia.color}]}
                                >
                                    <Text style={styles.subjectText}>
                                        {materia.nombre}
                                    </Text>
                                </View>
                            )
                        })}
                    </View>
                    <Text style={styles.textLarge}>Prioridad:</Text>
                    <View style={[styles.priorityContainer, {backgroundColor:color, borderColor:colorborde}]}>
                        <Text style={styles.subjectText}>{tarea.prioridad}</Text>
                    </View>
                    <Text style={styles.textLarge}>Notas:</Text>
                    <View style={styles.NotesContainer}>
                        <Text style={styles.textsmall}>{tarea.notas}</Text>
                    </View>
                    
                    {!tarea.finalizada &&(
                        <View>
                            <Text style={{
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                                textAlign: 'center'
                            }}>{
                                dias > 0
                                ? `Faltan ${dias} días para la tarea`
                                : dias < 0
                                ? `Han pasado ${Math.abs(dias)} días desde la fecha limite`
                                : "La entrega de la tarea es hoy"
                            }</Text>
                            <View 
                                style={{
                                    marginTop:20,
                                    marginBottom:20,
                                    borderBottomColor: '#757575',
                                    borderBottomWidth: 1,

                                }}
                            />
                            <View style={{flexDirection:'row',}} >
                                <Pressable onPress={marcarComoHecha} style={[styles.ButtonPrimary,{marginRight:5}]}>
                                    <Text style={styles.ButtonText}>Marcar como hecha</Text>
                                </Pressable>
                                <Pressable onPress={()=> navigation.navigate("Modify", {tarea})} style={[styles.ButtonSecondary,{marginLeft:5}]}>
                                    <Text style={styles.ButtonText}>Modificar Tarea</Text>
                                </Pressable>
                            </View>
                        </View>       
                    )}
                    <Pressable onPress={()=> navigation.navigate("DeleteTask", {tarea})}>
                            <Text style={styles.ButtonDelete}>Eliminar tarea</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#e2e2e2', 
    },

    materiasContainer:{
        flexDirection:"row",
        gap:5
    },
    
    topbar: {
        zIndex: 1,
        top:0,
        position: 'absolute',
        alignItems:'stretch',
        width:'100%',
        height: 70,
        backgroundColor: '#8DDBA5',    
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
        backgroundColor: '#3575CA',
        borderRadius: 15,
        padding: 5,
        paddingHorizontal: 10,
        alignSelf: 'flex-start'
    },

    priorityContainer:{
        backgroundColor: '#46C37E',
        borderWidth: 2,
        borderColor: '#11743E',
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
        height: 300
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
        backgroundColor: '#C55B5D',
        padding:20,
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: '#fff',
        borderRadius: 8,
        textAlign:'center'
    },
    
});