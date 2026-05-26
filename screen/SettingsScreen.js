import { Image, View, Text, StyleSheet, Pressable, ScrollView, SafeAreaView, TextInput, Modal, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../context/AuthContext';
import { materias as localMaterias } from '../data/materias';
import { actualizarMateria, crearMateria, eliminarMateriaPI, obtenerMaterias } from '../services/materiaService';
import MateriaItem from '../components/MateriaItem';
import { Picker } from '@react-native-picker/picker';
import { obtenerTareas } from '../services/tareaService';


function Dropdown({ valor, opciones, visible, onToggle, onSeleccionar }) {
  return (
    <View>
      <Pressable style={styles.selectBtn} onPress={onToggle}>
        <Text style={styles.selectValue}>{valor}</Text>
        <Text>▼</Text>
      </Pressable>
      {visible && (
        <View style={styles.dropdown}>
          {opciones.map(o => (
            <Pressable key={o} style={styles.dropdownItem} onPress={() => onSeleccionar(o)}>
              <Text style={styles.text}>{o}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

export default function SettingsScreen({ navigation, route }) {

  const { logout } = useContext(AuthContext);

  const {usuario} = useContext(AuthContext);
  const[loading,setLoading] = useState(true);

  const [errorMsg,setErrorMsg] = useState("")

  const [materias,setMaterias] = useState([])
  const [tareas,setTareas] = useState([])

  const [materiaSel,setMateriaSel] = useState("")

  const [visible,setVisible] = useState(false)
  const [modificarVisible,setModificarVisible] = useState(false)
  const [eliminarVisible,setEliminarVisible] = useState(false)
  const [notiVisible,setNotiVisible] = useState(false);

  const [nombre,setNombre] = useState("")
  const [color,setColor] = useState("")
  const [notas,setNotas] = useState("")

  const [fontsLoaded] = useFonts({
    Inter_400Regular, 
    Inter_500Medium, 
    Inter_700Bold, 
    Inter_300Light,
  });

  const colorGroups = [
    ['#c9f1f3', '#7edfe6', '#71d7df', '#3bcad4', '#06b5c2'], 
    ['#ccffcc', '#99ff99', '#66ff66', '#33cc33', '#009900'], // green
    ['#ccccff', '#9999ff', '#6666ff', '#3333ff', '#0000cc'], // blue
    ['#ffe3cc', '#ffbe99', '#ffab66', '#ff8800', '#cc5c00'], // yellow
    ['#f0ccff', '#d699ff', '#bb66ff', '#9933ff', '#6600cc'], // purple
  ];

  const [selectedColor, setSelectedColor] = useState(null);

  const frecuencias = ["Cada dia", "cada 3 dias","cada 5 dias"]
  const [selAlta, setSelAlta] = useState(frecuencias[0])
  const [selMedia, setSelMedia] = useState(frecuencias[1])
  const [selBaja, setSelBaja] = useState(frecuencias[2])

  const notificar = ["12 horas antes","1 dia antes","2 dias antes"]
  const [selNotiApp, setSelNotiApp] = useState(notificar[1])



  const verificar = () =>{
    console.log(nombre)
    console.log(nombre == "")
    if( nombre == "") return false
    return true
  }

  const guardar = async () => {

    console.log("Guardar")

    const nuevo = {
      nombre,
      color,
      notas
    }

    if(!verificar()) {
      setVisible(false)
      setErrorMsg("La materia debe tener un nombre")
      setNotiVisible(true)
      return;
    }

    let respuesta

    respuesta = await crearMateria(nuevo)

    if (respuesta) {
      setVisible(false)
    }
  }

  const modificar = async () => {
    console.log("modificar")
    console.log(materiaSel)

    if(materiaSel=="") {
      setVisible(false)
      setErrorMsg("Debe seleccionar una materia para modificar")
      setNotiVisible(true)
      return;
    }

    if(!verificar()) {
      setVisible(false)
      setErrorMsg("La materia debe tener un nombre")
      setNotiVisible(true)
      return;
    }


    const nuevo = {
      nombre,
      color,
      notas
    }

    let respuesta

    respuesta = await actualizarMateria(materiaSel,nuevo)

    if (respuesta) {
      setModificarVisible(false)
    }
  }

 
  const eliminar = async() => {

    const enUso = tareas.some((tarea)   =>
    tarea.materias.includes(Number(materiaSel)));


    if (enUso) {
      console.log("materia en uso")
      setErrorMsg("Esta materia se encuentra en uso por una o mas tareas")
      setEliminarVisible(false)
      setNotiVisible(true)
      return;
    }

    let respuesta

    respuesta = await eliminarMateriaPI(materiaSel)

    if (respuesta) {
      setEliminarVisible(false)
    }
  }

  const cargar = async () => {
     setLoading(true);
     const data = await obtenerMaterias();
     const tareaData = await obtenerTareas();
     setMaterias(data || localMaterias);
     setTareas(tareaData||"");
     setLoading(false);
  };
  
  useEffect(() => {
     cargar();
  }, []);
  
  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
  

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.barText}>Panel de configuracion</Text>
          <Pressable onPress={()=> navigation.goBack()}>
            <Image source={require('../assets/Close.png')} style={{width:65,height:65, tintColor:'#fff', marginLeft:5}}/>
          </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} >

        {/* ── USUARIO ── */}
        <Text style={styles.seccionTitulo}>Usuario</Text>
        <View style={styles.card}>
          <Text style={styles.campoLabel}>Nombre:</Text>
          <Text style={styles.campoValor}>{usuario.nombre}</Text>
          <View style={styles.separador} />
          <Text style={styles.campoLabel}>Correo electronico:</Text>
          <Text style={styles.campoValor}>{usuario.correo}</Text>
        </View>

        <View style={styles.botonesRow}>
          <Pressable
            style={({ pressed }) => [styles.buttonPri, pressed && { backgroundColor: '#26793c' }]}
            onPress={()=>navigation.navigate("UpdateProfile")}
          >
            <Text style={styles.buttonText}>Cambiar datos</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.buttonOut, pressed && { backgroundColor: '#eee' }]}
            onPress={()=> logout()}
          >
            <Text style={styles.buttonOutText}>Cerrar sesion</Text>
          </Pressable>
        </View>

        {/* ── RECORDATORIOS ── */}
        <Text style={styles.seccionTitulo}>Recordatorios</Text>
        <View style={styles.card}>
          <Text style={styles.campoLabel}>Notificar tarea:</Text>
              <Picker style={styles.inputField}
                selectedValue={selNotiApp}
                onValueChange={(itemValue) => setSelNotiApp(itemValue)}
              >
                {notificar.map((item) => (
                    <Picker.Item
                        key={item}
                        label={item}
                        value={item}
                    />
                ))}
            </Picker>

          <Text style={[styles.campoLabel, { marginTop: 12, fontWeight: 'bold' }]}>Frecuencia</Text>

          <View style={styles.frecuenciaFila}>
            <Text style={styles.campoLabel}>Prioridad baja:</Text>
            <View style={{ flex: 1 }}>
              <Picker
                style={styles.inputField}
                selectedValue={selBaja}
                onValueChange={(itemValue) => setSelAlta(itemValue)}
              >
                {frecuencias.map((item) => (
                    <Picker.Item
                        key={item}
                        label={item}
                        value={item}
                    />
                ))}
            </Picker>
            </View>
          </View>

          <View style={styles.frecuenciaFila}>
            <Text style={styles.campoLabel}>Prioridad media:</Text>
            <View style={{ flex: 1 }}>
              <Picker style={styles.inputField}
                selectedValue={selMedia}
                onValueChange={(itemValue) => setSelMedia(itemValue)}
              >
                {frecuencias.map((item) => (
                    <Picker.Item
                        key={item}
                        label={item}
                        value={item}
                    />
                ))}
            </Picker>
            </View>
          </View>

          <View style={styles.frecuenciaFila}>
            <Text style={styles.campoLabel}>Prioridad alta:</Text>
            <View style={{ flex: 1 }}>
              <Picker style={styles.inputField}
                selectedValue={selAlta}
                onValueChange={(itemValue) => setSelAlta(itemValue)}
              >
                {frecuencias.map((item) => (
                    <Picker.Item
                        key={item}
                        label={item}
                        value={item}
                    />
                ))}
            </Picker>
            </View>
          </View>
        </View>

        {/* ── MATERIAS ── */}
        <Text style={styles.seccionTitulo}>Materias</Text>
        <View style={styles.card}>
          <View style={styles.materiasRow}>
            {materias.length == 0? (
              <Text>No hay materias registradas</Text>
            ):(
              <FlatList 
                data={materias}
                keyExtractor={(item)=>item.id.toString()}
                showsVerticalScrollIndicator={false}
                numColumns={4}
                columnWrapperStyle={{ gap: 8 }}
                contentContainerStyle={{ gap: 8 }}
                renderItem={({item}) => (
                  <MateriaItem
                    materia={item}
                  />
                )}
              />
            )}
          </View>
        </View>

        <View style={styles.botonesRow}>
          <Pressable
            style={({ pressed }) => [styles.buttonPri, pressed && { backgroundColor: '#26793c' }]}
            onPress={() => setVisible(true)}
          >
            <Text style={styles.buttonText}>Nueva Materia</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.buttonSec, pressed && { backgroundColor: '#2b9b91' }]}
            onPress={() => setModificarVisible(true)}
          >
            <Text style={styles.buttonText}>Modificar materia</Text>
          </Pressable>
        </View>

        <Pressable
          style={({ pressed }) => [styles.buttonOut, { marginTop: 0 }, pressed && { backgroundColor: '#eee' }]}
          onPress={() => setEliminarVisible(true)}
        >
          <Text style={[styles.buttonOutText,{padding:10}]}>Eliminar materia</Text>
        </Pressable>

      </ScrollView>

      <Modal transparent={true} visible={visible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <View style={[styles.modalTopbar, {width:'100%'}]}>
              <Text style={[styles.barText]}>Nueva materia</Text>
            </View>
            
            <View style={{padding:20, gap:10}}>
              <Text style={[styles.campoLabel, {color:'#000000'}]}>Nombre de la tarea:</Text>
            <TextInput placeholder='Nombre de tarea' placeholderTextColor='#7e7a7a' style ={styles.inputField}
              onChangeText={setNombre}
            />
              <Text style={[styles.campoLabel, {color:'#000000'}]}>Nombre de la tarea:</Text>
              {colorGroups.map((group, groupIndex) => (
                <View key={groupIndex} style={styles.row}>

                {group.map((color, colorIndex) => (
                  <TouchableOpacity
                    key={colorIndex}
                    style={[styles.colorBox,{ backgroundColor: color }, selectedColor === color && styles.selectedBox]}
                      onPress={() => {setSelectedColor(color); setColor(color)}}
                    />
                  ))}
                </View>
              ))}
            </View>      
            <View style={styles.previewContainer}>
              <Text style={[styles.campoLabel, {color:'#000000'}]}>Selecionado:</Text>
              <View
                style={[
                  styles.preview,
                  { backgroundColor: selectedColor || '#ccc' }
                ]}
              />
            </View>
            <View style={[styles.botonesRow,{padding:10}]}>
              <Pressable onPress={guardar} style={styles.buttonPri}>
                <Text style={styles.buttonText}>Crear</Text>
              </Pressable>
              <Pressable style={[styles.buttonSec]} onPress={() => setVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </Pressable>
            </View>
            
          </View>
        </View>
      </Modal>

      <Modal transparent={true} visible={modificarVisible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <View style={[styles.modalTopbar, {width:'100%'}]}>
              <Text style={[styles.barText]}>Modificar tarea</Text>
            </View>

            <View style={{padding:20, gap:10}}>
              <Picker style ={styles.inputField}
              selectedValue={materiaSel}
              onValueChange={(itemValue) =>{setMateriaSel(itemValue)}}>
              <Picker.Item label="materia a modificar" value=""/>
                {
                  materias.map((materia) =>(
                    <Picker.Item
                      key={materia.id}
                      label = {materia.nombre}
                      value={materia.id}
                    />
                  ))}      
              </Picker>
              <Text style={[styles.campoLabel, {color:'#000000'}]}>Nombre de la materia:</Text>
            <TextInput placeholder='Nombre de tarea' placeholderTextColor='#7e7a7a' style ={styles.inputField}
              onChangeText={setNombre}
            />
              <Text style={[styles.campoLabel, {color:'#000000'}]}>Color de la materia:</Text>
              {colorGroups.map((group, groupIndex) => (
                <View key={groupIndex} style={styles.row}>

                {group.map((color, colorIndex) => (
                  <TouchableOpacity
                    key={colorIndex}
                    style={[styles.colorBox,{ backgroundColor: color }, selectedColor === color && styles.selectedBox]}
                      onPress={() => {setSelectedColor(color); setColor(color)}}
                    />
                  ))}
                </View>
              ))}
            </View>      

            <View style={styles.previewContainer}>
              <Text style={[styles.campoLabel, {color:'#000000'}]}>Selecionado:</Text>
              <View
                style={[
                  styles.preview,
                  { backgroundColor: selectedColor || '#ccc' }
                ]}
              />
            </View>
            <View style={[styles.botonesRow,{padding:10}]}>
              <Pressable onPress={modificar} style={styles.buttonPri}>
                <Text style={styles.buttonText}>Modificar</Text>
              </Pressable>
              <Pressable style={[styles.buttonSec]} onPress={() => setModificarVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </Pressable>
            </View>
            
          </View>
        </View>
      </Modal>
      

      <Modal transparent={true} visible={eliminarVisible} animationType="fade">
        <View style={styles.overlay}>
          <View style={[styles.popup,{margin:50}]}>
            <View style={[styles.modalTopbar, {width:'100%'}]}>
              <Text style={[styles.barText]}>Eliminar materia</Text>
            </View>

            <View style={{padding:20, gap:10}}>
              <Text style={[styles.campoLabel, {color:'#000000'}]}>Seleccione materia a eliminar:</Text>
              <Picker style ={styles.inputField}
              selectedValue={materiaSel}
              onValueChange={(itemValue) =>{setMateriaSel(itemValue)}}>
              <Picker.Item label="materia a modificar" value=""/>
                {
                  materias.map((materia) =>(
                    <Picker.Item
                      key={materia.id}
                      label = {materia.nombre}
                      value={materia.id}
                    />
                  ))}      
              </Picker>
              <Text style={[styles.campoLabel, {color:'#b90000'}]}>(Para eliminar la materia, asegurese de que tareas existente no tengan tareas con esa materia, esta accion no se puede deshacer)</Text>
            </View>      
            <View style={[styles.botonesRow,{padding:10}]}>
              <Pressable onPress={eliminar} style={styles.buttonPri}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </Pressable>
              <Pressable style={[styles.buttonSec]} onPress={() => setEliminarVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </Pressable>
            </View>
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
              <Text style={[styles.campoLabel, {color:'#000000'}]}>{errorMsg}</Text>

            </View>      
            <Pressable onPress={()=>setNotiVisible(false)} style={[styles.buttonPri,{margin:20}]}>
                <Text style={[styles.buttonText, {padding:10}]}>Cerrar</Text>
              </Pressable>    
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({

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

  row: {
    flexDirection: 'row',
    marginBottom: 7,
  },

  colorBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 5,
  },

  selectedBox: {
    borderWidth: 3,
    borderColor: '#000',
  },

  previewContainer: {
    marginTop: 1,
    alignItems: 'center',
  },

  preview: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 10,
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
  container: { 
    flex: 1, 
    backgroundColor: '#e2e2e2' 
  },
  topbar: {
    height: 70,
    backgroundColor: '#37CDD8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  barText:{
      fontFamily: 'Inter_400Regular',
      fontSize: 25,
      color: '#fff',
  },
  scroll:{ 
    padding: 20, 
    gap: 12, 
    paddingBottom: 40 
  },

  seccionTitulo: {
    fontFamily: 'Inter_700Bold',
    fontSize: 25,
  },
  card: {
    backgroundColor: '#eee',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    padding: 14,
    gap: 8,
  },
  campoLabel: { 
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    color: '#666' 
  },
  campoValor: { 
    fontFamily: 'Inter_300Light',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f0f0f' 
  },
  separador:  { 
    borderBottomWidth: 1, 
    borderBottomColor: '#c4c4c4', 
    marginVertical: 4 
  },

  botonesRow: { flexDirection: 'row', gap: 10 },

  buttonPri: {
    flex: 1,
    backgroundColor: '#34994F',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonSec: {
    flex: 1,
    backgroundColor: '#39C3B7',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonRojo: {
    backgroundColor: '#E74C3C',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 4,
  },
  buttonRojoOscuro: {
    backgroundColor: '#8B0000',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: '100%',
  },
  buttonOut: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#0f5337',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonText: { 
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center' 
  },
  buttonOutText: { 
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    color: '#363636',
    textAlign: 'center' 
  },

  // Dropdown
  selectBtn: {
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 5,
    height: 35,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectValue:  { fontFamily: 'Arial', fontSize: 14, color: '#333' },
  dropdown: {
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 5,
    backgroundColor: '#fff',
    zIndex: 99,
  },
  dropdownItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  text:         { fontFamily: 'Arial', fontSize: 14 },

  // Frecuencia
  frecuenciaFila: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 6,
  },
  frecuenciaLabel: {
    fontFamily: 'Arial',
    fontSize: 13,
    color: '#555',
    width: 115,
    paddingTop: 8,
  },

  // Materias
  materiasRow: {  gap: 8 },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagSeleccionado: { borderWidth: 2, borderColor: '#333' },
  tagText: { color: '#fff', fontSize: 13, fontFamily: 'Arial' },

  // Modales
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  popup: {
    
    backgroundColor: 'white',
    borderRadius: 5,
  },

  modalGrande: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '100%',
    maxHeight: '90%',
    overflow: 'hidden',
  },
  modalPequeno: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '100%',
    padding: 20,
    gap: 10,
  },
  modalTopbar: {
    backgroundColor: '#37CDD8',
    padding: 14,
    alignItems: 'center',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 5,
    height: 35,
    fontSize: 15,
    padding: 5,
    backgroundColor: '#fafafa',
    fontFamily: 'Arial',
  },
});