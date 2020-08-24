document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  // console.log(idParam)
  DetailTeam(idParam);

});