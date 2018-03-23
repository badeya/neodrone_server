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

function makeAjoutMissionMessage() {
  var txt2 = $("<p id='newP'></p>").text("Ajout Mission Réussi");
  $("#output").append(txt2);
}

function postMission(url, email, mission, description, etat) {
  console.log("postUser " + url);
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: url,
    dataType: "json",
    data: JSON.stringify({
      "client": email,
      "mission": mission,
      "description": description,
      "etat": etat

    }),
    success: function success(data, textStatus, jqXHR) {
      makeAjoutMissionMessage(data);
    },
    error: function error(jqXHR, textStatus, errorThrown) {
      console.log('postUser error: ' + textStatus);
    }
  });
}

function postUser(url, nom, telport, telfixe, entreprise, fonction, rue, prenom, codepostal, ville, email, pwd, role) {
  console.log("postUser " + url);
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: url,
    dataType: "json",
    data: JSON.stringify({
      "email": email,
      "password": pwd,
      "role": role,
      "nom": nom,
      "prenom": prenom,
      "ville": ville,
      "codep": codepostal,
      "rue": rue,
      "fonction": fonction,
      "societe": entreprise,
      "mobile": telfixe,
      "fixe": telport

    }),
    success: function success(data, textStatus, jqXHR) {
      makeAjoutMessage(data);
    },
    error: function error(jqXHR, textStatus, errorThrown) {
      console.log('postUser error: ' + textStatus);
    }
  });
}

function makeProfil(user) {
  var html = "<h3>Bienvenue " + " dans votre espace perso :</h1>";
  //  let html = "<h3>Bienvenue " +  user.prenom + " " + user.nom+ " dans votre espace perso :</h1>";
  return html;
  //return user.id + ". " + user.nom + " &lt;" + user.email + "&gt;" + " (" + user.prenom + ")";
}

function makeAjoutMessage(data) {
  var txt2 = $("<p id='newP'></p>").text("Ajout client réussi");
  $("#output").append(txt2);
}

$("#formAjoutUser").submit(function (event) {
  event.preventDefault();
  if ($("#ajoutLogin").val() != "" && $("#ajoutPass").val() != "") {
    postUser("/test/utilisateur/", $("#ajoutNom").val(), $("#ajoutTelPort").val(), $("#ajoutTelFixe").val(), $("#ajoutEnt").val(), $("#ajoutFonct").val(), $("#ajoutRue").val(), $("#ajoutPrenom").val(), $("#ajoutCP").val(), $("#ajoutVille").val(), $("#ajoutLogin").val(), $("#ajoutPass").val(), $("#ajoutRole").val());
  }

  //console.log($("#ajoutRole").val());
});

$("#formAjoutMission").submit(function (event) {
  event.preventDefault();
  if ($("#missionNom").val() != "") {
    postMission("/test/mission/", $("#missionClient").val(), $("#missionNom").val(), $("#missionDesc").val(), $("#missionEtat").val());
  }

  //console.log($("#ajoutRole").val());
});
function ajoutUtilisateur() {
  //TODO afficher un message apres l'ajout d'une personne en base
  console.log("ajout utilisateur fait");
}