class UI{
    constructor(){
        this.output = document.querySelector('.output');
        this.playerList = document.getElementById('playerOptions');
        this.output = document.getElementById('playerOutput');
    }
    // If there's more than 1 player result, I'll delete the playerList fields
    emptyNames(){
        this.playerList.innerHTML = '';
        this.playerList.className = '';
    }
    emptyPlayerData(){
        this.output.innerHTML = '';
    }



    fillNames(players){  
        // FOR refresh every time select-option
        this.playerList.innerHTML = '';
        this.playerList.className = 'col';
        
        const select = document.createElement('select');
        select.className = 'form-control';
        select.id = 'names';
        
        if (this.playerList.childElementCount < 1) {
            players.forEach(player => {
                const option = document.createElement('option');
                option.value = player.account_id;
                option.innerText = player.nickname;

                select.appendChild(option);
            })          
            this.playerList.appendChild(select);
        }        
    }

    // Create a table:
    playerData(player){
        this.output.innerHTML = '';
        // Create a card
        const card = document.createElement('div');
        card.className = 'card';
        const cardHead = document.createElement('div');
        cardHead.classList = 'card card-head';
        const h3 = document.createElement('h3');
        const cardBody = document.createElement('div');
        cardBody.classList = 'card card-body';

        let output = '';
        if (this.output.childElementCount < 1){
            h3.innerText = 'Player\'s nick: ' + player.nickname;
            cardHead.appendChild(h3);
            card.appendChild(cardHead);
            output += `
                <div class="row">
                    <div class="col">
                        <p class="font-weight-bold">Clan: ${(player.clan_id === null? 'Not in clan' : 'Clan member')}</p>
                    </div>
                    <div class="col">
                        <p class="font-weight-bold">Account created: ${this.timestampConverter(player.created_at)}</p>
                    </div>
                    <div class="col">
                        <p class="font-weight-bold">Last battle: ${this.timestampConverter(player.last_battle_time)}</p>
                    </div>
                    <div class="col">
                        <p class="font-weight-bold">Global Rating (WG): ${player.global_rating}</p>
                    </div>
                    <div class="col">
                        <p class="font-weight-bold">Player's data updated: ${this.timestampConverter(player.updated_at)}</p>
                    </div>                    
                </div>
                <div class="row">
                    <div class="col">
                        <p class="font-weight-bold">Trees Cut: (${player.statistics.trees_cut})  ${(player.statistics.trees_cut >= 10000 ? 'You MANIAC!' : 'Greenpeace    loves you!!!')}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p class="font-weight-bold">Battles: ${player.statistics.all.battles}</p>
                    </div> 
                    <div class="col">
                        <p class="font-weight-bold">Avrage battle XP: ${player.statistics.all.battle_avg_xp}</p>
                    </div> 
                    <div class="col">
                        <p class="font-weight-bold">Avrage win ratio: ${((player.statistics.all.wins / player.statistics.all.battles) * 100).toFixed(2)}%</p>
                    </div> 
                    <div class="col">
                        <p class="font-weight-bold">Max XP: ${player.statistics.all.max_xp}</p>
                    </div> 
                </div>
            `;
            cardBody.innerHTML = output;
            card.append(cardBody);
            this.output.appendChild(card);
        }

        
    }

    // Create a timestamp to date converter:
    timestampConverter(timestamp){
        let date = new Date(timestamp*1000);
        let month = ["Jan","Feb", "March", "Apr", "Maj", "Jun", "Jul", "Aug", "Sept","Oct","Nov","Dec"];

        return date.getFullYear() + ' ' + month[date.getMonth()] +' '+ date.getDate();
    }

}