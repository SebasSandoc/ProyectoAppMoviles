import {StyleSheet, Text, View, ScrollView, Image, SafeAreaView, Pressable, FlatList, ActivityIndicator} from 'react-native'
import { useFonts,Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';
import {tareas as localTareas} from '../data/tareas';
import TareaItem from '../components/TareaItem';
import FinalizadoItem from '../components/FinalizadoItem';
import { obtenerTareas } from '../services/tareaService';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

//Pantalla de inicio, contiene lista de tareas pendientes y finalizadas con acceso a las pantallas principales

export default function HomeScreen({navigation}){

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_300Light
  })

  //lista de tareas obtenidas de Firebase
  const[tareas,setTareas] = useState([]);
  //constante de estado de carga de datos
  const[loading,setLoading] = useState(true);
  //usuario obtenido del contexto de autorizacion
  const {usuario} = useContext(AuthContext);

  //carga de datos de Firebase
  const cargar = async () => {
    setLoading(true);
    const data = await obtenerTareas();
    setTareas(data || localTareas);
    setLoading(false);
  };

  //estado de carga
  useEffect(() => {
    cargar();
  }, []);

  //dividir la lista de tareas en finalizadas y no finalizadas

  const tareasFinalizadas = tareas.filter(
    tarea => tarea.finalizada
  )
  const tareasNoFinalizadas = tareas.filter(
    tarea => !tarea.finalizada
  )

  //esperar a que carguen los datos
  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;


    //elementos visuales
    return(
      <View style={styles.container}>
        <View style={styles.topbar}>
          <Text style= {styles.barText}>Bienvenido: <Text  style= {{fontFamily:'Inter_300Light'}}>{usuario.nombre}</Text></Text>
        </View>
          
        <ScrollView>
          <View style={{justifyContent: 'center',alignItems:'center', padding:20, flex:1}}>
            <Image source={require('../assets/applogo.png')} style={styles.img}/>
          </View>
            <Text style={[styles.text, {fontFamily:'Inter_500Medium',fontSize:20, textAlign:'center'}]}>Tareas pendientes</Text>
            
            <View style={{marginTop:20}}>
              {tareasNoFinalizadas.length === 0 ? (
                <Text style={[styles.text, {fontFamily:'Inter_500Medium',fontSize:20, textAlign:'center'}]}>No hay tareas finalizads recientes</Text>
              ) :(
                <FlatList
                  data={tareasNoFinalizadas}
                  keyExtractor={(item) => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => (
                    <TareaItem
                      tarea={item}
                      onVer={()=> navigation.navigate("Task1",{tarea:item})}
                    />
                  )}
                />
              )}
            </View>


        <Text style={[styles.text, {fontFamily:'Inter_500Medium',fontSize:20, textAlign:'center', marginTop:15}]}>Tareas finalizadas</Text>
            <View style={{marginTop:20}}>
              {tareasFinalizadas.length === 0 ? (
                <Text style={[styles.text, {fontFamily:'Inter_500Medium',fontSize:20, textAlign:'center'}]}>No hay tareas pendientes</Text>
              ) :(
                <FlatList
                  data={tareasFinalizadas}
                  keyExtractor={(item) => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => (
                    <FinalizadoItem
                      tarea={item}
                      onVer={()=> navigation.navigate("Task1",{tarea:item})}
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
            <Pressable onPress={()=>navigation.navigate("NewTask", {recargar: cargar})}>
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

