

const selectElement = (element) => {
  return document.querySelector(element);
};


const headerOnScroll = () => {
  const headerEl = selectElement("#header");

  if (this.scrollY >= 15) {
    headerEl.classList.add("activated");
  } else {
    headerEl.classList.remove("activated");
  }
};

window.addEventListener("scroll", headerOnScroll);

const menuToggleBtn = selectElement("#menu-toggle-icon");

const toggleMenu = () => {
  const menu = selectElement("#menu");
  menu.classList.toggle("activated");
  menuToggleBtn.classList.toggle("activated");
}; 

menuToggleBtn.addEventListener("click", toggleMenu);

const bodyEl = document.body;
const themeToggleBtn = selectElement("#theme-toggle-btn");
const currentTheme = localStorage.getItem("currentTheme");

if (currentTheme) {
  bodyEl.classList.add("light-theme");
}

themeToggleBtn.addEventListener("click", function () {
  bodyEl.classList.toggle("light-theme");

  if (bodyEl.classList.contains("light-theme")) {
    localStorage.setItem("currentTheme", "themeActive");
  } else {
    localStorage.removeItem("currentTheme");
  }
});
const dt = new Date();

function getPublishDate() {
  return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;
}
function timeStampConversion() {
  return `${dt.getHours()}:${dt.getMinutes()}:${dt.getMilliseconds()}`;
}

function generateID() {
  return Math.floor(Math.random() * 100000);
}

// create db
function getLocalStorage() {
  return localStorage.getItem("blogDB")
    ? JSON.parse(localStorage.getItem("blogDB"))
    : [];
}
function addToLocalStorage(
  id,
  title,
  paragraph,
  author,
  date,
  time,
  image,
  category
) {
  const postDB = { id, title, paragraph, author, date, time, image, category };
  const item = getLocalStorage();
  item.push(postDB);
  localStorage.setItem("blogDB", JSON.stringify(item));
}
//create blog
function createBlog() {
  const titleEl = selectElement("#title");
  const paragraphEl = selectElement("#paragraph");
  const imageEl = selectElement("#blog-image");
  const authorEl = selectElement("#author");
  const categoryEl = selectElement("#category");

  addToLocalStorage(
    generateID(),
    titleEl.value,
    paragraphEl.value,
    authorEl.value,
    getPublishDate(),
    timeStampConversion(),
    imageEl.files[0].name,
    categoryEl.value
  );
}

//get image

// function getImage(file_input){

//     return file_input.addEventListener('change',function(){
//         const reader = new FileReader()
//         reader.addEventListener('load',()=>{
//             const uploaded_image = reader.result
//             const displayImage = document.querySelectorAll('.blog-image')

//             displayImage.forEach(item=>{
//                 item.getElementsByClassName.backgroundImage = `url(${uploaded_image})`
//             })
//         })
//     })
// }

//get post blog html
function getPostHtml() {
  const postDB = getLocalStorage();
  return postDB
    .map((post) => {
      return `
        <a href="#single-post" class="post-item" id="${post.id}">
            <div class="blog-image">
                <img src="./images/${post.image}"
            </div>
            <h1 class="title">${post.title}</h1>
             <p class="paragraph">${post.paragraph}</p>

            <p class="author">Author: ${post.author} <span class="date-time">Publish Date:${post.date} ${post.time}</span></p>
        </a>
        `;
    })
    .join("");
}

//view single blog
function singlePost(item) {
  const singlePostEl = selectElement(".single-post");

  singlePostEl.innerHTML = item.innerHTML;
  console.log(item.getAttribute("id"));
}

//post blog
function postBlog() {
  let postDB = getLocalStorage();
  const postList = selectElement(".post-list");
  // postList.innerHTML = getPostHtml()

  postDB.forEach((item) => {
    const itemA = document.createElement("a");
    itemA.classList.add("post-item");
    itemA.classList.add("swiper-slide");
    itemA.setAttribute("id", item.id);
    const blogImageContainer = document.createElement("div");
    blogImageContainer.classList.add("blog-image");
    postList.appendChild(itemA);
    itemA.href = `#single-post`;
    const imgSrc = document.createElement("img");
    imgSrc.src = `./images/${item.image}`;
    itemA.appendChild(blogImageContainer);
    blogImageContainer.appendChild(imgSrc);
    const titleH1 = document.createElement("h1");
    titleH1.textContent = item.title;
    itemA.appendChild(titleH1);
    const paragraphP = document.createElement("p");
    paragraphP.textContent = item.paragraph;
    itemA.appendChild(paragraphP);
    const authorP = document.createElement("p");
    authorP.textContent = "Author: " + item.author;
    itemA.appendChild(authorP);
    const dateTimeP = document.createElement("p");
    dateTimeP.textContent = `Publish Date: ${item.date}`;
    itemA.appendChild(dateTimeP);
  });
}

postBlog();
const submit = selectElement(".post");

submit.addEventListener("click", function () {
  createBlog();
});

const closeFeaturedPost = selectElement('#featured-post')
const signupForm = selectElement('#signup-form')
const blogPage = selectElement("#blog-form")
const loginPage = selectElement('#login-form')

function closeFeaturedPage(){
    closeFeaturedPost.classList.remove("featured-post-block");
}
function openFeaturedPage(){
    closeFeaturedPost.classList.add("featured-post-block");
}
function closeSignUpPage(){
    signupForm.classList.remove('activated')
}
function openSignupPage(){
    signupForm.classList.add('activated')
}
function openLoginPage(){
    loginPage.classList.add('activated')
}
function closeLogin(){
    loginPage.className =''
}
function openBlogPage(){
    blogPage.classList.add('activated')
}
function closeBlogPage(){
    blogPage.classList.remove("activated");
}
const signupLink = selectElement('.signup-link')
const homeLink = selectElement('.home-link')
const signinLink =selectElement('.signin-link')

function displaySignUpForm(){
    closeFeaturedPage();
    closeBlogPage();
    closeLogin();
    openSignupPage()

}
function displayFeaturedPage(){
    openFeaturedPage();
    closeBlogPage()
    closeSignUpPage()
    closeLogin()
    
}
function displaySigninPage(){
    closeSignUpPage();
    closeFeaturedPage();
    closeBlogPage();
    openLoginPage()

}
signupLink.addEventListener('click', displaySignUpForm)
homeLink.addEventListener('click',displayFeaturedPage)
signinLink.addEventListener('click',displaySigninPage)

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

function getUserInput() {
  firstName = selectElement("#firstname").value;
  lastName = selectElement("#lastname").value;
  eMail = selectElement("#email").value;
  password = selectElement("#password").value;
  username = selectElement("#username").value;
}

function postUserToFireBase() {
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
  messageOverlayActivated.classList.toggle("activated");
  const messageEl = selectElement(".message-txt");
  messageEl.textContent = message_txt;
  const modalCloseBtn = selectElement(".modal-close-btn");

  modalCloseBtn.addEventListener("click", function () {
    messageOverlayActivated.classList.remove("activated");
    getUserInput();
    firstName = "";
    lastName = "";
    eMail = "";
    username = "";
    password = "";
  });
}
