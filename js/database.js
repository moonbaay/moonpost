import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyAxiJjFxOergkjMQQaXoslLFbR84FIwLgI",
  authDomain: "moonpost-user.firebaseapp.com",
  databaseURL: "https://moonpost-user-default-rtdb.firebaseio.com",
  projectId: "moonpost-user",
  storageBucket: "moonpost-user.appspot.com",
  messagingSenderId: "751824982960",
  appId: "1:751824982960:web:d9b5e13d7b12afad077c75",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import {
  getDatabase,
  ref,
  set,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

const db = getDatabase();

var firstName, lastName, eMail, password, username;

const selectElement = (element) => {
  return document.querySelector(element);
};

function getUserInput() {
  firstName = selectElement("#firstname").value;
  lastName = selectElement("#lastname").value;
  eMail = selectElement("#email").value;
  password = selectElement("#password").value;
  username = selectElement("#username").value;
}

function postUserToFireBase(){
     getUserInput();
     set(ref(db, "moonpost-user/" + username), {
       firstname: firstName,
       lastname: lastName,
       email: eMail,
       username: username,
       password: password,
     })
       .then(() => {
         //   alert("data store successfully");
         message("account successfully create");
       })
       .catch((error) => {
         alert("unsuccessful, error " + error);
       });
  
}
const registerBtn = selectElement(".sign-up-btn");

registerBtn.addEventListener("click", postUserToFireBase);

//create message
function message(message_txt) {
    const messageOverlayActivated = selectElement(".message-overlay");
    messageOverlayActivated.classList.toggle('activated')
    const messageEl = selectElement(".message-txt");
    messageEl.textContent = message_txt
    const modalCloseBtn = selectElement('.modal-close-btn')

    modalCloseBtn.addEventListener('click', function(){
        messageOverlayActivated.classList.remove('activated')
        getUserInput()
        firstName=''
        lastName=''
        eMail=''
        username=''
        password=''
    })
}
