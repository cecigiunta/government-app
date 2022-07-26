Vue.createApp({
    data() {
        return {
            key: 'BT3c8wQepIFXwxZXbygcABZa5k5l31cAMIDIrVDA',
            urlSenate: 'https://api.propublica.org/congress/v1/117/senate/members.json',
            urlHouse: 'https://api.propublica.org/congress/v1/117/house/members.json',
            options: {
                method: 'GET',
                headers: {"X-API-Key":'BT3c8wQepIFXwxZXbygcABZa5k5l31cAMIDIrVDA'}
            },
            members: [],   //Arr vacío para guardar resultados del Fetch
            filtered: [], //Arr vacío para guardar resultados del Filtro
            formCheckbox : document.querySelector('#formCheckbox'),
            alert : document.querySelector('#alert'),
            select : document.getElementById("select")       
    }
    },
    mounted(){
            if(document.title === 'Senate'){
                fetch(this.urlSenate, this.options)
                .then((res) => res.json())
                .then((data) => {
                    this.members = data.results[0].members;
                })
                .catch(err => console.error(err))
            }
            if(document.title === 'House'){
                fetch(this.urlHouse, this.options)
                .then((res) => res.json())
                .then((data) => {
                    this.members = data.results[0].members;  
                    // obtenerSelected(members);
                })
                .catch(err => console.error(err))
            }
        },
    methods: {
        arrayDeCheck: function(){
            const checkboxes = document.querySelectorAll('.checkbox')
            let checkArr = [];

            for(let checkbox of checkboxes){
                if(checkbox.checked == true){
                    checkArr.push(checkbox.value); 
                } else {
                    checkArr = checkArr.filter(element => element != checkbox.value);
            }}
            console.log(checkArr);
            return checkArr
        },

        obtenerSelected: function(arr){
            let selected = select.value
            arr.unshift(selected)
            console.log(selected);
        },

        obtenerEstados: function(arr){
            const newArr = arr.map(member =>
                member.state
            )
            sinRepetidos = Array.from(new Set(newArr))
            console.log(sinRepetidos);
        },

        generarOption: function(arr){
            const select = document.querySelector('#select')
            arr.forEach(estado => {
            let newOption = document.createElement('OPTION')
            newOption.textContent = estado
            newOption.setAttribute("value", estado)
            select.appendChild(newOption)
        })
        },

        filterMembers: function(arr , condicion){
        const aux = arr.filter(member => {
            if((member.state === condicion[0] || condicion[0] === "All" || condicion.length === 0 ) && condicion.includes(member.party)){
                return member
            }
            })
            return aux;
        },
    }
}).mount('#app')








/*------------ API Request  ----------------*/
// const urlSenate = 'https://api.propublica.org/congress/v1/117/senate/members.json'
// const urlHouse = 'https://api.propublica.org/congress/v1/117/house/members.json'
// const key = 'BT3c8wQepIFXwxZXbygcABZa5k5l31cAMIDIrVDA'
// const options = {
//     method: 'GET',
//     headers: {
//         'X-API-Key': key
//     }
// }
// let arr = []

const bodytableSenate = document.querySelector('#bodytable-senate')
const bodytableHouse = document.querySelector('#bodytable-house')
const formCheckbox = document.querySelector('#formCheckbox')
const alert = document.querySelector('#alert')
const select = document.getElementById("select");
let sinRepetidos = []; //Array que guarda los estados sin repetidos, lo uso enobtenerEstados() y generaroption


// async function getData (url) {
//     try{
//         await fetch(url, options)
//         .then(res => res.json())
//         .then(data => {
//             arr = data.results[0].members
//             console.log(arr)
//         })
//     }catch{
//         console.log('algo salio mal')
//     }
// }

// function arrayDeCheck(){
// const checkboxes = document.querySelectorAll('.checkbox')   //* me devuelve nodeList, lo paso a array
// let checkArr = [];

// for(let checkbox of checkboxes){
//         if(checkbox.checked == true){
//             checkArr.push(checkbox.value);  //Guardo en mi array los elementos tildados
//         } else {
//             //Sacamos los elementos del array
//             checkArr = checkArr.filter(element => element != checkbox.value);            
// }}
//     return checkArr
// }

// function obtenerSelected(arr){
//     let selected = select.value
//     arr.unshift(selected)
// }

// function obtenerEstados(arr){  
//     const newArr = arr.map(member =>
//         member.state
//     )
//     sinRepetidos = Array.from(new Set(newArr))
// }

// function generarOption(arr){
//     const select = document.querySelector('#select')
//     arr.forEach(estado => {
//     let newOption = document.createElement('OPTION')
//     newOption.textContent = estado
//     newOption.setAttribute("value", estado)  //* le agergo un value para poder filtrar desp
//     select.appendChild(newOption)
// })}

// function filterMembers(arr , condicion){ 
//     const aux = arr.filter(member => {
//         if((member.state === condicion[0] || condicion[0] === "All" || condicion.length === 0 ) && condicion.includes(member.party)){
//             return member
//         }
//         })
//         return aux;
// }

// if (document.title == "Senate"){
//     getData(urlSenate)
//     console.log(getData(urlSenate));
//     showMembers(arrSenate, bodytableSenate);
//     obtenerEstados(arrSenate)
//     generarOption(sinRepetidos)

//     formCheckbox.addEventListener('change', (e) => {
//         const resultado = arrayDeCheck()
//         obtenerSelected(resultado)
//         console.log(resultado);
//         filtrados = filterMembers(senateCopy, resultado) 
//         console.log(filtrados);
//         showMembers(filtrados, bodytableSenate)
//         if( resultado.length === 0 || resultado.length ===1 && resultado[0] === "All"){ 
//             showMembers(houseCopy, bodytableSenate)
//         }
//     })
// } 
// else if (document.title == "House") {
//     getData(urlHouse)
//     showMembers(houseCopy, bodytableHouse)
//     obtenerEstados(houseCopy)
//     generarOption(sinRepetidos)

//     formCheckbox.addEventListener('change', (e) => {
//         const resultado = arrayDeCheck()  //*Mi array con los checkboxs
//         obtenerSelected(resultado)
//         console.log(resultado);  
//         filtrados = filterMembers(houseCopy, resultado)  
//         console.log(filtrados);
//         showMembers(filtrados, bodytableHouse)
//         if( resultado.length === 0 || resultado.length ===1 && resultado[0] === "All"){ 
//             showMembers(houseCopy, bodytableHouse)
//         }
//         if (filtrados.length === 0) {
//                 alert.classList.remove("hidden")
//         }
//     })
// }

// function showMembers(arr, element) {
//     element.innerHTML = ''
//     arr.forEach(member => {
//         let tr = document.createElement('TR')
//         tr.classList.add('text-center')
        
//         let tdName = document.createElement('TD')
//         tdName.innerHTML = `<a class="text-decoration-none opacity-75" href=${member.url}>${member.last_name}, ${member.first_name}</a>`;;
//         tr.appendChild(tdName)
        
//         let tdParty = document.createElement('TD')
//         tdParty.textContent = `${member.party || ""}`
//         tr.appendChild(tdParty)

//         let tdState = document.createElement('TD')
//         tdState.textContent = `${member.state || ""}`
//         tr.appendChild(tdState)
        
//         let tdYears = document.createElement('TD')
//         tdYears.textContent = `${member.seniority || ""} years`
//         tr.appendChild(tdYears)
        
//         let tdVotes = document.createElement('TD')
//         tdVotes.textContent = `${member.votes_with_party_pct || ""}% `
//         tr.appendChild(tdVotes)

//         element.appendChild(tr)
//     })
// }
