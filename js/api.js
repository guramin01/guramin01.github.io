const base_url = 'https://api.football-data.org/v2';
const token ='9ce4dbf4c0cf4911b0a04f5fc885f049';
const api = {
    competitions: `${base_url}/competitions/2001/standings/`,
    TopScorer: `${base_url}/competitions/2001/scorers`,
    Match: `${base_url}/competitions/2002/matches?status=SCHEDULED`,
    Team: `${base_url}/teams/`,
}


function fetchApi(url) {
    return fetch(url, {method: "GET",headers: {'X-Auth-Token': token}});
}

async function getTopScorer() {
    try {
        if ('caches' in window) {
            let response = await caches.match(api.TopScorer)
            return await response.json()
        }
    } catch (error) {
        try {
            const response = await fetchApi(api.TopScorer)
            return await response.json()
        } catch (error) {
            console.log(error);
        }
    }


}
async function getcompetitions() {
    try {
        if ('caches' in window) {
            let response = await caches.match(api.competitions)
            return await response.json()
        }
    } catch (error) {
        try {
            const response = await fetchApi(api.competitions)
            return await response.json()
        } catch (error) {
            console.log(error);
        }
    }


}
async function getMatchSchedule(id) {
        try {
            if ('caches' in window) {
                let response = await caches.match(api.Match)
                return await response.json()
            }
        } catch (error) {
            try {
                const response = await fetchApi(api.Match)
                return await response.json()
            } catch (error) {
                console.log(error);
            }
        }
    
}
async function getTeam(id) {
    try {
        if ('caches' in window) {
            let response = await caches.match(api.Team + '/' + id)
            return await response.json()

        }

    } catch (error) {
        try {
            const response = await fetchApi(api.Team + '/' + id)
            return await response.json()
        } catch (error) {
            console.log(error);
        }
    }
}

