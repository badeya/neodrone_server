"use strict";

$("#formConnection").submit(function (event) {
  // des qu'il y a un event appeler la ligne suivante
  event.preventDefault();

  $("#messageErreur").hide();

  getWithAuthorizationHeader("/test/login", afficheUser);
});

function getWithAuthorizationHeader(url, callback) {
  if ($("#login").val() != "") {
    $.ajax({
      type: "GET",
      url: url,
      dataType: 'json',
      beforeSend: function beforeSend(req) {
        req.setRequestHeader("Authorization", "Basic " + btoa($("#login").val() + ":" + $("#mdp").val()));
      },
      success: callback,
      error: function error(jqXHR, textStatus, errorThrown) {
        alert('error: ' + textStatus);
      }
    });
  } else {
    $.getJSON(url, function (data) {
      afficheUser(data);
    });
  }
}

function afficheUser(data) {
  if (data.id > -1) {
    console.log(data);
    $("#output").html(makeProfil(data));
  } else {
    $("#messageErreur").show();
  }
}

function makeProfil(user) {
  var html = "<h3>Bienvenue " + " dans votre espace perso :</h1>";
  //  let html = "<h3>Bienvenue " +  user.prenom + " " + user.nom+ " dans votre espace perso :</h1>";
  return html;
  //return user.id + ". " + user.nom + " &lt;" + user.email + "&gt;" + " (" + user.prenom + ")";
}

$("#formAjoutUser").submit(function (event) {
  event.preventDefault();
  if ($("#ajoutLogin").val() != "" && $("#ajoutPass").val() != "") {
    $.ajax({
      type: "POST",
      url: "/test/utilisateur/insertion",
      dataType: 'json',
      beforeSend: function beforeSend(req) {
        req.setRequestHeader("Authorization", "Basic " + btoa($("#ajoutLogin").val() + ":" + $("#ajoutPassmdp").val() + ":" + $("#ajoutNom").val() + ":" + $("#ajoutPrenom").val() + ":" + $("#ajoutCP").val() + ":" + $("#ajoutTelFixe").val() + ":" + $("#ajoutTelPort").val() + ":" + $("#ajoutFonct").val() + ":" + $("#ajoutEnt").val() + ":" + $("#ajoutRue").val() + ":" + $("#ajoutRue").val() + ":" + $("#ajoutRole").val()));
      },
      success: ajoutUtilisateur(),
      error: function error(jqXHR, textStatus, errorThrown) {
        alert('error: ' + textStatus);
      }
    });
  }

  //console.log($("#ajoutRole").val());
});

function ajoutUtilisateur() {
  //TODO afficher un message apres l'ajout d'une personne en base
  console.log("ajout utilisateur fait");
}