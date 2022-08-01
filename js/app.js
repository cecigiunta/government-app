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
            parties: ['D', 'R', 'ID'],  
            state: 'All',

            num_dem_senate: 0,
            num_dem_house: 0,
            num_rep_senate: 0,
            num_rep_house: 0,
            num_ind_senate: 0,
            num_ind_house: 0,
            total_senate: 0,
            total_house: 0,        
            pct_dem_votes_senate: 0,
            pct_dem_votes_house: 0,
            pct_rep_votes_senate: 0 ,
            pct_rep_votes_house: 0,
            pct_ind_votes_senate: 0,
            pct_ind_votes_house: 0,
            pct_total_senate: 0,
            pct_total_house: 0 ,
            least_engaged_senate: [],   //* MAYOR cantidad de missed: missed_votes
            least_engaged_house: [],
            most_engaged_senate: [],
            most_engaged_house: []  ,          
            least_loyal_senate: [], 
            least_loyal_house: [],
            most_loyal_senate: [], 
            most_loyal_house: [],
    }
    },
    mounted(){
        if(document.title === 'Senate'){
            fetch(this.urlSenate, this.options)
            .then((res) => res.json())
            .then((data) => {
                this.members = data.results[0].members;
                this.filtered = this.members;
                
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
        if(document.title === "Attendance | Senate"){
            fetch(this.urlSenate, this.options)
                .then((res) => res.json())
                .then((data) => {
                    this.members = data.results[0].members;
                    console.log(this.members[0]);
                    this.num_dem_senate = this.filterByParty(this.members, 'D').length;
                    this.num_rep_senate = this.filterByParty(this.members, 'R').length;
                    this.num_ind_senate = this.filterByParty(this.members, 'ID').length;
                    this.total_senate = this.filterByParty(this.members).length;
                    this.pct_dem_votes_senate = this.getPctVoted(this.members, 'D');
                    this.pct_rep_votes_senate = this.getPctVoted(this.members, 'R');
                    this.pct_ind_votes_senate = this.getPctVoted(this.members, 'ID');
                    this.pct_total_senate = this.getPctVoted(this.members);
                    this.least_engaged_senate = this.sortFunction(this.members, 'missed_votes', false);
                    this.most_engaged_senate = this.sortFunction(this.members, 'missed_votes', true);
                })
                .catch(err => console.error(err))
        }
        if(document.title === "Attendance | House"){
            fetch(this.urlHouse, this.options)
                .then((res) => res.json())
                .then((data) => {
                    this.members = data.results[0].members;  
                    console.log(this.members[0]);
                    this.num_dem_house = this.filterByParty(this.members, 'D').length;
                    this.num_rep_house = this.filterByParty(this.members, 'R').length;
                    this.num_ind_house = this.filterByParty(this.members, 'ID').length;
                    this.total_house = this.filterByParty(this.members).length;
                    this.pct_dem_votes_house = this.getPctVoted(this.members, 'D');
                    this.pct_rep_votes_house = this.getPctVoted(this.members, 'R');
                    this.pct_ind_votes_house = this.getPctVoted(this.members, 'ID');
                    this.pct_total_house = this.getPctVoted(this.members);
                    this.least_engaged_house = this.sortFunction(this.members, 'missed_votes', false);
                    this.most_engaged_house = this.sortFunction(this.members, 'missed_votes', true);
                })
                .catch(err => console.error(err))
        }
        if(document.title === "Party Loyalty | Senate"){
            fetch(this.urlSenate, this.options)
                .then((res) => res.json())
                .then((data) => {
                    this.members = data.results[0].members;
                    console.log(this.members[0]);
                    this.num_dem_senate = this.filterByParty(this.members, 'D').length;
                    this.num_rep_senate = this.filterByParty(this.members, 'R').length;
                    this.num_ind_senate = this.filterByParty(this.members, 'ID').length;
                    this.total_senate = this.filterByParty(this.members).length;
                    this.pct_dem_votes_senate = this.getPctVoted(this.members, 'D');
                    this.pct_rep_votes_senate = this.getPctVoted(this.members, 'R');
                    this.pct_ind_votes_senate = this.getPctVoted(this.members, 'ID');
                    this.pct_total_senate = this.getPctVoted(this.members);
                    this.least_loyal_senate = this.sortFunction(this.members, 'votes_with_party_pct', true);
                    this.most_loyal_senate = this.sortFunction(this.members, 'votes_with_party_pct', false);
                })
                .catch(err => console.error(err))
        }
        if(document.title === "Party Loyalty | House"){
            fetch(this.urlHouse, this.options)
                .then((res) => res.json())
                .then((data) => {
                    this.members = data.results[0].members;  
                    console.log(this.members[0]);
                    this.num_dem_house = this.filterByParty(this.members, 'D').length;
                    this.num_rep_house = this.filterByParty(this.members, 'R').length;
                    this.num_ind_house = this.filterByParty(this.members, 'ID').length;
                    this.total_house = this.filterByParty(this.members).length;
                    this.pct_dem_votes_house = this.getPctVoted(this.members, 'D');
                    this.pct_rep_votes_house = this.getPctVoted(this.members, 'R');
                    this.pct_ind_votes_house = this.getPctVoted(this.members, 'ID');
                    this.pct_total_house = this.getPctVoted(this.members);
                    this.least_loyal_house = this.sortFunction(this.members, 'votes_with_party_pct', true);
                    this.most_loyal_house = this.sortFunction(this.members, 'votes_with_party_pct', false);
                })
                .catch(err => console.error(err))
        }
    },
    methods: {
        //Methods Tercer Tarea
        filterByParty: function(arr, party){
            let repsNumber
            !party ? repsNumber = arr.filter(member => member.party)
            : repsNumber = arr.filter(member => member.party === party);
            return repsNumber
        },
        getPctVoted: function(arr, party){
            let count = 0;
            let filteredParty = this.filterByParty(arr, party);
            for(i = 0; i < filteredParty.length; i++){
                !filteredParty[i].votes_with_party_pct ? filteredParty[i].votes_with_party_pct = 0 
                : count += filteredParty[i].votes_with_party_pct;
            }
            let total = parseFloat((count / filteredParty.length).toFixed(2)) || 0 ;
            return total
        },
        sortFunction: function(arr,prop, order){
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
        },
    },
    computed: {
        //Segunda Tarea
        filterMembers: function(){
            this.filtered = this.members.filter(member => {
                return this.parties.includes(member.party) 
                && (this.state === 'All' || member.state === this.state);
            })
            console.log(this.filtered.length);
            return this.filtered;
        }
        },            
}).mount('#app')