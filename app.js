const bodytableSenate = document.querySelector('#bodytable-senate')
const bodytableHouse = document.querySelector('#bodytable-house')

const senateCopy = Array.from(senateAPI.results[0].members)
console.log(senateCopy);
const houseCopy = Array.from(houseAPI.results[0].members)
console.log(houseCopy);

if (document.title == "Senate"){
    console.log("hola")
    showMembers(senateCopy, bodytableSenate)
} else if (document.title == "House") {
    showMembers(houseCopy, bodytableHouse)
}

function showMembers(arr, element) {
    let tdName = document.createElement('TD')
    let tdParty = document.createElement('TD')
    let tdState = document.createElement('TD')
    let tdYears = document.createElement('TD')
    let tdVotes = document.createElement('TD')
    
    arr.forEach(member => {
        let trName = document.createElement('TR')
        trName.textContent = `${member.first_name || ""}`
        tdName.appendChild(trName)
        
        let trParty = document.createElement('TR')
        trParty.textContent = `${member.party || ""}`
        tdParty.appendChild(trParty)

        let trState = document.createElement('TR')
        trState.textContent = `${member.state || ""}`
        tdState.appendChild(trState)
        
        let trYears = document.createElement('TR')
        trYears.textContent = `${member.seniority || ""}`
        tdYears.appendChild(trYears)
        
        let trVotes = document.createElement('TR')
        trVotes.textContent = `${member.votes_with_party_pct || ""}`
        tdVotes.appendChild(trVotes)
        
    })
    element.appendChild(tdName)
    element.appendChild(tdParty)
    element.appendChild(tdState)
    element.appendChild(tdYears)
    element.appendChild(tdVotes)
}























