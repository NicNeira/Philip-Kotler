// alert('Hola Mundo!!');

window.addEventListener('DOMContentLoaded', (e) => {
    // con DOMContentLoaded me aseguro que todas las etiquetas HTML fueron cargadas y procesadas por el browser
    // más info en: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event

    console.log('DOM fully loaded and parsed');


    let boton = document.getElementById('btn-suscribir');
    boton.addEventListener('click', (e) => {
    // try y catch para el manejo de errores 
        try {
        // recuperar los valores del formulario 
            let nombre = document.getElementById("nombre").value;
            console.log("El nombre del suscriptor es: " + nombre);

            let correo = document.getElementById('correo').value;
            console.log('El correo es: ' + correo);

            if ( nombre.length < 5 ){
                throw new Error ("El nombre es demasiado corto!!!")
            }

            let genero = getGenero();
            let interes = getIntereses();

            let suscriptor = { // JSON =  JavaScript object notation
                // clave: valor 
                nombre_completo: nombre, // nombre
                correo, // email: email,
                genero,
                interes,
                fecha_registro: (new Date()).toISOString()
            };

            console.dir(suscriptor);

            saveSuscriptor(suscriptor);
        } catch(e){
            mostrarError(e.message);
        }
        
        mensajeExitoso("Se ha creado el usuario exitosamente");
    

    });
   

});

 
// Api y Fecth arquitectura REST
// Al utilizar la alternativa async *HAY QUE AGREGARLA ANTES DE FUNCTION
async function saveSuscriptor( suscriptor ){
    const url = "https://curso-fronend-default-rtdb.firebaseio.com/suscriptores.json"; //Link de la api de firebase
    //alternativas:
    // 1) Callbacks
    // fetch(url, {
    //     method: "POST",
    //     body: JSON.stringify(suscriptor)  //Convierte un objeto json a string
    // })
    
    // .then(respuesta => respuesta.json() ) //Devuelve una Promesa | Cuando el browser reciba la respuesta y logre procesar el json
    // .then( data = mensajeExitoso("Se guardo correctamente su suscripción"));

    // 2) Async Await
    const respuesta = await fetch(url, {
        method: "Post",
        body: JSON.stringify(suscriptor)
    })

    const data = await respuesta.json();
    mensajeExitoso("Se guardo Correctamente su suscripción")

}

function getGenero(){
    let inputSeleccionado = document.querySelector("input[name='genero']:checked")
    if ( inputSeleccionado == null) {
        // Cuando lanzamos una exceptcion no es necesario la linea que retorne algun valor
        throw new Error("Debe seleccionar un género!");
    }
    const genero = inputSeleccionado.value;
    return genero;
};

function getIntereses(){
    let inputIntereses = document.querySelectorAll("input[name='intereses']:checked");
    let arrIntereses = [];
    inputIntereses.forEach(nodoInteres => arrIntereses.push(nodoInteres.value)); //Recorre cada uno de los elmentos y ejecuta el callback que colocamos como parametro
    if (inputIntereses.length < 1) {
        throw new Error("Debe seleccionar al menos un interes");
    }

    return arrIntereses;
}

// Aqui maneja el codigo de error de Try y cacht
function mostrarError (mensajeDeError){
    document.getElementById("form-mensaje-error").style.display = "block";
    // seleccionar un elemento del html
    const ul = document.querySelector("#form-mensaje-error ul");
    // crear un elemento dentro del html
    const li = document.createElement("li");
    // Crear un nodo de texto
    const liText = document.createTextNode(mensajeDeError);
    
    // 
    li.appendChild(liText);
    ul.appendChild(li);
};

function mensajeExitoso (mensaje){
    // Aparesca cuadro verde y se muestre el mensaje
    alert(mensaje);
    // document.getElementById("form-mensaje-exitoso").style.display = "block";
    // const ul = document.querySelector("#form-mensaje-exitoso ul");
    // // crear un elemento dentro del html
    // const li = document.createElement("li");
    // // Crear un nodo de texto
    // const liText = document.createTextNode(mensaje);
    // li.appendChild(liText);
    // li.appendChild(li);
}

// const errores = [] // array vacío 
// const nombre = getNombreDesdeForm();
// const edad = getEdadDesdeForm();
// if( !nombreEsValido(nombre)) {
//     errores = "El nombre no es válido";
// }
// if( edad < 18) {
//     errores = "Debe ser mayor de edad";
// }

// if( errores.length > 0) {
//     mostrarErrores(errores);
// } else {
//     guardarDatos(); 
// }
