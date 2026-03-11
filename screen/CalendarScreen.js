
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { useFonts,Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';
import { Calendar, LocaleConfig } from 'react-native-calendars';


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
                <Calendar style = {{width: "100%"}}
                theme = {{
                    'stylesheet.calendar.main':{
                        week:{

                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            height: 100,

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