
console.log('go');

let mainDiv = $("main");


//https://challonge.com/ENZSFVW415

//7FfjtWlBLGuWt0833EBSwEGC0mABrDG4B52rIcZ4


let getCompletedMatches = (tournament) => new Promise(function(resolve, reject) {
    console.log(tournament);
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: `https://api.challonge.com/v1/tournaments/${tournament}.json`,///${tournament}.json`,
        data: {'api_key': '7FfjtWlBLGuWt0833EBSwEGC0mABrDG4B52rIcZ4',
            'include_matches': 1,
            'include_participants': 1},
        cache: false,
        crossDomain: true,
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Something went wrong!");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            //reject('error?');
        },
        success: function(result) {          
            resolve(result.tournament);

        }
    });
});

//ENZBossBattle

const go = () => {
    Promise.all([getCompletedMatches('ac1ieajq')]).then(function(values) {
        let matches = values[0].matches;
        let participants = values[0].participants;



        console.log(matches);
        // matches.forEach(match => {
        //     console.log(match.match.round);
        // });
        let completed = matches.filter(match => match.match.state == "complete");
        
        let maxCompletedWinnersRound = Math.max.apply(Math,completed.map((o) => {return o.match.round;}));
        console.log('max winners:', maxCompletedWinnersRound);

        let losers = matches.filter(match => match.match.state == "complete" && match.match.round <= 0);
        //do something convert rounds to positive in losers?
        losers.map((x) => {
            console.log(x);
            x.match.round = Math.abs(x.match.round)
            //return Math.abs(x.match.round);
            return x;
        });
        let maxCompletedLosersRound = Math.max.apply(Math,losers.map(function(o){return o.match.round;}));
        console.log(losers);
        console.log('max losers', maxCompletedLosersRound);

        let roundsToShow = [];

        if(maxCompletedWinnersRound > 1){
            let unfinishedWinners = matches.filter(
                match => match.match.state != "complete" && match.match.round == maxCompletedWinnersRound
            );
            console.log(unfinishedWinners);
            if(unfinishedWinners.length >= 1){
                //current max completed is incomplete, show this round + prev
                roundsToShow.push(maxCompletedWinnersRound);
                roundsToShow.push(maxCompletedWinnersRound-1);
            }else{
                //current maxcompleted is complete, just show this round.
                roundsToShow.push(maxCompletedWinnersRound);
            }
        }else{
            roundsToShow.push(1);
        }

        if(maxCompletedLosersRound > 1){
            let unfinishedLosers = matches.filter(
                match => match.match.state != "complete" && match.match.round == maxCompletedLosersRound
            );
            if(unfinishedLosers.length >= 1){
                //current max completed is incomplete, show this round + prev
                roundsToShow.push(-maxCompletedLosersRound);
                roundsToShow.push(-maxCompletedLosersRound-1);
            }else{
                //current maxcompleted is complete, just show this round.
                roundsToShow.push(-maxCompletedLosersRound);
            }
        }else{
            roundsToShow.push(-1);
        }


        //instead of this logic maybe look for prevwinners to display and current winners to display?

        console.log('roundsToShow', roundsToShow);

        // console.log('winnersRoundToDisplay', winnersRoundToDisplay);
        // console.log('losersRoundToDisplay', losersRoundToDisplay);


        //my initial array is being edited to now have 1 instead of -1 for losers.
        // i need to make a copy to do that positive number filter
        // or i need to use negatives to revers teh logic, use min instead of max?

        let display = matches.filter(match => 
            match.match.state == "complete" &&
            roundsToShow.includes(match.match.round)
        );

        console.log(matches.filter(match => match.match.round == 1));
        
        console.log(matches);
        console.log(display);
    })
}
go();