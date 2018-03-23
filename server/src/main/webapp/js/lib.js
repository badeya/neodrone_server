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
    if (data.role == "client") $("#output").html(makeProfil(data));else if (data.role == "admin") $("#output").html(makeAdminProfil(data));
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

function makeAdminProfil(user) {
  var html = "<h3>Bienvenue " + " dans votre espace admin :</h1>";
  return html;
}

function makeProfil(user) {
  var html = "<h3>Bienvenue dans votre espace perso :</h1>";
  //Ajout du tableau d'en tête (nom, prenom, logo neodrone, société, fonction)
  html += "<table border=\"0\" > <tr> <td> <h3>" + user.nom + "</h3></td> <td rowspan=\"2\"><a href=\"http://neodrone.fr\"><img src=\"res/logo.png\" alt=\"Logo neodrone\"></a></td> <td><h3>" + user.societe + "</h3></td> </tr><tr><td><h3>" + user.prenom + "</h3></td> <td><h3>" + user.fonction + "</h3></td></tr></table>";
  html += "<br>";
  //Ajout du menu "à onglet";
  html += "<ul class=\"nav nav-tabs\">";
  html += "<li class=\"active\">";
  html += "<a data-toggle=\"tab\" href=\"#home\">Home</a></li>";
  html += "<li><a data-toggle=\"tab\" href=\"#infos\">INFOS</a></li>";
  html += "<li><a data-toggle=\"tab\" href=\"#files\">FILES</a></li></ul>";
  html += "<div class=\"tab-content\"><div id=\"home\" class=\"tab-pane fade in active\">";
  html += "<h3>HOME</h3>";
  /**************************/

  html += "<p>Modif d'un utilisateur :</p>";
  html += "<form id=\"formUpdateUser\" method=\"POST\">";
  html += "<label for=\"updateLogin\">Mail :</label>";
  html += "<input type=\"text\" id=\"updateLogin\">";
  html += "</br>";
  html += "<label for=\"updatePass\">Mot de passe :</label>";
  html += "<input type=\"text\" id=\"updatePass\" >";
  html += "</br>";
  html += "<label for=\"updateNom\">Nom :</label>";
  html += "<input type=\"text\" id=\"updateNom\">";
  html += "</br>";
  html += "<label for=\"updatePrenom\">Prenom :</label>";
  html += "<input type=\"text\" id=\"updatePrenom\">";
  html += "</br>";
  html += "<label for=\"updateVille\">Ville :</label>";
  html += "<input type=\"text\" id=\"updateVille\">";
  html += "</br>";
  html += "<label for=\"updateCP\">Code Postal :</label>";
  html += "<input type=\"text\" id=\"updateCP\">";
  html += "</br>";
  html += "<label for=\"updateRue\">Rue :</label>";
  html += "<input type=\"text\" id=\"updateRue\">";
  html += "</br>";
  html += "<label for=\"updateFonct\">Fonction :</label>";
  html += "<input type=\"text\" id=\"updateFonct\">";
  html += "</br>";
  html += "<label for=\"updateEnt\">Entreprise :</label>";
  html += "<input type=\"text\" id=\"updateEnt\">";
  html += "</br>";
  html += "<label for=\"updateTelFixe\"\>Téléphone fixe :</label>";
  html += "<input type=\"text\" id=\"updateTelFixe\">";
  html += "</br>";
  html += "<label for=\"updateTelPort\">Téléphone portable :</label>";
  html += "<input type=\"text\" id=\"updateTelPort\">";
  html += "</br>";
  html += "</br>";
  html += "<input type=\"submit\" id=\"btnUpdateUser\" value=\"Update utilisateur\">";
  html += "</form>";

  /********************/

  html += "<div id=\"infos\" class=\"tab-pane\">";
  html += "<h3>INFOS</h3><p>BLABLA DES INFOS</p></div>";
  html += "<div id=\"files\" class=\"tab-pane fade\">";
  html += "<h3>FILES</h3>";
  html += "<div class=\"container\">";
  html += "<div class=\"row\"><div class=\"col-sm-4\"><div id=\"treeview\" class=\"\"></div></div></div></div>";
  html += "<script>";
  html += "var defaultData = [{";
  html += "text: \'mission1\',";
  html += "href: \'#parent1\',";
  html += "nodes: [{";
  html += "text: \'FILE 1\',";
  html += "href: \'#child1\', },";
  html += "{text: \'FILE 2\',";
  html += "href: \'#child2\',}]},";
  html += "{text: \'mission2\',";
  html += "href: \'#parent2\',";
  html += "nodes: [{text: \'FILE 1\',";
  html += "icon: \'glyphicon glyphicon-camera\',";
  html += "href: \'localhost:8080\',";
  html += "selectable: true,";
  html += "state: {";
  html += "checked: false,";
  html += "disabled: false,";
  html += "expanded: false,";
  html += "selected: false},},";
  html += "{text: \'FILE 2\',";
  html += "icon: \'glyphicon glyphicon-film\',";
  html += "href: \'http://www.google.fr\',";
  html += "selectable: true,";
  html += "state: {";
  html += "checked: false,";
  html += "disabled: false,";
  html += "expanded: false,";
  html += "selected: false},}]},";
  html += "{text: \'mission3\',";
  html += "href: \'#parent3\',},";
  html += "{text: \'mission4\',";
  html += "href: \'#parent4\',},";
  html += "{text: \'mission5\',";
  html += "href: \'#parent5\' ,}];";
  html += "$('#treeview').treeview({";
  html += " color: \"#000000\",";
  html += " data: defaultData,enableLinks: true});</script></div></div>";
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
});

$("#formUpdateUser").submit(function (event) {
  event.preventDefault();
  updateUser("/test/utilisateur/", $("#updateNom").val(), $("#updateTelPort").val(), $("#updateTelFixe").val(), $("#updateEnt").val(), $("#updateFonct").val(), $("#updateRue").val(), $("#updatePrenom").val(), $("#updateCP").val(), $("#updateVille").val(), $("#updateLogin").val(), $("#updatePass").val());
});

$("#formAjoutMission").submit(function (event) {
  event.preventDefault();
  if ($("#missionNom").val() != "") {
    postMission("/test/mission/", $("#missionClient").val(), $("#missionNom").val(), $("#missionDesc").val(), $("#missionEtat").val());
  }
});