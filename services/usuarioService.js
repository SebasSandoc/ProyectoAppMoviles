const BASE_URL = "http://127.0.0.1:8080/usuarios";


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

export const obtenerUsuarioCorreo = async (correo) => {
    try{
        const res = await fetch(`${BASE_URL}/correo/${correo}`)
        //const data = await handleResponse(res)

        if (res.status === 404) {
            return null;
        }

        return await res.json();
    }catch(error){
        console.log("error al buscar usuario por correo: ",error.message)
        return null
    }
}

// GET - Obtener productos
export const obtenerUsuarios = async () => {
  try {
    const res = await fetch(BASE_URL);
    return await handleResponse(res);
  } catch (error) {
    console.error("Error al obtener usuarios:", error.message);
    return [];
  }
};

// POST - Crear producto
export const crearUsuario = async (usuario) => {
  try {

    console.log(usuario)

    const payload = {
      id: 0,
      nombre: usuario.nombre,
      usuario: usuario.usuario,
      correo: usuario.correo,
      contrasenia: usuario.contrasenia
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
      throw new Error(data?.message || "Error al crear usuario");
    }
    
    return data;

  } catch (error) {
    console.error("Error al crear usuario:", error.message);
    return null;
  }
};

// PUT - Actualizar producto
export const actualizarUsuario = async (id, usuario) => {
  try {
    console.log(id)
    console.log(usuario)

    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        ...usuario
      })
    });

    return await handleResponse(res);
  } catch (error) {
    console.error("Error al actualizar usuario:", error.message);
    return null;
  }
};

// DELETE - Eliminar producto
export const eliminarUsuarioAPI = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      throw new Error("No se pudo eliminar");
    }

    return true;
  } catch (error) {
    console.error("Error al eliminar usuario:", error.message);
    return false;
  }
};