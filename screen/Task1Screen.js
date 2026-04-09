import {View, Text, StyleSheet,ScrollView,Pressable, Image} from 'react-native'
import { useFonts,Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';
import {prioridades} from '../data/prioridades';
import { materias } from '../data/materias';
import { tareas } from '../data/tareas';


export default function Task1creen({route}){

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Inter_300Light
    })

    const {tarea} = route.params;

    const fecha = new Date(tarea.fechaMax)

    const fechaFormato = fecha.
        toLocaleString("es-ES", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true
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
    const colorborde = prioridadColorBorde[tarea.prioridad] || "#999"

    const materiaNombre = tarea.materias[0];

    const materia = materias.find(
        m => m.nombre.toLowerCase() === materiaNombre.toLowerCase()
    );

    const colorMat = materia ? materia.color :'#ccc';

    return(
        <View style={styles.container}> 
            <View style={[styles.topbar,{backgroundColor:color}]}>
                <Text style={styles.barText}>{tarea.nombre}</Text>
                <Image source={require('../assets/Close.png')} style={{width:65,height:65, tintColor:'#fff', marginLeft:5}}/>
            </View>
            <ScrollView>
                <View style={{height:70}}/>
                
                <View style={styles.content}>
                    <Text style={styles.textLarge}>Fecha limite:</Text>
                    <Text style={styles.textMedium}>{fechaFormato}</Text>
                    <Text style={styles.textLarge}>Materia(s):</Text>
                    <View style={[styles.subjectContainer, {backgroundColor:colorMat}]}>
                        <Text style={styles.subjectText}>{tarea.materias[0]}</Text>
                    </View>
                    <Text style={styles.textLarge}>Prioridad:</Text>
                    <View style={[styles.priorityContainer, {backgroundColor:color, borderColor:colorborde}]}>
                        <Text style={styles.subjectText}>{tarea.prioridad}</Text>
                    </View>
                    <Text style={styles.textLarge}>Notas:</Text>
                    <View style={styles.NotesContainer}>
                        <Text style={styles.textsmall}>{tarea.notas}</Text>
                    </View>
                    <Text style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 20,
                        textAlign: 'center'
                    }}>Quedan <Text style={{fontFamily:'Inter_700Bold'}}>10 dias</Text> para la fecha limite.</Text>

                    <View 
                        style={{
                            marginTop:5,
                            marginBottom:5,
                            borderBottomColor: '#757575',
                            borderBottomWidth: 1,
                        }}
                    />

                    <View style={{flexDirection:'row',}}>
                        <Pressable style={[styles.ButtonPrimary,{marginRight:5}]}>
                            <Text style={styles.ButtonText}>Marcar como hecha</Text>
                        </Pressable>
                        <Pressable style={[styles.ButtonSecondary,{marginLeft:5}]}>
                            <Text style={styles.ButtonText}>Modificar Tarea</Text>
                        </Pressable>
                    </View>
                    <Pressable>
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