const BASE_URL = "http://127.0.0.1:8080/tareas";


const handleResponse = async (res) => {
  const text = await res.text();

  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    console.error("Error parseando JSON:", text);
    throw new Error("Respuesta inválida del servidor");
  }

  if (!res.ok) {
    throw new Error(data?.message || "Error en la petición");
  }

  return data;
};

// GET - Obtener productos
export const obtenerTareas = async () => {
  try {
    const res = await fetch(BASE_URL);
    return await handleResponse(res);
  } catch (error) {
    console.error("Error al obtener tareas:", error.message);
    return [];
  }
};

// POST - Crear producto
export const crearTarea = async (tarea) => {
  try {

    console.log(tarea)
    console.log(tarea.materias[0])

    const payload = {
      id: 0,
      nombre: tarea.nombre,
      prioridad: tarea.prioridad,
      materias: tarea.materias[0],
      fechaMax: tarea.fechaMax, 
      notas: tarea.notas || "",
      finalizada: tarea.finalizada ?? false
    };

    console.log(payload)

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const text = await res.text();
    console.log(text)

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(text);
    }

    if (!res.ok) {
      throw new Error(data?.message || "Error al crear tarea");
    }
    
    return data;

  } catch (error) {
    console.error("Error al crear tarea:", error.message);
    return null;
  }
};

// PUT - Actualizar producto
export const actualizarTarea = async (id, tarea) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        ...tarea
      })
    });

    return await handleResponse(res);
  } catch (error) {
    console.error("Error al actualizar tarea:", error.message);
    return null;
  }
};

export const marcarFinalizada = async (tarea) => {

  console.log(tarea)
  console.log(JSON.stringify(tarea))

  try {
    const res = await fetch(`${BASE_URL}/${tarea.id}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        ...tarea,
        finalizada:true
      })
    });

    return await handleResponse(res)
  } catch(error){
    console.error("Error al actualizar finalizada:",error.message);
    return null;
  }
}

// DELETE - Eliminar producto
export const eliminarTareaAPI = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      throw new Error("No se pudo eliminar");
    }

    return true;
  } catch (error) {
    console.error("Error al eliminar tarea:", error.message);
    return false;
  }
};