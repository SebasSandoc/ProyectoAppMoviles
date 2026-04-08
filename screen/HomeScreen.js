import {StyleSheet, Text, View, ScrollView, Image, SafeAreaView, Pressable, FlatList} from 'react-native'
import { useFonts,Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';
import {tareas} from '../data/tareas';
import TareaItem from '../components/TareaItem';
import FinalizadoItem from '../components/FinalizadoItem';

export default function HomeScreen({navigation}){

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_300Light
  })

  const tPendientes = tareas.filter(t => !t.finalizada);
  const tFinalizadas = tareas.filter(t => t.finalizada);


    return(
      <View style={styles.container}>
        <View style={styles.topbar}>
          <Text style= {styles.barText}>Bienvenido: <Text  style= {{fontFamily:'Inter_300Light'}}>Manuel</Text></Text>
        </View>
          
        <ScrollView>
            <View style={{justifyContent: 'center',alignItems:'center', padding:20, flex:1}}>
              <Image source={require('../assets/applogo.png')} style={styles.img}/>
            </View>
            <Text style={[styles.text, {fontFamily:'Inter_500Medium',fontSize:20, textAlign:'center'}]}>Tareas pendientes</Text>

            
            <View style={{marginTop:20}}>
              {tareas.length === 0 ? (
                <Text style={[styles.text, {fontFamily:'Inter_500Medium',fontSize:20, textAlign:'center'}]}>No hay tareas pendientes</Text>
              ) :(
                <FlatList
                  data={tPendientes}
                  keyExtractor={(item) => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => (
                    <TareaItem
                      tarea={item}
                      onVer={()=> navigation.navigate()}
                    />
                  )}
                />
              )}
            </View>


        <Text style={[styles.text, {fontFamily:'Inter_500Medium',fontSize:20, textAlign:'center', marginTop:15}]}>Tareas finalizadas</Text>

        <View>
          {tareas.length === 0 ? (
            <Text style={[styles.text, {fontFamily:'Inter_500Medium',fontSize:20, textAlign:'center'}]}>No hay tareas finalizadas recientes</Text>
          ):(
            <FlatList
            data={tFinalizadas}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <FinalizadoItem
                tarea={item}
                onVer={()=> navigation.navigate()}
              />
            )}
            />
          )}
        </View>
              
            
        <View style={{height:100}}/>    
        </ScrollView>
        <View style={styles.navContainer}>
          <View style={styles.navBar}>
            <Pressable onPress={()=>navigation.navigate("Calendar")}>
              <Image source={require('../assets/Calendar.png')} style={{width:50, height:50, tintColor:'#2cd43a'}}/>
            </Pressable>
            <Pressable onPress={()=>navigation.navigate("NewTask")}>
              <Image source={require('../assets/Add.png')} style={{width:60, height:60, tintColor:'#2cd43a'}}/>
            </Pressable>
            <Pressable onPress={()=>navigation.navigate("Settings")}>
              <Image source={require('../assets/Settings.png')} style={{width:50, height:50, tintColor:'#2cd43a'}}/>
            </Pressable>
          </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    gap:10,
    backgroundColor: '#e2e2e2'
  },
  title: {
    padding: 2,
    margin:2,
    fontFamily: 'Arial',
    fontSize: 20,
    color: "#f10",
    textAlign: "center"
  },
  topbar: {
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
  },
  img:{
    width:100,
    height:100,
  },
  text:{
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
  },
  list:{
    alignItems: 'flex-start',
    alignContent:'stretch',
    padding:15,
    flexDirection:'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee'
   },

  finished: {
    flexDirection:'row',
    alignItems:'center',
    padding:5,
    
    height:60, 
    marginTop:15,
    marginHorizontal:20,
    borderRadius:10,
    borderWidth:2,
    borderColor:'#919191',
    backgroundColor: '#eee'
  },

  navContainer:{
    position:'absolute',
    alignItems:'center',
    justifyContent: 'center',
    bottom:0,
    width:'100%',
    borderTopWidth: 2,
    borderColor:'#919191'
  },

  navBar: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems:'center',
    padding: 15,
    backgroundColor: '#eeeeee'
  }
  
});

