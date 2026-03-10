import {StyleSheet, Text, View, ScrollView, Image, SafeAreaView, Pressable} from 'react-native'
import { useFonts,Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';

export default function HomeScreen({navigation}){

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_300Light
  })


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
              <View style={styles.list}>
                <Text style={[styles.text, {fontFamily:'Inter_500Medium'}]}>Tarea 1 </Text>              
                <Text style={[styles.text, {color:'#3f3c3c'}]}>16/02</Text>
                <Text style={[styles.text, {color:'#3f3c3c'}]}>-</Text>
                <Text style={[styles.text, {color:'#3f3c3c'}]}>Fisica</Text>
                <Image source={require('../assets/Circle.png')} style={{width:20, height:20, tintColor:'#BEEAB3'}}/>
                <Image source={require('../assets/Chevron.png')} style={{width:10, height:20, tintColor:'lightGray'}}/>
              </View>
              <View style={{borderTopWidth: 1, borderTopColor:'#aaaaaa', }}/>

              <View style={styles.list}>
                <Text style={styles.text}>Tarea 2 </Text>
                <Text style={[styles.text, {color:'#3f3c3c'}]}>19/02</Text>
                <Text style={[styles.text, {color:'#3f3c3c'}]}>-</Text>
                <Text style={[styles.text, {color:'#3f3c3c'}]}>Calculo</Text>
                <Image source={require('../assets/Circle.png')} style={{width:20, height:20, tintColor:'#f0e24d'}}/>
                <Image source={require('../assets/Chevron.png')} style={{width:10, height:20, tintColor:'lightGray'}}/>
              </View>
              <View style={{borderTopWidth: 1, borderTopColor:'#aaaaaa', }}/>

              <View style={styles.list}>
                <Text style={styles.text}>Tarea 3 </Text>
                <Text style={[styles.text, {color:'#3f3c3c'}]}>20/02</Text>
                <Text style={[styles.text, {color:'#3f3c3c'}]}>-</Text>
                <Text style={[styles.text, {color:'#3f3c3c'}]}>Escritura</Text>
                <Image source={require('../assets/Circle.png')} style={{width:20, height:20, tintColor:'#F89A9A'}}/>
                <Image source={require('../assets/Chevron.png')} style={{width:10, height:20, tintColor:'lightGray'}}/>
              </View>
              <View style={{borderTopWidth: 1, borderTopColor:'#aaaaaa', }}/>

              <View style={styles.list}>
                <Text style={styles.text}>Tarea 4 </Text>
                <Text style={[styles.text, {color:'#3f3c3c'}]}>30/03</Text>
                <Text style={[styles.text, {color:'#3f3c3c'}]}>-</Text>
                <Text style={[styles.text, {color:'#3f3c3c'}]}>Estadistica</Text>
                <Image source={require('../assets/Circle.png')} style={{width:20, height:20, tintColor:'#BEEAB3'}}/>
                <Image source={require('../assets/Chevron.png')} style={{width:10, height:20, tintColor:'lightGray'}}/>
              </View>
              <View style={{borderTopWidth: 1, borderTopColor:'#aaaaaa', }}/>
            </View>
            <Text style={[styles.text, {fontFamily:'Inter_500Medium',fontSize:20, textAlign:'center', marginTop:15}]}>Tareas finalizadas</Text>
              
            <View style={styles.finished}>
              <Image source={require('../assets/check.png')} style={{width:50, height:50, tintColor:'#2cd43a'}}/>
              <Text style={[styles.text,{fontSize:20, marginLeft:5}]}>Tarea 5</Text>
            </View>
        
            <View style={styles.finished}>
              <Image source={require('../assets/check.png')} style={{width:50, height:50, tintColor:'#2cd43a'}}/>
              <Text style={[styles.text,{fontSize:20, marginLeft:5}]}>Tarea 6</Text>
            </View>

            <View style={styles.finished}>
              <Image source={require('../assets/check.png')} style={{width:50, height:50, tintColor:'#2cd43a'}}/>
              <Text style={[styles.text,{fontSize:20, marginLeft:5}]}>Tarea 7</Text>
            </View>

            <View style={styles.finished}>
              <Image source={require('../assets/check.png')} style={{width:50, height:50, tintColor:'#2cd43a'}}/>
              <Text style={[styles.text,{fontSize:20, marginLeft:5}]}>Tarea 8</Text>
            </View>
            
        </ScrollView>
        <View style={styles.navContainer}>
          <View style={styles.navBar}>
            <Pressable onPress={()=>navigation.navigate("Calendar") } >
              <Image source={require('../assets/Calendar.png')} style={{width:50, height:50, tintColor:'#2cd43a'}}/>
            </Pressable>
            <Pressable>
              <Image source={require('../assets/Add.png')} style={{width:60, height:60, tintColor:'#2cd43a'}}/>
            </Pressable>
            <Pressable>
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

