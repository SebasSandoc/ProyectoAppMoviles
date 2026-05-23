import { View, Text, StyleSheet, Pressable, ScrollView, SafeAreaView, TextInput, Modal, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../context/AuthContext';
import { materias as localMaterias } from '../data/materias';
import { actualizarMateria, crearMateria, eliminarMateriaPI, obtenerMaterias } from '../services/materiaService';
import MateriaItem from '../components/MateriaItem';
import { Picker } from '@react-native-picker/picker';

const FRECUENCIAS  = ['Sin Frecuencia', 'Cada 2 dias', 'Cada 3 dias', 'Cada 5 dias', 'Cada semana'];
const NOTIFICACIONES = ['1 dia antes', '2 dias antes', '3 dias antes', '1 semana antes'];
const COLORES_DISPONIBLES = ['#F44336', '#E91E63', '#9C27B0', '#2196F3', '#4CAF50', '#FF9800', '#00BCD4'];

const MATERIAS_INICIALES = [
  { nombre: 'Calculo',     color: '#E91E63' },
  { nombre: 'Fisica',      color: '#2196F3' },
  { nombre: 'Estadistica', color: '#9C27B0' },
  { nombre: 'Escritura',   color: '#FF5722' },
];


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

  const [materias,setMaterias] = useState([])

  const [materiaSel,setMateriaSel] = useState("")

  const [visible,setVisible] = useState(false)
  const [modificarVisible,setModificarVisible] = useState(false)
  const [eliminarVisible,setEliminarVisible] = useState(false)

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
    ['#ffcccc', '#ff9999', '#ff6666', '#ff3333', '#cc0000'], 
    ['#ccffcc', '#99ff99', '#66ff66', '#33cc33', '#009900'], // green
    ['#ccccff', '#9999ff', '#6666ff', '#3333ff', '#0000cc'], // blue
    ['#fff0cc', '#ffe099', '#ffd166', '#ffbf00', '#cc9900'], // yellow
    ['#f0ccff', '#d699ff', '#bb66ff', '#9933ff', '#6600cc'], // purple
  ];

  const [selectedColor, setSelectedColor] = useState(null);


  // Recordatorios
  const cerrarTodosDropdowns = () => {

  };

  const guardar = async () => {

    console.log("Guardar")
    

    const nuevo = {
      nombre,
      color,
      notas
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
    let respuesta

    respuesta = await eliminarMateriaPI(materiaSel)

    if (respuesta) {
      setEliminarVisible(false)
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
  

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.barText}>Panel de configuracion</Text>
        <Pressable onPress={() => navigation.goBack()} style={styles.closeBtn}>
          <Text style={styles.closeBtnText}>✕</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} onTouchStart={cerrarTodosDropdowns}>

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
          <Dropdown
            
          />

          <Text style={[styles.campoLabel, { marginTop: 12, fontWeight: 'bold' }]}>Frecuencia</Text>

          <View style={styles.frecuenciaFila}>
            <Text style={styles.frecuenciaLabel}>Prioridad baja:</Text>
            <View style={{ flex: 1 }}>
              <Dropdown
                
              />
            </View>
          </View>

          <View style={styles.frecuenciaFila}>
            <Text style={styles.frecuenciaLabel}>Prioridad media:</Text>
            <View style={{ flex: 1 }}>
              <Dropdown
                
              />
            </View>
          </View>

          <View style={styles.frecuenciaFila}>
            <Text style={styles.frecuenciaLabel}>Prioridad alta:</Text>
            <View style={{ flex: 1 }}>
              <Dropdown
                
              />
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
          <Text style={styles.buttonOutText}>Eliminar materia</Text>
        </Pressable>

      </ScrollView>

      <Modal transparent={true} visible={visible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <View style={[styles.topbar, {width:'100%'}]}>
              <Text style={[styles.barText]}>Nueva tarea</Text>
            </View>
            
            <View style={{padding:20, gap:10}}>
              <Text>Nombre de la tarea:</Text>
            <TextInput placeholder='Nombre de tarea' placeholderTextColor='#7e7a7a' style ={styles.inputField}
              onChangeText={setNombre}
            />
              <Text>Nombre de la tarea:</Text>
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
              <Text>Selecionado:</Text>
              <View
                style={[
                  styles.preview,
                  { backgroundColor: selectedColor || '#ccc' }
                ]}
              />
            </View>
            <View style={[styles.botonesRow,{padding:10}]}>
              <Pressable onPress={guardar} style={styles.buttonPri}>
                <Text>Crear</Text>
              </Pressable>
              <Pressable style={[styles.buttonPri]} onPress={() => setVisible(false)}>
                <Text>Cancelar</Text>
              </Pressable>
            </View>
            
          </View>
        </View>
      </Modal>

      <Modal transparent={true} visible={modificarVisible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <View style={[styles.topbar, {width:'100%'}]}>
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
              <Text>Nombre de la tarea:</Text>
            <TextInput placeholder='Nombre de tarea' placeholderTextColor='#7e7a7a' style ={styles.inputField}
              onChangeText={setNombre}
            />
              <Text>Nombre de la tarea:</Text>
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
              <Text>Selecionado:</Text>
              <View
                style={[
                  styles.preview,
                  { backgroundColor: selectedColor || '#ccc' }
                ]}
              />
            </View>
            <View style={[styles.botonesRow,{padding:10}]}>
              <Pressable onPress={modificar} style={styles.buttonPri}>
                <Text>Modificar</Text>
              </Pressable>
              <Pressable style={[styles.buttonPri]} onPress={() => setVisible(false)}>
                <Text>Cancelar</Text>
              </Pressable>
            </View>
            
          </View>
        </View>
      </Modal>
      

      <Modal transparent={true} visible={eliminarVisible} animationType="fade">
        <View style={styles.overlay}>
          <View style={[styles.popup,{margin:50}]}>
            <View style={[styles.topbar, {width:'100%'}]}>
              <Text style={[styles.barText]}>Eliminar materia</Text>
            </View>

            <View style={{padding:20, gap:10}}>
              <Text>Seleccione materia a eliminar:</Text>
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
              <Text>(Para eliminar la materia, asegurese de que tareas existente no tengan tareas con esa materia, esta accion no se puede deshacer)</Text>
            </View>      
            <View style={[styles.botonesRow,{padding:10}]}>
              <Pressable onPress={eliminar} style={styles.buttonPri}>
                <Text>Eliminar</Text>
              </Pressable>
              <Pressable style={[styles.buttonPri]} onPress={() => setEliminarVisible(false)}>
                <Text>Cancelar</Text>
              </Pressable>
            </View>
            
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({

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
  container: { flex: 1, backgroundColor: '#e2e2e2' },
  topbar: {
    height: 70,
    backgroundColor: '#37CDD8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  barText:      { fontFamily: 'Arial', fontSize: 22, color: '#fff' },
  closeBtn:     { padding: 6 },
  closeBtnText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  scroll:       { padding: 20, gap: 12, paddingBottom: 40 },

  seccionTitulo: {
    fontFamily: 'Arial',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#eee',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    padding: 14,
    gap: 8,
  },
  campoLabel: { fontFamily: 'Arial', fontSize: 14, color: '#666' },
  campoValor: { fontFamily: 'Arial', fontSize: 16, fontWeight: 'bold', color: '#222' },
  separador:  { borderBottomWidth: 1, borderBottomColor: '#c4c4c4', marginVertical: 4 },

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
    borderWidth: 1,
    borderColor: '#c4c4c4',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginTop: 4,
  },
  buttonText:    { color: '#fff', fontSize: 14, fontWeight: 'bold', fontFamily: 'Arial', textAlign: 'center' },
  buttonOutText: { color: '#555', fontSize: 14, fontFamily: 'Arial' },

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
  modalTitulo:      { color: '#fff', fontSize: 18, fontWeight: 'bold', fontFamily: 'Arial' },
  modalTituloOscuro:{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', fontFamily: 'Arial', color: '#222' },
  modalTexto: {
    fontFamily: 'Arial',
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    lineHeight: 20,
  },


    textLarge:{
        fontFamily: 'Inter_700Bold',
        fontSize: 25,
        color: '#fff',
    },

  label:      { fontFamily: 'Arial', fontSize: 14, color: '#444', marginTop: 4 },
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
  coloresRow:             { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 4 },
  colorCirculo:           { width: 32, height: 32, borderRadius: 16 },
  colorCirculoSeleccionado: { borderWidth: 3, borderColor: '#333' },
});