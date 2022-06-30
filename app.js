//*Copias de las API
const senateCopy = Array.from(senateAPI.results[0].members).filter(member=> member.party)
const houseCopy = Array.from(houseAPI.results[0].members)

const bodytableSenate = document.querySelector('#bodytable-senate')
const bodytableHouse = document.querySelector('#bodytable-house')
const formCheckbox = document.querySelector('#formCheckbox')


let sinRepetidos = []; //Array que guarda los estados sin repetidos, lo uso enobtenerEstados() y generaroption

function arrayDeCheck(){
const checkboxes = document.querySelectorAll('.checkbox')   //* me devuelve nodeList, lo paso a array
let checkArr = [];
//*GUARDAR Y SACAR VALORES DE CHEKCED EN ARRAY
for(let checkbox of checkboxes){
        if(checkbox.checked == true){
            checkArr.push(checkbox.value);  //Guardo en mi array los elementos tildados
        } else {
            //Sacamos los elementos del array
            checkArr = checkArr.filter(element => element != checkbox.value);            
}}
    return checkArr
}

function filterMembers(arr, arr2){
    const newMembers = arr.filter(
    member => arr2.includes(member.party)
    )
    return newMembers;
}


function filterMembers2(arr , condicion){
    const newMembers = arr.filter(member => {
        if(condicion[0] === member.state && condicion.includes(member.party)){
            return member
        }  
        if (condicion.includes(member.party)){
            return member
        } 
        else if (condicion[0] === member.state){
            return member
        }
})
    console.log(newMembers);
    return newMembers
    }


if (document.title == "Senate"){
    showMembers(senateCopy, bodytableSenate);

    //* FILTRO POR CHECKBOX
    formCheckbox.addEventListener('change', (e) => {
        const resultado = arrayDeCheck()
        const members = filterMembers(senateCopy, resultado)
        showMembers(members, bodytableSenate)
        if(resultado.length === 0){
            showMembers(senateCopy, bodytableSenate)
        }
    })
} 
else if (document.title == "House") {
    showMembers(houseCopy, bodytableHouse)

        //* FUNCION Q PASA TODOS LOS ESTADOS A UN ARRAY
        function obtenerEstados(arr){    //TODO: NO ME MUESTRA 50
            const newArr = arr.map(member =>
                member.state
            )
            sinRepetidos = Array.from(new Set(newArr))
            console.log(sinRepetidos);
        }
        obtenerEstados(houseCopy)
    
        function generarOption(arr){
            const select = document.querySelector('#select')
            arr.forEach(estado => {
            let newOption = document.createElement('OPTION')
            newOption.textContent = estado
            newOption.setAttribute("value", estado)  //* le agergo un value para poder filtrar desp
            select.appendChild(newOption)
        })}
        generarOption(sinRepetidos)

        function obtenerSelected(arr){
            let selected = select.value
            arr.unshift(selected)
        }
    
            
        //Filtrado por checkbox + por select
        formCheckbox.addEventListener('change', (e) => {
            const resultado = arrayDeCheck()  //*Mi array con los checkboxs y option
            obtenerSelected(resultado)
            console.log(resultado);  

            filtrados = filterMembers2(houseCopy, resultado)
            console.log(filtrados);
            showMembers(filtrados, bodytableHouse)
            if( resultado.length === 0 ){  //*TODO: PROBLEMAS CON EL "ALL"
                showMembers(houseCopy, bodytableHouse)
            }
        })
}


function showMembers(arr, element) {
    element.innerHTML = ''
    arr.forEach(member => {
        let tr = document.createElement('TR')
        tr.classList.add('text-center')
        
        let tdName = document.createElement('TD')
        tdName.innerHTML = `<a href=${member.url}>${member.first_name} ${member.last_name}</a>`;
        tr.appendChild(tdName)
        
        let tdParty = document.createElement('TD')
        tdParty.textContent = `${member.party || ""}`
        tr.appendChild(tdParty)

        let tdState = document.createElement('TD')
        tdState.textContent = `${member.state || ""}`
        tr.appendChild(tdState)
        
        let tdYears = document.createElement('TD')
        tdYears.textContent = `${member.seniority || ""}`
        tr.appendChild(tdYears)
        
        let tdVotes = document.createElement('TD')
        tdVotes.textContent = `${member.votes_with_party_pct || ""}`
        tr.appendChild(tdVotes)

        element.appendChild(tr)
    })
}