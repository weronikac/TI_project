var myDiv = document.getElementById("info");

function showData(){ 
    document.getElementById("charts").style.display = "block";
    document.getElementById("form").style.display = "none";
    document.getElementById("navform").style.display = "none";
    document.getElementById("dok").style.display = "none";
    whichNav();

    if(check()){  
        document.getElementById("info").style.display = "none";
        fetch('http://localhost:3013/showdata', {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        })
        .then(response => { 
            response.text().then( data => {

              var pl = [0, 0];
              var seg = [0, 0];
              var dis = [0, 0, 0];
              var sm = [0, 0, 0];

              table = JSON.parse(data);
              for(var i=0; i<table.length;i++){
                  if(table[i].place == 'village') pl[0]++;
                  if(table[i].place == 'town') pl[1]++;

                  if(table[i].segregation == 'yes') seg[0]++;
                  if(table[i].segregation == 'no') seg[1]++;

                  if(table[i].disposable == 'often') dis[0]++;
                  if(table[i].disposable == 'rarely') dis[1]++;
                  if(table[i].disposable == 'never') dis[2]++;

                  if(table[i].smog == 'smog_yes') sm[0]++;
                  if(table[i].smog == 'smog_no') sm[1]++;
                  if(table[i].smog == 'smog_no_opinion') sm[2]++;                 
              }
              drawplace(pl);
              drawsegregation(seg);
              drawdisposable(dis);
              drawsmog(sm);

            }) ;
         })
        .catch(error => console.log("Błąd: ", error)); 
    }
     else{
        document.getElementById("info").style.display = "block";
        const dbName = 'mytestdb';
        const version = 1;
        const storeName = 'myteststore';
        let db;
        const request = window.indexedDB.open(dbName, version);
        request.onsuccess = async ()=>{
            db =request.result;
            db.transaction(storeName, 'readwrite').objectStore(storeName).getAll().onsuccess = (ev => {
                let result = ev.target.result;
                myDiv.innerHTML = '';
                myDiv.innerHTML += '<h2>Przeglądasz wyniki z bazy przeglądarki</h2>';
                if(result.length == 0){
                    myDiv.innerHTML += '<h1>Baza offline jest pusta</h1><h2>Wypełnij ankietę lub zaloguj się, żeby zobaczyć więcej wyników</h2>';
                } 
                var ploff = [0, 0];
                var segoff = [0, 0];
                var disoff = [0, 0, 0];
                var smoff = [0, 0, 0];
                result.forEach((element)=>{

                  if(element.place == 'village') ploff[0]++;
                  if(element.place == 'town') ploff[1]++;

                  if(element.segregation == 'yes') segoff[0]++;
                  if(element.segregation == 'no') segoff[1]++;

                  if(element.disposable == 'often') disoff[0]++;
                  if(element.disposable == 'rarely') disoff[1]++;
                  if(element.disposable == 'never') disoff[2]++;

                  if(element.smog == 'smog_yes') smoff[0]++;
                  if(element.smog == 'smog_no') smoff[1]++;
                  if(element.smog == 'smog_no_opinion') smoff[2]++;               
                               
                });
              drawplace(ploff);
              drawsegregation(segoff);
              drawdisposable(disoff);
              drawsmog(smoff);
            });
        };
    } 
}

var ctx = document.getElementById('myChart').getContext('2d');



function drawplace(datachart){
    Chart.defaults.global.defaultFontColor = 'black';
    if(window.bar != undefined) 
        window.bar.destroy(); 
        window.bar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Wieś', 'Miasto'],
            datasets: [{
                label: 'Miejsce zamieszkania',
                data: datachart,
                backgroundColor: [
                    'rgb(226, 70, 70)',
                    '#184A45FF'

                ],
                borderColor: [
                    'black',
                    'black'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

var ctx1 = document.getElementById('myChart2').getContext('2d');

function drawsegregation(datachart){
    Chart.defaults.global.defaultFontColor = 'black';
    if(window.bar1 != undefined) 
        window.bar1.destroy(); 
        window.bar1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Tak', 'Nie'],
            datasets: [{
                label: 'Czy segreguje Pan/Pani śmieci?',
                data: datachart,
                backgroundColor: [
                    'rgb(226, 70, 70)',
                    '#184A45FF'

                ],
                borderColor: [
                    'black',
                    'black'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

var ctx2 = document.getElementById('myChart3').getContext('2d');

function drawdisposable(datachart){
    Chart.defaults.global.defaultFontColor = 'black';
    if(window.bar2 != undefined) 
        window.bar2.destroy(); 
        window.bar2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Często', 'Rzadko', 'Nigdy'],
            datasets: [{
                label: 'Jak często korzysta Pan/Pani z jednorazowych sztućców?',
                data: datachart,
                backgroundColor: [
                    'rgb(226, 70, 70)',
                    '#184A45FF',
                    '#B0B8B4FF'

                ],
                borderColor: [
                    'black',
                    'black',
                    'black'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

var ctx3 = document.getElementById('myChart4').getContext('2d');

function drawsmog(datachart){
    Chart.defaults.global.defaultFontColor = 'black';
    if(window.bar3 != undefined) 
        window.bar3.destroy(); 
        window.bar3 = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ['Tak', 'Nie','Nie mam zdania'],
            datasets: [{
                label: 'Czy uważa Pan/Pani, że smog jest realnym zagrożeniem?',
                data: datachart,
                backgroundColor: [
                    'rgb(226, 70, 70)',
                    '#184A45FF',
                    '#B0B8B4FF'

                ],
                borderColor: [
                    'black',
                    'black',
                    'black'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}