
let liczba = Math.floor(Math.random() * 10000);  
document.getElementById("navform").innerHTML = 'Numer ankiety: ';
document.getElementById("navform").innerHTML += liczba;

function sendAnswers(){
    if(check()){ //sprawdzenie czy użytkownik jest zalogowany 
        // zalogowany - wysyłanie do mongoDB
        let form = document.forms["form_ecology"];
        if(!document.getElementById("form_ecology").place.value) alert("brak odpowiedzi na pytanie nr 1");
        else if(!document.getElementById("form_ecology").segregation.value) alert("brak odpowiedzi na pytanie nr 2");
        else if(!document.getElementById("form_ecology").disposable.value) alert("brak odpowiedzi na pytanie nr 3");
        else if(!document.getElementById("form_ecology").smog.value) alert("brak odpowiedzi na pytanie nr 4");
        else if(!document.getElementById("form_ecology").date.value) alert("brak zaznaczonej daty");
        else{
            let fd = new FormData(form);
            let data = {};
            data["number"] = liczba;
            for (let [key, prop] of fd) {
            data[key] = prop;
            }
            
            VALUE = JSON.stringify(data, null, 2);
            console.log(VALUE);

            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');

            fetch('http://localhost:3013/form', {
                method: 'POST',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: VALUE
            })
            .then(alert("Dziękujemy za wypełnienie ankiety!"))
            .then(data =>  { console.log(data) }) 
            .catch((err) => {
                console.error(err);
            })
            form.reset();
            liczba = Math.floor(Math.random() * 10000); 
            document.getElementById("navform").innerHTML = 'Numer ankiety: ';
            document.getElementById("navform").innerHTML += liczba;
            showData();
        }
    }
    else{
        // niezalogowany - indexedDB
        
        if(!document.getElementById("form_ecology").place.value) alert("brak odpowiedzi na pytanie nr 1");
        else if(!document.getElementById("form_ecology").segregation.value) alert("brak odpowiedzi na pytanie nr 2");
        else if(!document.getElementById("form_ecology").disposable.value) alert("brak odpowiedzi na pytanie nr 3");
        else if(!document.getElementById("form_ecology").smog.value) alert("brak odpowiedzi na pytanie nr 4");
        else if(!document.getElementById("form_ecology").date.value) alert("brak zaznaczonej daty");
        else{
            let place = document.getElementById("form_ecology").place.value;
            let segregation = document.getElementById("form_ecology").segregation.value;
            let disposable = document.getElementById("form_ecology").disposable.value;
            let smog = document.getElementById("form_ecology").smog.value;
            let date = document.getElementById("form_ecology").date.value;

            if (!window.indexedDB) {
                window.indexedDB = window.indexedDB || window.webkitIndexedDB ||
                    window.mozIndexedDB || window.oIndexedDB || window.msIndexedDB;
            }

            var dbName = 'mytestdb';
            var storeName = 'myteststore';
            var TransactionMode = {
                    RONLY : 'readonly',
                    RW : 'readwrite'
                };

            function createMyStore(db) {
                var store = db.createObjectStore(storeName, {
                    autoIncrement : true
                });
                var index = store.createIndex("numdate", ["number", "date"]);
            }

            var keyValue = undefined;

            var request = window.indexedDB.open(dbName, 1);

            request.onsuccess = function(event) {
                var db = event.target.result;
                var t = db.transaction([storeName], TransactionMode.RW);
                var store = t.objectStore(storeName);
                    store.put({
                        number: liczba,
                        date: date,
                        place : place,
                        segregation : segregation,
                        disposable : disposable,
                        smog : smog
                    }, keyValue);
                    alert("Dziękujemy za wypełnienie ankiety!");
                    document.getElementById("form_ecology").reset()
                    liczba = Math.floor(Math.random() * 10000); 
                    document.getElementById("navform").innerHTML = 'Numer ankiety: ';
                    document.getElementById("navform").innerHTML += liczba;
                    showData();
            };

            request.onupgradeneeded = function(event) {
                var db = event.target.result;
                createMyStore(db);
                
            };
            
        }
    }
}

