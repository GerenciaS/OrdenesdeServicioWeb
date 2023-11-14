<>
			<Formik
				initialValues={{
					nombre: '',
					correo: ''
				}}
				validate={(valores) => {
					let errores = {};

					// Validacion nombre
					if(!valores.nombre){
						errores.nombre = 'Por favor ingresa un nombre'
					} else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)){
						errores.nombre = 'El nombre solo puede contener letras y espacios'
					}

					// Validacion correo
					if(!valores.correo){
						errores.correo = 'Por favor ingresa un correo electronico'
					} else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.correo)){
						errores.correo = 'El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.'
					}

					return errores;
				}}
				onSubmit={(valores, {resetForm}) => {
					resetForm();
					console.log('Formulario enviado');
					cambiarFormularioEnviado(true);
					setTimeout(() => cambiarFormularioEnviado(false), 5000);
				}}
			>
				{( {errors} ) => (
					<Form className="formulario">

						
						<div>
							<img src="https://i.imgur.com/ZZHfIwm.png" alt='Logo' width="250" height="75"/>
      
							<label htmlFor="usuariologin">Usuario :479</label>
							<label htmlFor="usuariologin">Nombre: Javier Eduardo Rodriguez Lugo</label>
							<label htmlFor="usuariologin">Puesto: Programador</label>
						</div>
<fieldset>

						<div>
							<label  htmlFor="nombre">Departamento que antenderá</label>
							<select> </select>
						</div> 
						<div>
							<Field name="Asunto" as="textarea" placeholder="Asunto" />
						</div>

						<button type="submit">Enviar</button>
						{formularioEnviado && <p className="exito">Formulario enviado con exito!</p>}
						</fieldset>
					</Form>
				)}
			</Formik>
		</>