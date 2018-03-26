"use strict";

var abc = 45;

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

function loadAdminFunction() {
    $("#formAjoutMission").submit(function (event) {
        event.preventDefault();
        if ($("#missionNom").val() != "") {
            postMission("/test/mission/", $("#missionClient").val(), $("#missionNom").val(), $("#missionDesc").val(), $("#missionEtat").val());
            getMissionsAdmin();
        }
    });

    $("#formAjoutUser").submit(function (event) {
        event.preventDefault();
        if ($("#ajoutLogin").val() != "" && $("#ajoutPass").val() != "") {
            postUser("/test/utilisateur/", $("#ajoutNom").val(), $("#ajoutTelPort").val(), $("#ajoutTelFixe").val(), $("#ajoutEnt").val(), $("#ajoutFonct").val(), $("#ajoutRue").val(), $("#ajoutPrenom").val(), $("#ajoutCP").val(), $("#ajoutVille").val(), $("#ajoutLogin").val(), $("#ajoutPass").val(), $("#ajoutRole").val());
        }
    });

    $("#updateMission").submit(function (event) {
        event.preventDefault();
        updateMission($("#updateEtat").val(), $("#selectUpdateMission").val());
        getMissionsAdmin();
    });
}

function updateMission(etat, id) {

    $.ajax({
        type: 'PUT',
        contentType: 'application/json',
        url: "/test/mission/",
        dataType: "json",
        data: JSON.stringify({
            "etat": etat,
            "id": id

        }),
        success: function success(data, textStatus, jqXHR) {
            makeUpdateMessage(data);
        },
        error: function error(jqXHR, textStatus, errorThrown) {
            console.log('postUser error: ' + textStatus);
        }
    });
}

function loadClientFunction() {
    $("#formUpdateUser").submit(function (event) {
        event.preventDefault();
        updateUser("/test/utilisateur/", $("#updateNom").val(), $("#updateTelPort").val(), $("#updateTelFixe").val(), $("#updateEnt").val(), $("#updateFonct").val(), $("#updateRue").val(), $("#updatePrenom").val(), $("#updateCP").val(), $("#updateVille").val(), $("#mailClient").val(), $("#updatePass").val());
    });
}

function afficherMission(data) {
    console.log(data);
    var chaine = "<ul>";
    for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
        chaine += "<li>" + data[i].mission + " : " + data[i].description + " (" + data[i].etat + ")</li>";
    }
    chaine += "</ul>";
    $("#ListeMission").html(chaine);
}

function loadMission(mail) {
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: "/test/mission/" + mail,
        dataType: "json",
        success: function success(data, textStatus, jqXHR) {
            afficherMission(data);
        },
        error: function error(jqXHR, textStatus, errorThrown) {
            console.log('postUser error: ' + textStatus);
        }
    });
}

function afficherMissionAdmin(data) {
    console.log(data);
    $('#selectUpdateMission').empty();
    var chaine = "<ul>";
    for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
        chaine += "<li>" + data[i].mission + " : " + data[i].description + " (" + data[i].etat + ")</li>";
        $('#selectUpdateMission').append($('<option>', {
            value: data[i].id,
            text: data[i].mission
        }));
    }
    chaine += "</ul>";
    $("#listeMissionAdmin").html(chaine);
}

function getMissionsAdmin() {
    console.log("chargement des missions pour admins");
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: "/test/mission/",
        dataType: "json",
        success: function success(data, textStatus, jqXHR) {
            afficherMissionAdmin(data);
        },
        error: function error(jqXHR, textStatus, errorThrown) {
            console.log('postUser error: ' + textStatus);
        }
    });
}

function afficheUser(data) {
    if (data.id > -1) {
        console.log(data);
        if (data.role == "client") {
            $("#output").html(makeProfil(data));
            loadClientFunction();
            loadMission(data.email);
            initFiles();
        } else if (data.role == "admin") {
            $("#output").html(makeAdminProfil(data));
            getMissionsAdmin();
            initFiles();
            loadAdminFunction();
        }
    } else {
        $("#messageErreur").show();
    }
}

function makeAjoutMissionMessage() {
    console.log("ajout de mission reussi");
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
    var html = "\n    <h3>Bienvenue dans votre espace administration :</h1>\n    <!--Ajout du tableau d'en t\xEAte (nom, prenom, logo neodrone, soci\xE9t\xE9, fonction)-->\n    <table border=\"0\" > \n        <tr> \n            <td> \n                <h3>" + user.nom + "</h3>\n            </td> \n            <td rowspan=\"2\">\n                <a href=\"http://neodrone.fr\"><img src=\"../images/logo.png\" alt=\"Logo neodrone\"></a>\n            </td> \n            <td>\n                <h3> " + user.societe + " </h3>\n            </td> \n        </tr>\n        <tr>\n            <td>\n                <h3>" + user.prenom + "</h3>\n            </td> \n            <td>\n                <h3>" + user.fonction + "</h3>\n            </td>\n        </tr>\n    </table>\n    <br>\n    <ul class=\"nav nav-tabs\">\n        <li class=\"active\">\n            <a data-toggle=\"tab\" href=\"#home\">Clients</a>\n        </li>\n        <li>\n            <a data-toggle=\"tab\" href=\"#infos\">Missions</a>\n        </li>\n        <li>\n            <a data-toggle=\"tab\" href=\"#files\">Fichiers</a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n        <div id=\"home\" class=\"tab-pane fade in active\">\n            <h3>Gestion clients</h3>\n            <p>Ajout d'un utilisateur :</p>\n            <form id=\"formAjoutUser\" method=\"POST\">\n                    <label for=\"ajoutLogin\">Mail :</label>\n                    <input type=\"text\" id=\"ajoutLogin\">\n                    </br>\n                    <label for=\"ajoutRole\">R\xF4le :</label>\n                    <select id=\"ajoutRole\">\n                            <option value=\"admin\">Administrateur</option>\n                            <option value=\"client\">Client</option>\n                    </select>\n                    </br>\n                    <label for=\"ajoutPass\">Mot de passe :</label>\n                    <input type=\"text\" id=\"ajoutPass\" >\n                    </br>\n                    <label for=\"ajoutNom\">Nom :</label>\n                    <input type=\"text\" id=\"ajoutNom\">\n                    </br>\n                    <label for=\"ajoutPrenom\">Prenom :</label>\n                    <input type=\"text\" id=\"ajoutPrenom\">\n                    </br>\n                    <label for=\"ajoutVille\">Ville :</label>\n                    <input type=\"text\" id=\"ajoutVille\">\n                    </br>\n                    <label for=\"ajoutCP\">Code Postal :</label>\n                    <input type=\"text\" id=\"ajoutCP\">\n                    </br>\n                    <label for=\"ajoutRue\">Rue :</label>\n                    <input type=\"text\" id=\"ajoutRue\">\n                    </br>\n                    <label for=\"ajoutFonct\">Fonction :</label>\n                    <input type=\"text\" id=\"ajoutFonct\">\n                    </br>\n                    <label for=\"ajoutEnt\">Entreprise :</label>\n                    <input type=\"text\" id=\"ajoutEnt\">\n                    </br>\n                    <label for=\"ajoutTelFixe\">T\xE9l\xE9phone fixe :</label>\n                    <input type=\"text\" id=\"ajoutTelFixe\">\n                    </br>\n                    <label for=\"ajoutTelPort\">T\xE9l\xE9phone portable :</label>\n                    <input type=\"text\" id=\"ajoutTelPort\">\n                    </br>\n                    \n                    \n                    </br>\n                    <input type=\"submit\" id=\"btnAjout\" value=\"Ajout utilisateur\">\n                </form>\n        </div>\n      \n  \n  \n  \n    <div id=\"infos\" class=\"tab-pane\">\n        <h3>Missions</h3>\n        <p>Ajout d'une mission :</p>\n        <form id=\"formAjoutMission\" method=\"POST\">\n\t\t\t<label for=\"missionNom\">Mission :</label>\n\t\t\t<input type=\"text\" id=\"missionNom\">\n\t\t\t</br>\n\t\t\t<label for=\"missionClient\">Mail client :</label>\n\t\t\t<input type=\"text\" id=\"missionClient\">\n\t\t\t</br>\n\t\t\t<label for=\"missionDesc\">Description :</label>\n\t\t\t<textarea  id=\"missionDesc\" form=\"formAjoutMission\">Enter text here...</textarea>\n\t\t</br>\n\n\t\t\t<label for=\"missionEtat\">Etat de la mission :</label>\n\t\t\t<select id=\"missionEtat\">\n\t\t\t\t\t<option value=\"D\xE9claration realis\xE9e\">D\xE9claration realis\xE9e</option>\n\t\t\t\t\t<option value=\"Autorisation obtenue\">Autorisation obtenue</option>\n\t\t\t\t\t<option value=\"Mission r\xE9alis\xE9e\">Mission r\xE9alis\xE9e</option>\n\t\t\t\t\t<option value=\"Travail photo\">Travail photo</option>\n\t\t\t\t\t<option value=\"Fichiers disponibles\">Fichiers disponibles</option>\n\t\t\t\t\t\n\t\t\t</select>\n\t\t\t<input type=\"submit\" id=\"btnMission\" value=\"Ajout mission\">\n    </form>\n    <div>\n    <p>Modification d'une mission :</p>\n        <form id=\"updateMission\">\n            <select id=\"selectUpdateMission\">\n\n            </select>\n            <select id=\"updateEtat\">\n\t\t\t\t\t<option value=\"D\xE9claration realis\xE9e\">D\xE9claration realis\xE9e</option>\n\t\t\t\t\t<option value=\"Autorisation obtenue\">Autorisation obtenue</option>\n\t\t\t\t\t<option value=\"Mission r\xE9alis\xE9e\">Mission r\xE9alis\xE9e</option>\n\t\t\t\t\t<option value=\"Travail photo\">Travail photo</option>\n\t\t\t\t\t<option value=\"Fichiers disponibles\">Fichiers disponibles</option>\n            </select>\n            <input type=\"submit\" id=\"btnUpdateMission\" value=\"Modifier la mission\">\n\n        </form>\n    </div>\n    <p>Modification du statut d'une mission :</p>\n    <div id=\"listeMissionAdmin\">\n    </div>\n\n    </div>\n    \n    \n    \n    <div id=\"files\" class=\"tab-pane fade\">                        \n        <h3>FILES</h3>\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-sm-4\">\n                    <div id=\"treeview\" class=\"\">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>";
    return html;
}

$('#listeMission').on('change', function () {
    alert(this.value);
});

function makeProfil(user) {
    var html = "\n  <h3>Bienvenue dans votre espace perso :</h1>\n  <!--Ajout du tableau d'en t\xEAte (nom, prenom, logo neodrone, soci\xE9t\xE9, fonction)-->\n  <table border=\"0\" > \n      <tr> \n          <td> \n              <h3>" + user.nom + "</h3>\n          </td> \n          <td rowspan=\"2\">\n              <a href=\"http://neodrone.fr\"><img src=\"../images/logo.png\" alt=\"Logo neodrone\"></a>\n          </td> \n          <td>\n              <h3> " + user.societe + " </h3>\n          </td> \n      </tr>\n      <tr>\n          <td>\n              <h3>" + user.prenom + "</h3>\n          </td> \n          <td>\n              <h3>" + user.fonction + "</h3>\n          </td>\n      </tr>\n  </table>\n  <br>\n <!-- Ajout du menu \"\xE0 onglet-->\n  <ul class=\"nav nav-tabs\">\n      <li class=\"active\">\n          <a data-toggle=\"tab\" href=\"#home\">Mon compte</a>\n      </li>\n      <li>\n          <a data-toggle=\"tab\" href=\"#infos\">Mes missions</a>\n      </li>\n      <li>\n          <a data-toggle=\"tab\" href=\"#files\">Mes fichiers</a>\n      </li>\n  </ul>\n  <div class=\"tab-content\">\n      <div id=\"home\" class=\"tab-pane fade in active\">\n          <h3>HOME</h3>\n          <p>Modif d'un utilisateur :</p>\n          <form id=\"formUpdateUser\" method=\"POST\">\n              <p>Mon mail :</p><p id=\"mailClient\">" + user.email + "</>\n              </br>\n              <label for=\"updatePass\">Mot de passe :</label>\n              <input type=\"text\" id=\"updatePass\" >\n              </br>\n              <label for=\"updateNom\">Nom :</label>\n              <input type=\"text\" id=\"updateNom\">\n              </br>\n              <label for=\"updatePrenom\">Prenom :</label>\n              <input type=\"text\" id=\"updatePrenom\">\n              </br>\n              <label for=\"updateVille\">Ville :</label>\n              <input type=\"text\" id=\"updateVille\">\n              </br>\n              <label for=\"updateCP\">Code Postal :</label>\n              <input type=\"text\" id=\"updateCP\">\n              </br>\n              <label for=\"updateRue\">Rue :</label>\n              <input type=\"text\" id=\"updateRue\">\n              </br>\n              <label for=\"updateFonct\">Fonction :</label>\n              <input type=\"text\" id=\"updateFonct\">\n              </br>\n              <label for=\"updateEnt\">Entreprise :</label>\n              <input type=\"text\" id=\"updateEnt\">\n              </br>\n              <label for=\"updateTelFixe\">T\xE9l\xE9phone fixe :</label>\n              <input type=\"text\" id=\"updateTelFixe\">\n              </br>\n              <label for=\"updateTelPort\">T\xE9l\xE9phone portable :</label>\n              <input type=\"text\" id=\"updateTelPort\">\n              </br>\n              </br>\n              <input type=\"submit\" id=\"btnUpdateUser\" value=\"Update utilisateur\">\n          </form>\n      </div>\n    \n\n\n\n  <div id=\"infos\" class=\"tab-pane\">\n      <h3 id=\"headerMission\">Mes Missions</h3>\n      <div id=\"ListeMission\">\n        </div>\n\n\n  </div>\n  \n  \n  \n  <div id=\"files\" class=\"tab-pane fade\">                        \n      <h3>FILES</h3>\n      <div class=\"container\">\n          <div class=\"row\">\n              <div class=\"col-sm-4\">\n                  <div id=\"treeview\" class=\"\">\n                  </div>\n              </div>\n          </div>\n      </div>\n  </div>";
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
    //gestion de la réussite de l'ajout client  
    console.log("ajout client réussi");
}

function makeUpdateMessage(data) {
    //gestion de la réussite de l'update client  
    console.log("update client réussi");
}