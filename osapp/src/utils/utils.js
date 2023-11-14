import axios from "axios";

const baseUrl="https://backend.somee.com/api/login/";
//const baseUrl = "https://localhost:44308/api/login/";

export const peticionGetUtils = async (Usuario, Clave,Sucursal) => {
    const { data } = await axios.get(baseUrl+String(Clave)+'/'+Usuario+'/'+Sucursal).catch(error => console.log(error))
    return data
}

