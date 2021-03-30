function login(){      
    let form = document.forms["form_login"];
    if(!document.getElementById("form_login").email.value) alert("Brak emaila");
    else if(!document.getElementById("form_login").password.value) alert("Brak hasła");
    else{
        let fd = new FormData(form);
        let data = {};
        for (let [key, prop] of fd) {
        data[key] = prop;
        }
        VALUE = JSON.stringify(data, null, 2);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        fetch('http://localhost:3013/login', {
            method: 'POST',
            headers: myHeaders,
            body: VALUE,
            redirect: 'follow'
        })
        .then(response => {
            if (response.status == 200) {
                sessionStorage.setItem('status', 'ok');
                form.reset();
                toMain();
            }
        })
        .catch((err) => {
            console.error(err);
            alert("Brak połączenia z serwerem\nWróc do trybu online, żeby się zalogować");
        })    
        form.reset();   
    }  
}

function check(){
    if (sessionStorage.getItem('status') != null)
        return true;
    else
        return false;
         
}


function register(){   
    let form = document.forms["form_register"];
    if(!document.getElementById("form_register").email.value) alert("brak emaila");
    else if(!document.getElementById("form_register").password.value) alert("brak hasła");
    else{
        let fd = new FormData(form);
        let data = {};
        for (let [key, prop] of fd) {
        data[key] = prop;
        }
        VALUE = JSON.stringify(data, null, 2);

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        fetch('http://localhost:3013/register', {
            method: 'POST',
            headers: myHeaders,
            body: VALUE
        })
        .then(alert("Pomyślnie zarejestrowano użytkownika"))
        .then(form.reset())
        .then(showLogin())
        .catch((err) => {
            console.error(err);
            alert("Brak połączenia z serwerem\nWróc do trybu online, żeby się zarejestrować");
        })
          
    }
}

function logout(){   
    sessionStorage.removeItem('status');
    const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');   
        fetch('http://localhost:3013/logout', {
            method: 'GET',
            headers: myHeaders,
        })
        .then(data =>  { console.log(data) }) 
        .catch((err) => {
            console.error(err);
        })
        toMain();
 }

 function sendToBase(){
    var dbName = 'mytestdb';
    var storeName = 'myteststore';
    var TransactionMode = {
            RONLY : 'readonly',
            RW : 'readwrite'
        };
    let db;
    const request = window.indexedDB.open(dbName, 1);
    request.onsuccess = async ()=>{
        db =request.result;
        db.transaction(storeName, TransactionMode.RW).objectStore(storeName).getAll().onsuccess = (ev => {
            let result = ev.target.result;
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
                result.forEach((element)=>{
                   fetch('http://localhost:3013/insert', {
                        method: 'POST',
                        headers: myHeaders,
                        body: (JSON.stringify(element))
                    })
                    .catch((err) => {
                        console.error(err);
                    })
                });
                db.transaction(storeName,TransactionMode.RW).objectStore(storeName).clear();
                alert("Pomyślnie przesłano dane");
                showData();
        });
    };
}