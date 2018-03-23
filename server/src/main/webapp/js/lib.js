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
        if (data.role == "client") {
            $("#output").html(makeProfil(data));
            initFiles();
        } else if (data.role == "admin") {
            $("#output").html(makeAdminProfil(data));
            initFiles();
        }
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
    var html = "<h3>Bienvenue dans votre espace admin :</h1>";
    return html;
}

function makeProfil(user) {
    var html = "\n  <h3>Bienvenue dans votre espace perso :</h1>\n  <!--Ajout du tableau d'en t\xEAte (nom, prenom, logo neodrone, soci\xE9t\xE9, fonction)-->\n  <table border=\"0\" > \n      <tr> \n          <td> \n              <h3>" + user.nom + "</h3>\n          </td> \n          <td rowspan=\"2\">\n              <a href=\"http://neodrone.fr\"><img src=\"res/logo.png\" alt=\"Logo neodrone\"></a>\n          </td> \n          <td>\n              <h3> " + user.societe + " </h3>\n          </td> \n      </tr>\n      <tr>\n          <td>\n              <h3>" + user.prenom + "</h3>\n          </td> \n          <td>\n              <h3>" + user.fonction + "</h3>\n          </td>\n      </tr>\n  </table>\n  <br>\n <!-->Ajout du menu \"\xE0 onglet-->\n  <ul class=\"nav nav-tabs\">\n      <li class=\"active\">\n          <a data-toggle=\"tab\" href=\"#home\">Mon compte</a>\n      </li>\n      <li>\n          <a data-toggle=\"tab\" href=\"#infos\">Mes missions</a>\n      </li>\n      <li>\n          <a data-toggle=\"tab\" href=\"#files\">Mes fichiers</a>\n      </li>\n  </ul>\n  <div class=\"tab-content\">\n      <div id=\"home\" class=\"tab-pane fade in active\">\n          <h3>HOME</h3>\n          <p>Modif d'un utilisateur :</p>\n          <form id=\"formUpdateUser\" method=\"POST\">\n              <label for=\"updateLogin\">Mail :</label>\n              <input type=\"text\" id=\"updateLogin\">\n              </br>\n              <label for=\"updatePass\">Mot de passe :</label>\"\n              <input type=\"text\" id=\"updatePass\" >\n              </br>\n              <label for=\"updateNom\">Nom :</label>\n              <input type=\"text\" id=\"updateNom\">\n              </br>\n              <label for=\"updatePrenom\">Prenom :</label>\n              <input type=\"text\" id=\"updatePrenom\">\n              </br>\n              <label for=\"updateVille\">Ville :</label>\n              <input type=\"text\" id=\"updateVille\">\n              </br>\n              <label for=\"updateCP\">Code Postal :</label>\n              <input type=\"text\" id=\"updateCP\">\n              </br>\n              <label for=\"updateRue\">Rue :</label>\n              <input type=\"text\" id=\"updateRue\">\n              </br>\n              <label for=\"updateFonct\">Fonction :</label>\n              <input type=\"text\" id=\"updateFonct\">\n              </br>\n              <label for=\"updateEnt\">Entreprise :</label>\n              <input type=\"text\" id=\"updateEnt\">\n              </br>\n              <label for=\"updateTelFixe\">T\xE9l\xE9phone fixe :</label>\n              <input type=\"text\" id=\"updateTelFixe\">\n              </br>\n              <label for=\"updateTelPort\">T\xE9l\xE9phone portable :</label>\n              <input type=\"text\" id=\"updateTelPort\">\n              </br>\n              </br>\n              <input type=\"submit\" id=\"btnUpdateUser\" value=\"Update utilisateur\">\n          </form>\n      </div>\n    \n\n\n\n  <div id=\"infos\" class=\"tab-pane\">\n      <h3>INFOS</h3>\n      <p>BLABLA DES INFOS</p>\n  </div>\n  \n  \n  \n  <div id=\"files\" class=\"tab-pane fade\">                        \n      <h3>FILES</h3>\n      <div class=\"container\">\n          <div class=\"row\">\n              <div class=\"col-sm-4\">\n                  <div id=\"treeview\" class=\"\">\n                  </div>\n              </div>\n          </div>\n      </div>\n  </div>";
    return html;
}

function initFiles() {
    var defaultData = [{
        text: 'mission1',
        href: '#parent1',
        nodes: [{
            text: 'FILE 1',
            href: '#child1' }, { text: 'FILE 2',
            href: '#child2' }] }, {
        text: 'mission2',
        href: '#parent2',
        nodes: [{
            text: 'FILE 1',
            icon: 'glyphicon glyphicon-camera',
            href: 'localhost:8080',
            selectable: true
        }, {
            text: 'FILE 2',
            icon: 'glyphicon glyphicon-film',
            href: 'http://www.google.fr',
            selectable: true,
            state: {
                checked: false,
                disabled: false,
                expanded: false,
                selected: false
            }
        }]
    }, { text: 'mission3',
        href: '#parent3' }, { text: 'mission4',
        href: '#parent4' }, { text: 'mission5',
        href: '#parent5' }];

    $('#treeview').treeview({
        color: "#000000",
        data: defaultData, enableLinks: true });
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