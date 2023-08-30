//  El evento DomContentLoaded escucha el DOM para saber si ya esta descargado todo el HTML
 document.addEventListener('DOMContentLoaded',function(){

   const email = {
      email: '',
      asunto:'',
      mensaje:''
   }


    // Seleccionar los elementos de las interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const fomrulario = document.querySelector('#formulario');
    const btnSubmint = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const sppiner = document.querySelector('#sppiner')


    // Asignar eventos
    inputEmail.addEventListener('input',validar);
    inputAsunto.addEventListener('input',validar);
    inputMensaje.addEventListener('input',validar);
    fomrulario.addEventListener('submit',enviarEmail);


       // FUNCION REINICIAR FORMULARIO DESDE EL OBJETO
   function resetearFormulario() {
           
      email.email = '';
      email.asunto = '';
      email.mensaje= '';
      fomrulario.reset();
      comprobarEmail();
}

    btnReset.addEventListener('click', function(e){
      e.preventDefault();
      resetearFormulario();
    })

   //  funcion para mostrar/ocultar sppiner
    function enviarEmail(e){
      e.preventDefault();
      sppiner.classList.add('flex')
      sppiner.classList.remove('hidden')

      setTimeout(() =>{
         sppiner.classList.remove('flex')
         sppiner.classList.add('hidden')
          resetearFormulario();

         //  CREAR ALERTA DE MENSAJE ENVIADO EXITOSAMENTE
         const alertaExito = document.createElement('P')
         alertaExito.classList.add('bg-green-500','text-white','p-2','text-center','rounded-lg','mt-10','font-bold','text-sm','uppercase');
         alertaExito.textContent = 'Mensaje Enviado Correctamente';

         fomrulario.appendChild(alertaExito);

         setTimeout(() =>{
            alertaExito.remove();
         },3000)
      },3000)
    }

    

   // FUNCION PARA VALIDAR QUE INGRESO EL USARIO
    function validar (e) {
      if(e.target.value.trim() === ""){
         mostrarAlerta(`El campo ${e.target.id} esta vacio`, e.target.parentElement);
         email[e.target.name] ='';
         comprobarEmail();
         // en caso de que el campo este vacio mostramos la alerta y el return se encarga de detener la ejecucion del codigo
         return;
      }

         if (e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es valido',e.target.parentElement)
            // Aqui limpiamos el objeto y luego comprobamos
            email[e.target.name] ='';
            comprobarEmail();
            return;
         }
         limpiarAlerta(e.target.parentElement);
         // ASIGNAR VALORES AL OBJETO
         email[e.target.name] = e.target.value.trim().toLowerCase()

         // COMPROBAR OBJETO DE E-MAIL
         comprobarEmail();
    }



    function mostrarAlerta (mensaje, referencia){
      // compraobar si ya exciste una alerta para que no se impriman muchas veces
      const alerta = referencia.querySelector('.alert')
      if(alerta){
         alerta.remove()
      }
      // generar alerta HTML
      const error = document.createElement("P")
      error.textContent = mensaje;
      error.classList.add('bg-red-600','text-white','p-2','text-center','alert')

      referencia.appendChild(error)
    }

   

    //LIMPIAR LA ALERTA DE ERROR SI ES QUE PASA LA VALIDACION
    function limpiarAlerta (referencia){
      const alerta = referencia.querySelector('.alert')
      if(alerta){
         alerta.remove();
      }
    }


   //  VALIDAR E-MAIL
   function validarEmail(email){
      const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 

      const resultado = regex.test(email);
      return resultado;
   }


   // COMPROBAR QUE TODOS LOS CAMPOS ESTEN LLENOS
   function comprobarEmail(){
      if(Object.values(email).includes('')){
         btnSubmint.classList.add('opacity-50')
         btnSubmint.disabled = true;
      }else{
         btnSubmint.classList.remove('opacity-50')
         btnSubmint.disabled = false;
      }
   }








 })//terminacion del document.addEvent


