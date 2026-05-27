
import { Image,View, Text, StyleSheet, Pressable, ActivityIndicator} from 'react-native';
import { useFonts,Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { tareas as localTareas } from '../data/tareas';
import { useContext, useEffect, useState } from 'react';
import { TareaContext } from '../context/TareaContext';
import { obtenerTareas } from '../services/tareaService';

//pantalla de calendario

//configuracion de idioma
LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
  ],
  monthNamesShort: [
    'Ene','Feb','Mar','Abr','May','Jun',
    'Jul','Ago','Sep','Oct','Nov','Dic'
  ],
  dayNames: [
    'Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'
  ],
  dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
  today: 'Hoy'
};

LocaleConfig.defaultLocale = 'es';

export default function CalendarScreen({navigation}){

    //colores a mostrar por prioridad de las tareas
    const prioridadColor = {
        Baja: "#2ecc71",
        Media: "#f1c40f",
        Alta: "#e74c3c"
    };
    
    //contexto de agenda (fuera de uso al implementar firebase)
    const {agenda} = useContext(TareaContext)

    //tareas obtenidas de firebase
    const [tareas, setTareas] = useState([]);
    //carga de pagina
    const [loading, setLoading] = useState(true);


    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Inter_300Light
    })

    //lista de eventos para mostrar en el calendario
    const events = { }

    //lista de tareas para el calendario  
    const listaTareas =[...tareas]

    //agregar lista de tareas en el calendario
    listaTareas.forEach((tarea) =>{
        const fecha = tarea.fechaMax.split("T")[0];

        if(!events[fecha]) {
            events[fecha] = []
        }

        events[fecha].push(tarea)
    })

    //carga de datos
    const cargar = async () => {
        setLoading(true);
        const data = await obtenerTareas();
        setTareas(data || localTareas);
        setLoading(false);
    };

    //Estado de carga
    useEffect(() => {
        cargar();
    }, []);

    //esperar que la pagina cargue
    if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

    //elementos visuales
    return(
        <View style={styles.container}>
            <View style={styles.topbar}>
                <Text style={styles.barText}>Calendario</Text>
                <Pressable onPress={()=> navigation.navigate("Home")}>
                    <Image source={require('../assets/Close.png')} style={{width:65,height:65, tintColor:'#fff', marginLeft:5}}/>
                </Pressable>
            </View>
            <View style={{height:70}}/>
            
                <Calendar 
                
                dayComponent={({date, state}) => {
                    const dayEvents = events[date.dateString]; 

                    return(
                        <View style={{alignItems:'center'}}>
                            <Text style={{color:state === 'disabled' ? 'gray' : 'black'}}>
                                {date.day}
                            </Text>

                            {dayEvents && dayEvents.map((task) => (

                                <Pressable
                                    key={task.id}
                                    onPress={() =>
                                        navigation.navigate('Task1', {tarea:task
                                        })
                                    }

                                style={{
                                    
                                    marginTop:4,
                                    backgroundColor:prioridadColor[task.prioridad] || '#37CDD8',
                                    paddingHorizontal:4,
                                    borderRadius:4
                                }}>
                                    <Text style={{fontSize:10, color:'#fff'}}>
                                    {task.nombre}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    );
                }}

                style = {{width: "100%", flex:1}}
                theme = {{
                    'stylesheet.calendar.main':{
                        container: {
                            paddingLeft: 0,
                            paddingRight: 0,
                            backgroundColor: '#fff'
                        },
                        week:{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            height: 90,
                            
                            backgroundColor: '#fff'
                        },
                        dayContainer: {
                            flex: 1,
                            alignItems: 'center',
                            borderRightWidth: 1,
                            borderTopWidth: 1,
                            borderColor: '#ddd'
                        }
                    }
                }}
                onDayPress={(day) => {
                console.log('selected day', day);
                }}
                
            />  
        </View>
    );
}


const styles = StyleSheet.create({

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
        textAlign:'center'    
    },

    container:{
        flex:1,
        backgroundColor: '#e2e2e2', 
    },
    textMedium:{
        fontFamily: 'Inter_400Regular',
        fontSize: 20,
    },
});