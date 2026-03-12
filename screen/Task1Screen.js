import {View, Text, StyleSheet} from 'react-native'
import { useFonts,Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';


export default function Task1creen({navigation}){

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Inter_300Light
    })


    return(
        <View style={styles.container}>
            <View style={styles.topbar}>
                <Text style={styles.barText}>Tarea 1</Text>
            </View>
            <View style={{height:70}}/>
            <View style={styles.content}>
                <Text style={styles.textLarge}>Fecha limite:</Text>
                <Text style={styles.textMedium}>Jueves 10 de Febrero de 2026</Text>
                <Text style={styles.textLarge}>Materia(s):</Text>
                <View style={styles.subjectContainer}>
                    <Text style={styles.subjectText}>Fisica</Text>
                </View>
                <Text style={styles.textLarge}>Prioridad:</Text>
                <View style={styles.priorityContainer}>
                    <Text style={styles.subjectText}>Baja</Text>
                </View>
                <Text style={styles.textLarge}>Notas:</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#e2e2e2', 
    },

    topbar: {
        top:0,
        position: 'absolute',
        alignItems:'stretch',
        width:'100%',
        height: 70,
        backgroundColor: '#8DDBA5',    
        justifyContent: 'center',
        paddingLeft: 20  
        
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


    content:{
        paddingLeft:20,
        paddingTop:20,
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
    }
});