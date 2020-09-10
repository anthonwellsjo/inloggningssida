///////////////////////////////////////////Globala variabler

const NAMN = "test";
const PASS = "1234";

document.body.onload = initializeApp;

//första funktion. Initialiserar app

function initializeApp() {
    const user = getUserName();
    if (userIsLoggedIn()) {
        loadUserPage(user);
    } else {
        loadStartPage();
    }
}

function loadStartPage() {
    const startPage = createStartPage();
    appendPage(startPage);
    createLoginButtonEventHandlers();
    createInputFieldsEventHandler();
}

function loadUserPage(name) {
    const userPage = createUserPage(name);
    appendPage(userPage);
    createLogoutButtonEventHandler();
}

function loadLoginFailedPage() {
    const failPage = createFailPage();
    appendPage(failPage);
    createBackButtonEventHandler();
}

//////////////////////////////////////////////Start Page Render -funktioner.
//skapar rendering av starsidan
const createStartPage = () => {
    let div = document.createElement("div");
    div.setAttribute("id", "div-form");
    div.innerHTML = (
        "<h1>Välkommen!</h1><br><form><label class='label' for='name'>Namn:</label><br><input type='text' class='input' id='name'><br><label for='pass' class='label'>Lösenord:</label><br><input type='text' id='pass' class='input'><br><br><br><button class='button' id='log-in-btn'>Logga in</button></form>"
    );
    return div;
}

//lägger till vår renderade vy i appen.
const appendPage = page => {
    const app = document.getElementById("app");
    //om inte vår vy redan finns så tas föregående vy bort och vår nya vy läggs till
    console.log("gammal vy:", app.firstChild, "ny vy", page);
    if (app.firstChild !== page) {
        app.innerHTML = '';
        app.appendChild(page);
    }

}

//skapar event handlers för logga-in-knapp på startsidan
const createLoginButtonEventHandlers = () => {
    document.getElementById("log-in-btn").addEventListener("click", e => {
        e.preventDefault();
        onLoginBtnClickedEventHandler();
    });
}

//skapar event handler för input-fält på startsidan - vid focus tas röd ram bort
const createInputFieldsEventHandler = () => {
    let name = document.getElementById("name");
    let pass = document.getElementById("pass");
    name.addEventListener("focus", () => removeRedBorder(name));
    pass.addEventListener("focus", () => removeRedBorder(pass));

}

////////////////////////////////////////////Failed Log In Page Render - funktioner
//skapa rendering av login fail-vy
const createFailPage = () => {
    let div = document.createElement("div");
    div.setAttribute("id", "frame");
    div.innerHTML = (
        `<header><h1>Sorry, ingen användare med det namnet och lösenordet finns här...</h1><header><br><button class="button" id='back-btn'>Tillbaka</button>`
    );
    return div;
}

const createBackButtonEventHandler = () => {
    document.getElementById("back-btn").addEventListener("click", onBackBtnClickedEventHandler);
}




////////////////////////////////////////////////User Page Render -funktioner

const createUserPage = name => {
    let div = document.createElement("div");
    div.setAttribute("id", "frame");
    div.innerHTML = (
        `<header><h1>Välkommen till din sida <u><i>${name}</i></u> !</h1><header><br><img src='https://picsum.photos/200/300' alt='random photo'/><br><br><br><button class="button" id='log-out-btn'>Logga ut</button>`
    );
    return div;
}

const createLogoutButtonEventHandler = () => {
    document.getElementById("log-out-btn").addEventListener("click", onLogoutBtnClickedEventHandler);
}


////////////////////////////////////////////////////Event Handlers
//kontrollerar inputs osv för validering + UI-design vid fel
const onLoginBtnClickedEventHandler = () => {
    const namn = document.getElementById("name").value;
    const pass = document.getElementById("pass").value;
    //om det finns namn och pass i inputen gör validering, annars gå till UI-design för fel
    if (namn && pass) {
        if (passwordChecksOut(namn, pass)) {
            loginUser(namn);
            loadUserPage(namn);
        } else {
            loadLoginFailedPage();
        }
    } else {
        shakeLoginWindow();
        paintInputColors(namn, pass);
    }
}

const onLogoutBtnClickedEventHandler = () => {
    logOutUser();
    loadStartPage();
}

const onBackBtnClickedEventHandler = () => {
    loadStartPage();
}


/////////////////////////////////////////////////Authentication - relaterade funktioner

const passwordChecksOut = (inpName, inpPass) => {
    return (inpName === NAMN && inpPass === PASS);
}

const loginUser = name => {
    localStorage.setItem("activeUser", name);
}

//kollar om någon user finns på key-pairet "activeUser", booleansk retur
const userIsLoggedIn = () => {
    return (localStorage.getItem("activeUser") !== null);
}

const getUserName = () => {
    return localStorage.getItem("activeUser");
}

//vår activeUser tas bort, så att vid refresh av sidan loggas man inte in automatiskt
const logOutUser = () => {
    localStorage.removeItem("activeUser");
}





//////////////////////////// UI-relaterade funktioner
//lägger till shakey-class i 1 sek för animerings-effekt
const shakeLoginWindow = () => {
    const div = document.getElementById("div-form");
    div.classList.add("shakey");
    setTimeout(() => {
        div.classList.remove("shakey");
    }, 1000)
}

//målar röda ramar på inputs
const paintInputColors = (namn, pass) => {
    let nameInp = document.getElementById("name");
    let passInp = document.getElementById("pass");
    if (!namn) {
        addRedBorder(nameInp);
    }
    if (!pass) {
        addRedBorder(passInp);
    }
}

//måla elementets ram röd
const addRedBorder = (element) => {
    element.classList.add("red-border");
}

//ta bort elementets röda ram
const removeRedBorder = (element) => {
    element.classList.remove("red-border");
}