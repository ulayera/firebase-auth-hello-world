
// No estamos utilizando un bundler aquí, solo un proyecto html/js básico
// por lo tanto, estamos accediendo a Firebase desde la CDN
// Si tienes un bundler, puedes importar Firebase directamente de esta manera:
// import firebase from 'firebase/app'
// import 'firebase/auth'

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-auth.js";

// Configuración de Firebase:

// Comentar esto si se incluye la configuracion en la variable mas abajo,
// dejar si se tiene el archivo "./firebase-config"
import { firebaseConfig } from "./firebase-config";
// Descomentar esto si no se importa el archivo de arriba
// const firebaseConfig = {
//   apiKey: "",
//   authDomain: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: "",
// };

// Inicializar Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

// Referencias a elementos del DOM
const loginButton = document.getElementById("login");
const logoutButton = document.getElementById("logout");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const statusSpan = document.getElementById("status");

// Listener para el botón de inicio de sesión
loginButton.addEventListener("click", () => {
  login(emailInput.value, passwordInput.value);
});

// Listener para el botón de cierre de sesión
logoutButton.addEventListener("click", () => {
  logout();
});

// Lógica de Iniciar sesión
function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Usuario conectado:", userCredential.user.email);

      // ocultamos el botón de inicio de sesión y mostramos el de cierre de sesión
      loginButton.style.display = "none";
      logoutButton.style.display = "block";

      //deshabilitamos los campos de texto y limpiamos el campo de contraseña
      emailInput.disabled = true;
      passwordInput.disabled = true;
      passwordInput.value = "";

      // mostramos el estado de la sesión
      statusSpan.innerHTML = "Conectado como " + userCredential.user.email;
    })
    .catch((error) => {
      console.error("Error al iniciar sesión:", error.message);
      // mostramos el mensaje de error
      statusSpan.innerHTML = error.message;
    });
}

// Lógica de Cerrar sesión
function logout() {
  auth.signOut().then(() => {
    console.log("Usuario desconectado");

    // ocultamos el botón de cierre de sesión y mostramos el de inicio de sesión
    loginButton.style.display = "block";
    logoutButton.style.display = "none";

    // habilitamos los campos de texto
    emailInput.disabled = false;
    passwordInput.disabled = false;

    // mostramos el estado de la sesión
    statusSpan.innerHTML = "No conectado";
  }).catch((error) => {
    console.error("Error al desconectar al usuario:", error.message);
    // mostramos el mensaje de error
    statusSpan.innerHTML = error.message;
  });
}