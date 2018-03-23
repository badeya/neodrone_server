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

function updateUser(url, nom, telport, telfixe, entreprise, fonction, rue, prenom, codepostal, ville, email, pwd) {
  console.log("postUser " + url);
  $.ajax({
    type: 'PUT',
    contentType: 'application/json',
    url: url,
    dataType: "json",
    data: JSON.stringify({
      "email": email,
      "password": pwd,
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
      makeUpdateMessage(data);
    },
    error: function error(jqXHR, textStatus, errorThrown) {
      console.log('postUser error: ' + textStatus);
    }
  });
}

function makeProfil(user) {
  var html = "<h3>Bienvenue " + " dans votre espace perso :</h1>";
  //Ajout du tableau d'en tête (nom, prenom, logo neodrone, société, fonction)
  html += "<table border=\"0\" > <tr> <td> <h3>" + user.nom + "</h3></td> <td rowspan=\"2\"><a href=\"http://neodrone.fr\"><img src=\"res/logo.png\" alt=\"Logo neodrone\"></a></td> <td><h3>" + user.societe + "</h3></td> </tr><tr><td><h3>" + user.prenom + "</h3></td> <td><h3>" + user.fonction + "</h3></td></tr></table>";
  html += "<br>";
  //Ajout du menu "à onglet"
  html += "<ul class=\"nav nav-tabs\"> <li class=\"active\"><a data-toggle=\"tab\" href=\"#home\">Home</a></li><li><a data-toggle=\"tab\" href=\"#infos\">INFOS</a></li><li><a data-toggle=\"tab\" href=\"#files\">FILES</a></li></ul>";
  html += "<div class=\"tab-content\"><div id=\"home\" class=\"tab-pane fade in active\"><h3>HOME</h3><p>BLABLABLA DU HOME</p></div><div id=\"infos\" class=\"tab-pane\"><h3>INFOS</h3><p>BLABLA DES INFOS</p></div><div id=\"files\" class=\"tab-pane fade\"><h3>FILES</h3><div class=\"container\"><div class=\"row\"><div class=\"col-sm-4\"><div id=\"treeview\" class=\"\"></div></div></div></div><script>var defaultData = [{text: \'mission1\',href: \'#parent1\',nodes: [{text: \'FILE 1\',href: \'#child1\', },{text: \'FILE 2\',href: \'#child2\',}]},{text: \'mission2\',href: \'#parent2\',nodes: [{text: \'FILE 1\',icon: \'glyphicon glyphicon-camera\',href: \'localhost:8080\',selectable: true,state: {checked: false,disabled: false,expanded: false,selected: false},},{text: \'FILE 2\',icon: \'glyphicon glyphicon-film\',href: \'http://www.google.fr\',selectable: true,state: {checked: false,disabled: false,expanded: false,selected: false},}]},{text: \'mission3\',href: \'#parent3\',},{text: \'mission4\',href: \'#parent4\',},{text: \'mission5\',href: \'#parent5\' ,}]; $('#treeview').treeview({ color: \"#000000\", data: defaultData,enableLinks: true});</script></div></div>";

  return html;
}

function makeAjoutMessage(data) {
  var txt2 = $("<p id='newP'></p>").text("Ajout client réussi");
  $("#output").append(txt2);
}

function makeUpdateMessage(data) {
  var txt2 = $("<p id='newP'></p>").text("update client réussi");
  $("#output").append(txt2);
}

$("#formAjoutUser").submit(function (event) {
  event.preventDefault();
  if ($("#ajoutLogin").val() != "" && $("#ajoutPass").val() != "") {
    postUser("/test/utilisateur/", $("#ajoutNom").val(), $("#ajoutTelPort").val(), $("#ajoutTelFixe").val(), $("#ajoutEnt").val(), $("#ajoutFonct").val(), $("#ajoutRue").val(), $("#ajoutPrenom").val(), $("#ajoutCP").val(), $("#ajoutVille").val(), $("#ajoutLogin").val(), $("#ajoutPass").val(), $("#ajoutRole").val());
  }

  //console.log($("#ajoutRole").val());
});

$("#formUpdateUser").submit(function (event) {
  event.preventDefault();
  updateUser("/test/utilisateur", $("#updateNom").val(), $("#updateTelPort").val(), $("#updateTelFixe").val(), $("#updateEnt").val(), $("#updateFonct").val(), $("#updateRue").val(), $("#updatePrenom").val(), $("#updateCP").val(), $("#updateVille").val(), $("#updateLogin").val(), $("#updatePass").val());
});

$("#formAjoutMission").submit(function (event) {
  event.preventDefault();
  if ($("#missionNom").val() != "") {
    postMission("/test/mission/", $("#missionClient").val(), $("#missionNom").val(), $("#missionDesc").val(), $("#missionEtat").val());
  }
});

function ajoutUtilisateur() {
  //TODO afficher un message apres l'ajout d'une personne en base
  console.log("ajout utilisateur fait");
}