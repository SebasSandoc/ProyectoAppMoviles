import {View, Text, StyleSheet} from 'react-native';
import { useFonts,Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';

export default function CalendarScreen({navigation}){

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_300Light
  })


    return(
        <View style={styles.container}>
            <View style={styles.topbar}>
                <Text style={styles.barText}>Calendario</Text>
            </View>
            <View style={{height:70}}></View>
            <Text style={styles.text}>Enero</Text>        
        </View>
    );
}


const styles = StyleSheet.create({

    container:{
        flex:1,
        
        alignItems: 'center',
        ackgroundColor: '#e2e2e2',
        gap:10
    },
    topbar: {
        top:0,
        position: 'absolute',
        alignItems:'stretch',
        width:'100%',
        height: 70,
        backgroundColor: '#37CDD8',    
        justifyContent: 'center',
            
        },
    barText:{
        fontFamily: 'Inter_400Regular',
        fontSize: 25,
        color: '#fff',
        paddingLeft: 20,
        textAlign:'center'    
    },
    text:{
        fontFamily: 'Inter_400Regular',
        fontSize: 15,
    },
});