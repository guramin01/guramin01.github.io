document.addEventListener("DOMContentLoaded", function() {

// Mengaktifkan Side Nav Materialize
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);

// Memuat Navgasi Materialize
    const loadNav = () => {

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState === 4) {
            if (this.status != 200) return;
       
            // Muat daftar tautan menu
            document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
              elm.innerHTML = xhttp.responseText;
            });
       
            // Menambahkan event untuk setiap menu nav
            document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
              elm.addEventListener("click", function(event) {
                // Untuk Menutup
                const sidenav = document.querySelector(".sidenav");
                M.Sidenav.getInstance(sidenav).close();
       
                // Untuk Load Konten Dari Page Berdasarkan Attribute Href
                page = event.target.getAttribute("href").substr(1);
                loadPage(page);
              });
            });
          }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }
    loadNav();

// Memuat Page Dari Setiap Content 
    let page = window.location.hash.substr(1);
    if (page === "") page = "home";
// console.log(page);
    const loadPage = (page) => {
	document.getElementById('loader').style.display='block';
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                const content = document.querySelector("#body-content");
                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText;
                    if (page === "home" || page === "") {
                        TampilHome();

                    }
                    if (page === "favorite") {
						TeamFavorite();

                    }
                    if (page === "schedule") {
                        TampilMatch();
                    }
                } else if (this.status === 404) {
                    content.innerHTML = ` 
                          <div class="card">
                            <div class="card-content center">
                                <p class="caption mb-0 ">
                                    Ups.. Halaman Tidak Dapat Ditemukan !.
                                </p>
                                <h2>404</h2>

                            </div>
                        </div>`;
                } else {
                    content.innerHTML = errAkses();
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }
    loadPage(page);

});
