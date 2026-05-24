const BASE_URL = "http://127.0.0.1:8080/materias";


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
export const obtenerMaterias = async () => {
  try {
    const res = await fetch(BASE_URL);
    return await handleResponse(res);
  } catch (error) {
    console.error("Error al obtener materias:", error.message);
    return [];
  }
};

// POST - Crear producto
export const crearMateria = async (materia) => {
  try {

    const payload = {
      id: 0,
      nombre: materia.nombre,
      color: materia.color,
      notas: materia.notas
    };

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
      throw new Error(data?.message || "Error al crear materia");
    }
    
    return data;

  } catch (error) {
    console.error("Error al crear materia:", error.message);
    return null;
  }
};

// PUT - Actualizar producto
export const actualizarMateria = async (id, materia) => {


  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        ...materia
      })
    });

    return await handleResponse(res);
  } catch (error) {
    console.error("Error al actualizar materia:", error.message);
    return null;
  }
};

// DELETE - Eliminar producto
export const eliminarMateriaPI = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      throw new Error("No se pudo eliminar");
    }

    return true;
  } catch (error) {
    console.error("Error al eliminar materia:", error.message);
    return false;
  }
};