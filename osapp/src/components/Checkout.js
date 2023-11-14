import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css"
import FinishForm from "./FinishForm";
export default function Checkout({Usuario,Nombre,Sucursal}) {

//const baseUrlEmpleadosTicket="https://backend.somee.com/api/empleadosticket/";
const baseUrlDepartamentosTicket="https://backend.somee.com/api/departamento/";
const baseUrlOrdenServicio="https://backend.somee.com/api/ordenservicio/";

 //const baseUrlEmpleadosTicket = "https://localhost:44308/api/empleadosticket/";
 //const baseUrlOrdenServicio = "https://localhost:44308/api/ordenservicio/";
 //const baseUrlDepartamentosTicket = "https://localhost:44308/api/departamento/";

 const [showComponenteSolic,setShowComponenteSolic]= useState(false);
const [departamentosTicket, setDepartamentosTicket] = useState([]);
const [ordenServicio, setordenServicio] = useState({
  
  Asunto: '',
	Descripcion: '',
	CodigoDepartamento: 0,
	Idestablecimiento: parseInt(Sucursal),
	CodigoPrioridad: 0,
	UsuarioRegistro: parseInt(Usuario)
}

);

  useEffect(() => {
    peticionGetDepartamentos();
  }, []);

  const peticionGetDepartamentos = async () => {
    await axios.get(baseUrlDepartamentosTicket).then((response) => { setDepartamentosTicket(response.data);}).catch(
        (error) => {console.log(error);});
    };


    const handleSubmit= async()=>{
      try {
        const resp = await axios.post(baseUrlOrdenServicio, { 
          Asunto:ordenServicio.Asunto,
          Descripcion:ordenServicio.Descripcion,
          CodigoDepartamento: ordenServicio.CodigoDepartamento,
          Idestablecimiento: ordenServicio.Idestablecimiento,
          CodigoPrioridad: ordenServicio.CodigoPrioridad,
          UsuarioRegistro: ordenServicio.UsuarioRegistro
      });
      console.log(resp.data);

      if(resp.data==='1'){
          console.log('REGISTRO')
          setShowComponenteSolic(true);
      }
      } catch (error) {
        console.log(error.response.data);
      }
    }

  return (
    
   <div>
       {!showComponenteSolic ? (  <div>
      <center>  
         <img src={"https://i.imgur.com/IgpxcMq.png"} alt={"Logo"}  width={"250"} height={"75"} />  
         </center>
         <header> 
  <center>
  <div className="legend">
    <fieldset> 
      <legend > Información      
      <p> Usuario:   {Usuario}  </p>
         <p>  Nombre: {Nombre}    </p>
         <p>  Sucursal: {Sucursal} </p>
      </legend>
        
    </fieldset>
   </div>     
   </center>   
</header>

    
<form className= {"cf"}>
  <h1>Solicitud orden de servicio</h1>

  <div>

  <br></br>
  <br></br>

  <select  id={"Prioridad"} className={"form-select"} onChange={e=> setordenServicio({...ordenServicio,CodigoPrioridad:parseInt(e.target.value)})} value={ordenServicio.CodigoPrioridad}> 
        <option value={0}> Seleccione una prioridad </option>    
        <option className={"optionBaja"}value={1}> Baja </option>    
        <option className={"optionMedia"}value={2}> Media </option>    
        <option className={"optionAlta"}value={3}> Alta </option>    
  </select>
  
  <br></br>
  
  <select  id={"Departamentosticket"} className={"form-select"} onChange={e=> setordenServicio({...ordenServicio,CodigoDepartamento:parseInt(e.target.value)})} value={ordenServicio.CodigoDepartamento}> 
        <option value={0}> Seleccione un Departamento </option>    
        {departamentosTicket.map((dep, idx) => (<option key={idx} value={dep.Codigo}>{" "}{dep.Descripcion}{" "}</option>))}
  </select>

  <input type= {"text"} id={"input-subject"} placeholder={"Asunto"} onChange={e=> setordenServicio({...ordenServicio,Asunto:e.target.value})} value={ordenServicio.Asunto}></input>

  <div>
    <textarea name={"message"} type={"text"} id={"input-message"} placeholder={"Descripción del problema"} onChange={e=> setordenServicio({...ordenServicio,Descripcion:e.target.value})} value={ordenServicio.Descripcion} ></textarea>
  </div>

  </div>


</form>
<button onClick={handleSubmit} type="button" className="btn btn-primary btn-lg btn-block" style={{ width: "100%" }} >Enviar</button>

    </div>  
    ):(<FinishForm/> )}
       
   </div>
    
  );
}