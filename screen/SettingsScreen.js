import { View, Text, StyleSheet, Pressable, ScrollView, SafeAreaView, TextInput, Modal } from 'react-native';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';
import { useState } from 'react';

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
  const username = route?.params?.username || 'Manuel';
  const correo   = 'manuel@correo.com';

  const [fontsLoaded] = useFonts({
    Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_300Light,
  });

  // Recordatorios
  const [notifTarea,   setNotifTarea]   = useState('1 dia antes');
  const [freqBaja,     setFreqBaja]     = useState('Sin Frecuencia');
  const [freqMedia,    setFreqMedia]    = useState('Cada 5 dias');
  const [freqAlta,     setFreqAlta]     = useState('Cada 2 dias');

  // Dropdowns abiertos
  const [abrirNotif,     setAbrirNotif]     = useState(false);
  const [abrirFreqBaja,  setAbrirFreqBaja]  = useState(false);
  const [abrirFreqMedia, setAbrirFreqMedia] = useState(false);
  const [abrirFreqAlta,  setAbrirFreqAlta]  = useState(false);

  // Materias
  const [materias,         setMaterias]         = useState(MATERIAS_INICIALES);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);

  // Modales
  const [modalCambiarDatos,  setModalCambiarDatos]  = useState(false);
  const [modalEliminarCuenta, setModalEliminarCuenta] = useState(false);
  const [modalNuevaMateria,  setModalNuevaMateria]  = useState(false);
  const [modalModMateria,    setModalModMateria]    = useState(false);
  const [modalElimMateria,   setModalElimMateria]   = useState(false);

  // Formulario cambiar datos
  const [editNombre,       setEditNombre]       = useState(username);
  const [editCorreo,       setEditCorreo]       = useState(correo);
  const [editPass,         setEditPass]         = useState('');
  const [editPassConfirm,  setEditPassConfirm]  = useState('');

  // Eliminar cuenta
  const [passEliminar, setPassEliminar] = useState('');

  // Nueva / modificar materia
  const [nuevaMateriaNombre, setNuevaMateriaNombre] = useState('');
  const [nuevaMateriaColor,  setNuevaMateriaColor]  = useState(COLORES_DISPONIBLES[0]);

  const cerrarTodosDropdowns = () => {
    setAbrirNotif(false);
    setAbrirFreqBaja(false);
    setAbrirFreqMedia(false);
    setAbrirFreqAlta(false);
  };

  const handleGuardarMateria = () => {
    if (!nuevaMateriaNombre) return;
    if (modalModMateria && materiaSeleccionada !== null) {
      setMaterias(prev => prev.map((m, i) =>
        i === materiaSeleccionada ? { nombre: nuevaMateriaNombre, color: nuevaMateriaColor } : m
      ));
    } else {
      setMaterias(prev => [...prev, { nombre: nuevaMateriaNombre, color: nuevaMateriaColor }]);
    }
    setNuevaMateriaNombre('');
    setNuevaMateriaColor(COLORES_DISPONIBLES[0]);
    setModalNuevaMateria(false);
    setModalModMateria(false);
    setMateriaSeleccionada(null);
  };

  const handleEliminarMateria = () => {
    if (materiaSeleccionada === null) return;
    setMaterias(prev => prev.filter((_, i) => i !== materiaSeleccionada));
    setMateriaSeleccionada(null);
    setModalElimMateria(false);
  };

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
          <Text style={styles.campoValor}>{username}</Text>
          <View style={styles.separador} />
          <Text style={styles.campoLabel}>Correo electronico:</Text>
          <Text style={styles.campoValor}>{correo}</Text>
        </View>

        <View style={styles.botonesRow}>
          <Pressable
            style={({ pressed }) => [styles.buttonPri, pressed && { backgroundColor: '#26793c' }]}
            onPress={() => setModalCambiarDatos(true)}
          >
            <Text style={styles.buttonText}>Cambiar datos</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.buttonOut, pressed && { backgroundColor: '#eee' }]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonOutText}>Cerrar sesion</Text>
          </Pressable>
        </View>

        {/* ── RECORDATORIOS ── */}
        <Text style={styles.seccionTitulo}>Recordatorios</Text>
        <View style={styles.card}>
          <Text style={styles.campoLabel}>Notificar tarea:</Text>
          <Dropdown
            valor={notifTarea}
            opciones={NOTIFICACIONES}
            visible={abrirNotif}
            onToggle={() => { cerrarTodosDropdowns(); setAbrirNotif(!abrirNotif); }}
            onSeleccionar={v => { setNotifTarea(v); setAbrirNotif(false); }}
          />

          <Text style={[styles.campoLabel, { marginTop: 12, fontWeight: 'bold' }]}>Frecuencia</Text>

          <View style={styles.frecuenciaFila}>
            <Text style={styles.frecuenciaLabel}>Prioridad baja:</Text>
            <View style={{ flex: 1 }}>
              <Dropdown
                valor={freqBaja}
                opciones={FRECUENCIAS}
                visible={abrirFreqBaja}
                onToggle={() => { cerrarTodosDropdowns(); setAbrirFreqBaja(!abrirFreqBaja); }}
                onSeleccionar={v => { setFreqBaja(v); setAbrirFreqBaja(false); }}
              />
            </View>
          </View>

          <View style={styles.frecuenciaFila}>
            <Text style={styles.frecuenciaLabel}>Prioridad media:</Text>
            <View style={{ flex: 1 }}>
              <Dropdown
                valor={freqMedia}
                opciones={FRECUENCIAS}
                visible={abrirFreqMedia}
                onToggle={() => { cerrarTodosDropdowns(); setAbrirFreqMedia(!abrirFreqMedia); }}
                onSeleccionar={v => { setFreqMedia(v); setAbrirFreqMedia(false); }}
              />
            </View>
          </View>

          <View style={styles.frecuenciaFila}>
            <Text style={styles.frecuenciaLabel}>Prioridad alta:</Text>
            <View style={{ flex: 1 }}>
              <Dropdown
                valor={freqAlta}
                opciones={FRECUENCIAS}
                visible={abrirFreqAlta}
                onToggle={() => { cerrarTodosDropdowns(); setAbrirFreqAlta(!abrirFreqAlta); }}
                onSeleccionar={v => { setFreqAlta(v); setAbrirFreqAlta(false); }}
              />
            </View>
          </View>
        </View>

        {/* ── MATERIAS ── */}
        <Text style={styles.seccionTitulo}>Materias</Text>
        <View style={styles.card}>
          <View style={styles.materiasRow}>
            {materias.map((m, i) => (
              <Pressable
                key={i}
                style={[styles.tag, { backgroundColor: m.color },
                  materiaSeleccionada === i && styles.tagSeleccionado]}
                onPress={() => setMateriaSeleccionada(materiaSeleccionada === i ? null : i)}
              >
                <Text style={styles.tagText}>{m.nombre}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.botonesRow}>
          <Pressable
            style={({ pressed }) => [styles.buttonPri, pressed && { backgroundColor: '#26793c' }]}
            onPress={() => { setNuevaMateriaNombre(''); setNuevaMateriaColor(COLORES_DISPONIBLES[0]); setModalNuevaMateria(true); }}
          >
            <Text style={styles.buttonText}>Nueva Materia</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.buttonSec, pressed && { backgroundColor: '#2b9b91' }]}
            onPress={() => {
              if (materiaSeleccionada === null) return;
              setNuevaMateriaNombre(materias[materiaSeleccionada].nombre);
              setNuevaMateriaColor(materias[materiaSeleccionada].color);
              setModalModMateria(true);
            }}
          >
            <Text style={styles.buttonText}>Modificar materia</Text>
          </Pressable>
        </View>

        <Pressable
          style={({ pressed }) => [styles.buttonOut, { marginTop: 0 }, pressed && { backgroundColor: '#eee' }]}
          onPress={() => { if (materiaSeleccionada !== null) setModalElimMateria(true); }}
        >
          <Text style={styles.buttonOutText}>Eliminar materia</Text>
        </Pressable>

      </ScrollView>

      {/* ══ MODAL: Cambiar datos ══ */}
      <Modal visible={modalCambiarDatos} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modalGrande}>
            <View style={styles.modalTopbar}>
              <Text style={styles.modalTitulo}>Actualizar datos</Text>
            </View>
            <ScrollView contentContainerStyle={{ padding: 16, gap: 8 }}>
              <Text style={styles.label}>Nombre:</Text>
              <TextInput style={styles.inputField} value={editNombre} onChangeText={setEditNombre} />

              <Text style={styles.label}>Correo:</Text>
              <TextInput style={styles.inputField} value={editCorreo} onChangeText={setEditCorreo}
                keyboardType="email-address" autoCapitalize="none" />

              <Text style={styles.label}>Contraseña:</Text>
              <TextInput style={styles.inputField} value={editPass} onChangeText={setEditPass}
                secureTextEntry placeholder="••••••••••" placeholderTextColor="#7e7a7a" />

              <Text style={styles.label}>Confirmar contraseña:</Text>
              <TextInput style={styles.inputField} value={editPassConfirm} onChangeText={setEditPassConfirm}
                secureTextEntry placeholder="••••••••••" placeholderTextColor="#7e7a7a" />

              <Pressable
                style={({ pressed }) => [styles.buttonPri, { marginTop: 10 }, pressed && { backgroundColor: '#26793c' }]}
                onPress={() => setModalCambiarDatos(false)}
              >
                <Text style={styles.buttonText}>Actualizar</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [styles.buttonOut, pressed && { backgroundColor: '#eee' }]}
                onPress={() => setModalCambiarDatos(false)}
              >
                <Text style={styles.buttonOutText}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [styles.buttonRojo, pressed && { backgroundColor: '#c0392b' }]}
                onPress={() => { setModalCambiarDatos(false); setModalEliminarCuenta(true); }}
              >
                <Text style={styles.buttonText}>Eliminar cuenta</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ══ MODAL: Eliminar cuenta ══ */}
      <Modal visible={modalEliminarCuenta} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalPequeno}>
            <Text style={styles.modalTituloOscuro}>¿Eliminar cuenta?</Text>
            <Text style={styles.modalTexto}>
              ¿Esta seguro que deseas eliminar esta cuenta de forma permanente?{'\n'}
              <Text style={{ fontWeight: 'bold' }}>
                (Al eliminar la cuenta, toda las tareas e informacion guardada sera eliminada)
              </Text>
            </Text>
            <Text style={styles.label}>Ingrese su contraseña para proseguir:</Text>
            <TextInput
              style={styles.inputField}
              value={passEliminar}
              onChangeText={setPassEliminar}
              secureTextEntry
              placeholder="••••••••••"
              placeholderTextColor="#7e7a7a"
            />
            <Pressable
              style={({ pressed }) => [styles.buttonRojoOscuro, pressed && { backgroundColor: '#6b0000' }]}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.buttonText}>ELIMINAR CUENTA</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.buttonOut, pressed && { backgroundColor: '#eee' }]}
              onPress={() => setModalEliminarCuenta(false)}
            >
              <Text style={styles.buttonOutText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* ══ MODAL: Nueva / Modificar materia ══ */}
      <Modal visible={modalNuevaMateria || modalModMateria} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modalPequeno}>
            <Text style={styles.modalTituloOscuro}>
              {modalModMateria ? 'Modificar materia' : 'Nueva materia'}
            </Text>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Nombre de la materia"
              placeholderTextColor="#7e7a7a"
              value={nuevaMateriaNombre}
              onChangeText={setNuevaMateriaNombre}
            />
            <Text style={[styles.label, { marginTop: 8 }]}>Color:</Text>
            <View style={styles.coloresRow}>
              {COLORES_DISPONIBLES.map(c => (
                <Pressable
                  key={c}
                  style={[styles.colorCirculo, { backgroundColor: c },
                    nuevaMateriaColor === c && styles.colorCirculoSeleccionado]}
                  onPress={() => setNuevaMateriaColor(c)}
                />
              ))}
            </View>
            <Pressable
              style={({ pressed }) => [styles.buttonPri, { marginTop: 12 }, pressed && { backgroundColor: '#26793c' }]}
              onPress={handleGuardarMateria}
            >
              <Text style={styles.buttonText}>
                {modalModMateria ? 'Guardar cambios' : 'Agregar'}
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.buttonOut, pressed && { backgroundColor: '#eee' }]}
              onPress={() => { setModalNuevaMateria(false); setModalModMateria(false); }}
            >
              <Text style={styles.buttonOutText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* ══ MODAL: Confirmar eliminar materia ══ */}
      <Modal visible={modalElimMateria} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalPequeno}>
            <Text style={styles.modalTituloOscuro}>¿Eliminar materia?</Text>
            <Text style={styles.modalTexto}>
              ¿Esta seguro que deseas eliminar la materia{' '}
              <Text style={{ fontWeight: 'bold' }}>
                {materiaSeleccionada !== null ? materias[materiaSeleccionada]?.nombre : ''}
              </Text>?
            </Text>
            <Pressable
              style={({ pressed }) => [styles.buttonRojoOscuro, pressed && { backgroundColor: '#6b0000' }]}
              onPress={handleEliminarMateria}
            >
              <Text style={styles.buttonText}>ELIMINAR</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.buttonOut, pressed && { backgroundColor: '#eee' }]}
              onPress={() => setModalElimMateria(false)}
            >
              <Text style={styles.buttonOutText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
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
  materiasRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
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
    padding: 20,
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