//global for lazy people
var participants = [];

let getCompletedMatches = (tournament) => new Promise(function (resolve, reject) {
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: `https://api.challonge.com/v1/tournaments/${tournament}.json`,///${tournament}.json`,
        data: {
            'api_key': 'zU8uSiEtYLjlqFXPQCRzto3RiEp1KegdJ8TCyvLj',
            'include_matches': 1,
            'include_participants': 1
        },
        cache: false,
        crossDomain: true,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Something went wrong!");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            //reject('error?');
        },
        success: function (result) {
            resolve(result.tournament);
        }
    });
});

const go = () => {
    let bracket = $("#bracket").val();
    console.log('going with bracket: ', bracket);

    if(bracket){
        Promise.all([getCompletedMatches(bracket)]).then(function (values) {
            let matches = values[0].matches;
            participants = values[0].participants;
            
            let completed = matches.filter(match => match.match.state == "complete");
            let maxCompletedWinnersRound = Math.max.apply(Math, completed.map((o) => { return o.match.round; }));
            let maxCompletedLosersRound = Math.min.apply(Math, completed.map(function (o) { return o.match.round; }));

            let roundsToShow = [];

            if (maxCompletedWinnersRound > 1) {
                let unfinishedWinners = matches.filter(
                    match => match.match.state != "complete" && match.match.round == maxCompletedWinnersRound
                );
                if (unfinishedWinners.length >= 1) {
                    roundsToShow.push(maxCompletedWinnersRound);
                    roundsToShow.push(maxCompletedWinnersRound - 1);
                } else {
                    roundsToShow.push(maxCompletedWinnersRound);
                }
            } else {
                roundsToShow.push(1);
            }

            if (maxCompletedLosersRound < -1) {
                let unfinishedLosers = matches.filter(
                    match => match.match.state != "complete" && match.match.round == maxCompletedLosersRound
                );
                if (unfinishedLosers.length >= 1) {
                    roundsToShow.push(maxCompletedLosersRound);
                    roundsToShow.push(maxCompletedLosersRound + 1);
                } else {
                    roundsToShow.push(maxCompletedLosersRound);
                }
            } else {
                roundsToShow.push(-1);
            }

            console.log('Rounds To Display', roundsToShow);

            //matches to display
            let display = matches.filter(match =>
                match.match.state == "complete" &&
                roundsToShow.includes(match.match.round)
            );

            
            console.log(display);

            var i = 0;
            const loopDisplay = () =>  {
                    $("#round").text(display[i].match.round > 0 ? `Winners round ${display[i].match.round}` : `Losers round ${Math.abs(display[i].match.round)}`);
                    $("#match").html(`${convertIdToName(display[i].match.winner_id)} <span class="subtext">defeats</span> ${convertIdToName(display[i].match.loser_id)}`);
                    i++;
                    setTimeout(function () {
                        if (i < display.length) {
                            loopDisplay();
                        }else{ 
                            go();
                        }
                }, 5000)
            }
            loopDisplay();
        })
    }
}


go();


const convertIdToName = (id) => {
    let matchedParticipant = participants.find(participant => participant.participant.id == id || participant.participant.group_player_ids.includes(id));
    return matchedParticipant.participant.display_name;
}


$("#round").on('click', () => {
    $("#bracket").toggle();
});

$("#bracket").on('change', () => {
    go();
});