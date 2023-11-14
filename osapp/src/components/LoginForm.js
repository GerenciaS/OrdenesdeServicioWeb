import React, { useState, useEffect } from "react";
import "./LoginForm.css";
import axios from "axios";
import { Layout, Button,   Row, Col, Typography,Form,Input,} from "antd";
import { peticionGetUtils } from "../utils/utils.js";
import Check from './Checkout'
const { Title } = Typography;
const { Footer, Content } = Layout;


const baseUrlSucursales = "https://backend.somee.com/api/establecimiento";
//const baseUrlSucursales = "https://localhost:44308/api/establecimiento";

function LoginForm() {
  const [Sucursales, setSucursales] = useState([]);
  const [showComponenteOS,setShowComponenteOS]= useState(false);


  const [user, setUser] = useState({ Usuario: '',Clave:'',Sucursal:0});

  const [userLogin, setUserLogin] = useState({Codigo:0,Nombre:"",Sucursal:0})
  
  useEffect(() => {
    peticionGetSucursales();
  }, []);

  const peticionGetSucursales = async () => {
    await axios.get(baseUrlSucursales).then((response) => { setSucursales(response.data);}).catch(
        (error) => {console.log(error);});
    };

  const IniciarSesion = async () => {

   

    if(user.Sucursal.toString()==='0') {
      alert("Sucursal Invalida.");
      return;
    }

    if(user.Usuario === undefined||user.Usuario==="") {
		alert("Usuario Invalido.");
		return;
	}
	if(user.Clave === undefined||user.Clave==="") {
		alert("Clave Invalida.");
		return;
	}
 

	const data = await peticionGetUtils(user.Usuario,user.Clave,user.Sucursal).catch(
        error => console.log(error));
        
  if(data[0].Codigo !==0) {

    setUserLogin({Nombre:data[0].Nombre,Codigo:data[0].Codigo,Sucursal:user.Sucursal})
    setShowComponenteOS(true);
	}
	 else {
    setUserLogin({Nombre: "",Codigo:0,Sucursal:0});
    alert("Favor de revisar las credenciales");
   } 
	}

  const submitHandler = (e) => {
    e.preventDefault();
    IniciarSesion(e);
  };


  const sucursalSeleccionadaChange = (event) => {
    setUser({Sucursal:event.target.value});
  };


  return (

    <div className="LoginForm">
      {!showComponenteOS ? ( <div> 
      <>
             <Layout className="layout-default layout-signin">
               <Content className="signin">
                 <Row gutter={[24, 0]} justify="space-around">
                   <Col
                     xs={{ span: 24, offset: 0 }}
                     lg={{ span: 6, offset: 2 }}
                     md={{ span: 12 }}
                   >
                     <h2 > Iniciar Sesión</h2>
                     <Title className="font-regular text-muted" level={5}>
                     Seleccione la sucursal e ingrese su usuario y contraseña para iniciar sesión
                     </Title>
                     <Form onSubmitCapture={submitHandler}
                       layout="vertical"
                       className="row-col"
                     >
     
             <select  id={"Sucursal"} className={"form-select"} onChange={sucursalSeleccionadaChange}  value={user.Sucursal}> 
             <option value={0}> Seleccione una sucursal </option>
                 {Sucursales.map((sucurs, idx) => (
                 <option key={idx} value={sucurs.ID}>{" "}{sucurs.Nombre}{" "}</option>
                 ))}
               </select>
               <br></br>
                         
                       <Form.Item
                         className="username" label="Usuario" name="usuario" 
                         onChange={e=> setUser({...user,Usuario:e.target.value})} value={user.Usuario}
                         rules={[{required: true,message: "Por favor ingrese el usuario",},]}
                      >
                         <Input placeholder="Usuario" />
                       </Form.Item>
     
                       <Form.Item
                         className="username"
                         label="Contraseña"
                         name="clave"
                         onChange={e=> setUser({...user,Clave:e.target.value})} value={user.Clave}
                         rules={[
                           {
                             required: true,
                             message: "Por favor ingrese su clave",
                           },
                         ]}
                        
                       >
                         <Input type="password" placeholder="Contraseña" />
                       </Form.Item>
     
                       
                       <Form.Item>
                         <Button type="primary" htmlType="submit" style={{ width: "100%" }} > 
                           INICIAR SESION
                         </Button>
                       </Form.Item>
                     
                     </Form>
                   </Col>
                   <Col
                     className="sign-img"
                     style={{ padding: 12 }}
                     xs={{ span: 24 }}
                     lg={{ span: 12 }}
                     md={{ span: 12 }}
                   >
                     <img src={"https://i.imgur.com/IgpxcMq.png"} alt="" />
                   </Col>
                 </Row>
               </Content>
               
               <Footer>
                 <p className="copyright">  Copyright © 2023 Mercado de importaciones | Departamento de mejora continua </p>
               </Footer>
             </Layout>
           </>
       </div>
     ):(<Check Usuario={userLogin.Codigo} Nombre={userLogin.Nombre} Sucursal={userLogin.Sucursal}/>)}
    </div>
    
 

  );
}

export default LoginForm;