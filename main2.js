const houseCopy = Array.from(houseAPI.results[0].members)

const tabla = document.getElementById("table");
const select = document.getElementById("select");
const alert = document.getElementById("alert")

select.addEventListener("change", filtrarMiembros)
function filtrarMiembros(){
    let members;
    if(select.value !== "All"){
        members = houseCopy.filter(member => member.state === select.value)
        console.log("resultado: ", members);
    } else {
        members = houseCopy
    }
    members = members.filter(member => parties.includes(member.party))
    if(members.length){
        alert.innerHTML = ''
        imprimirTabla(members)
    } else {
        tabla.innerHTML = ''
        alert.innerHTML = "<p>No hay miembros</p>"
    }
}

function imprimirTabla(arr) {
  tabla.innerHTML = "";
  arr.forEach((member) => {
    tabla.innerHTML += `
        <tr class="text-center">
            <td>${member.first_name}</td>
            <td>${member.state}</td>
            <td>${member.party}</td>
            <td>Years in Office</td>
            <td>% Votes w/ Party</td>
        </tr>
    `;
  });
}

let states = []
houseCopy.forEach(element => {
    states.push(element.state)
})

function imprimirSelect(arr) {
    arr.forEach((state) => {
        select.innerHTML += `
            <option value="${state}">${state}</option>
      `;
    });
}

const noRepeatedStates = Array.from(new Set(states))
console.log(noRepeatedStates);
imprimirSelect(noRepeatedStates)
imprimirTabla(houseCopy)


let parties = ["R", "D", "ID"]
const checkboxes = document.querySelectorAll('.checkbox')

checkboxes.forEach(element => {
    element.addEventListener("change", (e)=> {
        let selected = e.target.value
        let checked = e.target.checked
        if(parties.includes(selected) && !checked){
            parties = parties.filter(party => party !== selected)
        } else {
            parties.push(selected)
        }
        filtrarMiembros()
    })
})
