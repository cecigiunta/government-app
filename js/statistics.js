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
      }
    },
    created(){
        if(document.title === "Attendance | Senate"){
            fetch(this.urlSenate, this.options)
                .then((res) => res.json())
                .then((data) => {
                    this.members = data.results[0].members;
                })
                .catch(err => console.error(err))
        }
        if(document.title === "Attendance | House"){
            fetch(this.urlHouse, this.options)
                .then((res) => res.json())
                .then((data) => {
                    this.members = data.results[0].members;  
                    // obtenerSelected(members);
                })
                .catch(err => console.error(err))
        }
        if(document.title === "Party Loyalty | Senate"){
            fetch(this.urlSenate, this.options)
                .then((res) => res.json())
                .then((data) => {
                    this.members = data.results[0].members;
                })
                .catch(err => console.error(err))
        }
        if(document.title === "Party Loyalty | House"){
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
      filtrar : function(){
        this.personajesFiltrados = this.personajes.filter( personaje => personaje.name.toLowerCase().includes(this.busqueda.toLowerCase()))
      }
    }
}).mount('#personajes')




const senateCopy = Array.from(senateAPI.results[0].members)
const houseCopy = Array.from(houseAPI.results[0].members)

const glanceSenateTable = document.querySelector('.glance-senate')
const glanceHouseTable = document.querySelector('.glance-house')
const leastEngagedTable = document.querySelector('.least-engaged') 
const mostEngagedTable = document.querySelector('.most-engaged')
const leastLoyalTable = document.querySelector('.least-loyal')
const mostLoyalTable = document.querySelector('.most-loyal')

const stats = {
    num_dem_senate: filterByParty(senateCopy, 'D').length,
    num_dem_house: filterByParty(houseCopy, 'D').length,
    num_rep_senate: filterByParty(senateCopy, 'R').length,
    num_rep_house: filterByParty(houseCopy, 'D').length,
    num_ind_senate: filterByParty(senateCopy, 'ID').length,
    num_ind_house: filterByParty(houseCopy, 'ID').length,
    total_senate: filterByParty(senateCopy).length,
    total_house: filterByParty(houseCopy).length,
    pct_dem_votes_senate: getPctVoted(senateCopy, 'D'),
    pct_dem_votes_house: getPctVoted(houseCopy, 'D'),
    pct_rep_votes_senate: getPctVoted(senateCopy, 'R'),
    pct_rep_votes_house: getPctVoted(houseCopy, 'R'),
    pct_ind_votes_senate: getPctVoted(senateCopy, 'ID'),
    pct_ind_votes_house: getPctVoted(houseCopy, 'ID'),
    pct_total_senate: getPctVoted(senateCopy),
    pct_total_house: getPctVoted(houseCopy),
    least_engaged_senate: sortFunction(senateCopy, 'missed_votes', false),   //* MAYOR cantidad de missed: missed_votes
    least_engaged_house: sortFunction(houseCopy, 'missed_votes', false),
    most_engaged_senate: sortFunction(senateCopy, 'missed_votes', true),
    most_engaged_house: sortFunction(houseCopy, 'missed_votes', true),
    least_loyal_senate: sortFunction(senateCopy, 'votes_with_party_pct', true),
    least_loyal_house: sortFunction(houseCopy, 'votes_with_party_pct', true),
    most_loyal_senate: sortFunction(senateCopy, 'votes_with_party_pct', false),
    most_loyal_house: sortFunction(houseCopy, 'votes_with_party_pct', false)
}

if(document.title === "Attendance | Senate"){
    printGlance(glanceSenateTable, stats, 'num_dem_senate', 'pct_dem_votes_senate', 'num_rep_senate', 'pct_rep_votes_senate', 'num_ind_senate', 'pct_ind_votes_senate', 'total_senate', 'pct_total_senate')
    createTable(stats.least_engaged_senate, leastEngagedTable, 'missed_votes', 'missed_votes_pct')
    createTable(stats.most_engaged_senate, mostEngagedTable, 'missed_votes', 'missed_votes_pct')
}
if(document.title === "Attendance | House"){
    printGlance(glanceHouseTable, stats, 'num_dem_house', 'pct_dem_votes_house', 'num_rep_house', 'pct_rep_votes_house', 'num_ind_house', 'pct_ind_votes_house', 'total_house', 'pct_total_house')
    createTable(stats.least_engaged_house, leastEngagedTable, 'missed_votes', 'missed_votes_pct')
    createTable(stats.most_engaged_house, mostEngagedTable, 'missed_votes', 'missed_votes_pct')
}
if(document.title === "Party Loyalty | Senate"){
    printGlance(glanceSenateTable, stats, 'num_dem_senate', 'pct_dem_votes_senate', 'num_rep_senate', 'pct_rep_votes_senate', 'num_ind_senate', 'pct_ind_votes_senate', 'total_senate', 'pct_total_senate')
    createTable(stats.least_loyal_senate, leastLoyalTable, 'total_votes', 'votes_with_party_pct')
    createTable(stats.most_loyal_senate, mostLoyalTable, 'total_votes', 'votes_with_party_pct')
}
if(document.title === "Party Loyalty | House"){
    printGlance(glanceHouseTable, stats, 'num_dem_house', 'pct_dem_votes_house', 'num_rep_house', 'pct_rep_votes_house', 'num_ind_house', 'pct_ind_votes_house', 'total_house', 'pct_total_house')
    createTable(stats.least_loyal_house, leastLoyalTable, 'total_votes', 'votes_with_party_pct')
    createTable(stats.most_loyal_house, mostLoyalTable, 'total_votes', 'votes_with_party_pct')
}

function filterByParty(arr, party){ 
    let repsNumber
    !party ? repsNumber = arr.filter(member => member.party)
    : repsNumber = arr.filter(member => member.party === party);
    return repsNumber
}
function getPctVoted(arr, party){
    let count = 0;
    let filteredParty = filterByParty(arr, party);
    for(i = 0; i < filteredParty.length; i++){
        !filteredParty[i].votes_with_party_pct ? filteredParty[i].votes_with_party_pct = 0 
        : count += filteredParty[i].votes_with_party_pct;
    }
    let total = parseFloat((count / filteredParty.length).toFixed(2)) || 0 ;
    return total
}
function sortFunction(arr,prop, order){
    const newArr = arr.sort( (a,b) => {
    if(order){
        return a[prop] - b[prop]
    }else{
        return b[prop] - a[prop]
    }
    })
    const tenPct = Math.ceil(newArr.length * .1)
    const ref = newArr[tenPct - 1][prop]
    if(order){
        return newArr.filter( elemento => elemento[prop] <= ref)
    }else{
        return newArr.filter( elemento => elemento[prop] >= ref)
    }
}
function createTable(arr, element, votesNumber, pct){
    arr.forEach(el => {
        let tr = document.createElement('TR')
        tr.classList.add('text-center')
        
        let tdName = document.createElement('TD')
        tdName.innerHTML = `<a class="text-decoration-none opacity-75" href=${el.url}>${el.last_name}, ${el.first_name}</a>`;
        tr.appendChild(tdName)

        let tdNumV = document.createElement('TD')
        tdNumV.innerHTML = el[votesNumber] || 0;
        tr.appendChild(tdNumV)

        let tdPct = document.createElement('TD')
        tdPct.innerHTML = `${el[pct] || 0} %`;
        tr.appendChild(tdPct)

        element.appendChild(tr)
    })
}
function printGlance(element, object, prop1, prop2, prop3, prop4, prop5, prop6, prop7, prop8){
    element.innerHTML += ` 
    <tr>
        <td>Democrats</td>
        <td>${object[prop1]}</td>
        <td>${object[prop2]}%</td>
    </tr>
    <tr>
        <td>Republicans</td>
        <td>${object[prop3]}</td>
        <td>${object[prop4]}%</td>
    </tr>
    <tr>
        <td>Independents</td>
        <td>${object[prop5]}</td>
        <td>${object[prop6]}%</td>
    </tr>
    <tr>
        <td>Total</td>
        <td>${object[prop7]}</td>
        <td>${object[prop8]}%</td>
    </tr>
    `
}