// * home page
function errAkses(){
	return `  <div class="card">
                    <div class="card-content center">
                         <p class="caption mb-0 ">
                         Ups.. Halaman Tidak Dapat Di Akses !.
                       </p>

                    </div>
              </div>`;
}
async function TampilHome() {
    const tb_competition = document.querySelector('#competition');
    const judul_competition = document.querySelector('#name_competition');
    const tb_scorer = document.querySelector('#scorer');
    const judul_scorer = document.querySelector('#scorer_competition');
    let isiScorer = '';
    let no = 1;
    let isiCompetition = '';
    const data_competition = await getcompetitions();
    const data_scorer = await getTopScorer();

    await data_competition.standings[0].table.forEach(res => {
        isiCompetition += `<tr>
                <td>${res.position}</td>
                    <td><a href="team.html?id=${res.team.id}" class="link-to-team valign-wrapper">
                    <img src="${res.team.crestUrl.replace(/^http:\/\//i, 'https://')}" class="responsive-img cres" alt=""> ${res.team.name}</a> 
                    </td>
                    <td>${res.points}</td>
                    <td>${res.playedGames}</td>
                    <td>${res.won}</td>
                    <td>${res.draw}</td>
                    <td>${res.lost}</td>
                    <td>${res.goalsFor}</td>
                    <td>${res.goalsAgainst}</td>
                    <td>${res.goalDifference}</td>
                </tr>`
    });
    tb_competition.innerHTML = isiCompetition;
    judul_competition.innerHTML = `${data_competition.competition.name} - ${data_competition.competition.area.name}`;

    await data_scorer.scorers.forEach(res => {
        isiScorer += `<tr>
                    <td>${no++}</td>
                    <td>${res.player.name}</td>
                    <td>${res.player.position}</td>
                    <td>${res.numberOfGoals}</td>
                    <td><a href="team.html?id=${res.team.id}" class="link-to-team valign-wrapper">${res.team.name}</a></td>

                </tr>`


    });
    tb_scorer.innerHTML = isiScorer;
    judul_scorer.innerHTML = `${data_scorer.competition.name} - ${data_scorer.competition.area.name}`;

  document.getElementById("loader").style.display = "none";

}

async function DetailTeam(id) {
    const content = document.querySelector("#body-content");
    const data = await getTeam(id);
    if (data !== undefined) {

	    let Squad = '',
	        liga = '';

	    await data.activeCompetitions.forEach( res => {
	        liga += `${res.name},`
	    });
	    await data.squad.forEach( res => {

	            Squad += `<tr>
	                    <td>${res.name}</td>
	                    <td>${res.position}</td>
	                    <td>${res.nationality}</td>
	                    <td>${res.shirtNumber == null ? 'Tidak Ada' : res.shirtNumber}</td>
	                </tr>`

	    });

	        document.querySelector('#liga').innerHTML = `Aktif Liga : ${liga}`;
	        document.querySelector('.nama-team h3').innerHTML = data.name;
	        document.querySelector('#Squad').innerHTML = Squad;


	        document.querySelector('#information').innerHTML = `
	           <a href="#!" class="collection-item" >Lahir : ${data.founded}</a>
	           <a href="#!" class="collection-item" >Alamat : ${data.address}</a>
	           <a href="#!" class="collection-item" >Phone : ${data.phone}</a>
	           <a href="#!" class="collection-item" >Email : ${data.email}</a>
	           <a href="${data.website}" class="collection-item" target="_blank">Website : "${data.website}" </a>
	           <a href="#!" class="collection-item" >Warna Club : ${data.clubColors}</a>
	        `
	        const LogoTeam = document.querySelector('.logo-team-ny img');
	        LogoTeam.setAttribute('src', data.crestUrl.replace(/^http:\/\//i, 'https://'));
	        LogoTeam.setAttribute('alt', data.name);

	        checkDataFav(data.id)
	        const TambahFavorite = document.querySelector('#favorite-btn')
	        TambahFavorite.addEventListener('click', click => {
	            click.preventDefault()
	            checkDataFav(data.id, true, data)
	        })
    }else{
    	content.innerHTML = `${errAkses()}  Load Halaman Dalam Keadaan Online Setidaknya 1x agar dapat di buka dalam keadaan offline`;
    }
	document.getElementById("loader").style.display = "none";


}
  function checkDataFav(id, event = false, data_team) {
  const TambahFavorite = document.querySelector('#favorite-btn')

      checkDataDB(id).then(res => {

          if (res === true) {
             TambahFavorite.style.backgroundColor = '#26a69a'
             TambahFavorite.innerHTML = 'Hapus dari Favorite'
			 TambahFavorite.classList.remove('green');
			 TambahFavorite.classList.add('red');

                if (event === true) {
                   M.toast({html: data_team.name+' Di Hapus Dari Favorite'})
                   deleteFavorite(id);
                   TambahFavorite.style.backgroundColor = '#26a69a'
                   TambahFavorite.innerHTML = 'Tambahkan Ke Favorite'
				   TambahFavorite.classList.remove('red');
				   TambahFavorite.classList.add('green');
                }
           } else {
              TambahFavorite.style.backgroundColor = '#26a69a'
              TambahFavorite.innerHTML = 'Tambahkan Ke Favorite'
			  TambahFavorite.classList.remove('red');
			  TambahFavorite.classList.add('green');
                if (event === true) {
                    M.toast({html: data_team.name + ' Di Tambahkan Ke Favorite'})
                    TambahDbFavorite(data_team);
                    TambahFavorite.style.backgroundColor = 'cadetblue'
                    TambahFavorite.innerHTML = 'Hapus dari Favorite'
					TambahFavorite.classList.remove('green');
					TambahFavorite.classList.add('red');

                }
           }
       })
  }

async function TeamFavorite() {
    let saved = '';
    let hitung = 0;

    const data = getSemua();

    await data.then(favorite => {
    if(favorite.length > 0){
        for (const v of favorite) {
	        saved += `
	                  <div class="card" id="team-fav-${v.id}">
	                    <a href="/">
	                      <div class="card-image waves-effect waves-block waves-light">
	                        <img src="${v.crestUrl}" height="150" weight="150"/>
	                      </div>
	                    </a>
	                    <div class="card-content">
	                      <span class="card-title truncate">${v.name}</span>
                        <a href="" class="waves-effect waves-light btn red hapus" data-id="${v.id}">HAPUS DARI FAVORITE</a>
	                    </div>
	                  </div>
	                `;

        }
    }else{
   		 document.getElementById("fav-kosong").style.display = "block";
    }


    document.getElementById("favorite_team").innerHTML = saved;
    document.getElementById("loader").style.display = "none";

        document.querySelectorAll('.hapus').forEach( btn => {
            btn.addEventListener('click', e => {
            	// console.log(favorite.length)
                e.preventDefault();
                deleteFavorite(parseInt(e.target.getAttribute('data-id')));
                document.querySelector('#team-fav-'+e.target.getAttribute('data-id')).style.display = 'none';
				hitung++;
                M.toast({html:' Di Hapus Dari Favorite'})

			    if(hitung >= favorite.length){
			   		 document.getElementById("fav-kosong").style.display = "block";
			    }
            })
        })
    });


}

async function TampilMatch() {
    const data = await getMatchSchedule()
    let content = ''

    await data.matches.forEach(v => {
        content += `
        <div class="col s12 m12 l12">
        <div class="card  align-item-center">
            <div class="card-content ">
            <div class="row">
            <div class="col s12 m12 l12 ">
                <p>${v.utcDate}</p>
            </div>
        </div>
        <div class="row center-align">
            <div class="col s5 m5 l5">
                <h6>Tuan Rumah</h6> 
                <a  href="/">${v.homeTeam.name}</a> 
            </div>
            <div class="col s2 m2 l2">
                <h3>VS</h3>
            </div>
            <div class="col s5 m5 l5">
                <h6>Lawan</h6> 
                <a  href="/">${v.awayTeam.name}</a>   
            </div>
        </div>
                <p>${v.stage}</p>

            </div>
        </div>
    </div>
        `
    })
    document.getElementById("loader").style.display = "none";

    document.querySelector('#schedule_team').innerHTML = content

}