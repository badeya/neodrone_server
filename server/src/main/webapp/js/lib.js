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
            beforeSend: function (req) {
                req.setRequestHeader("Authorization", "Basic " + btoa($("#login").val() + ":" + $("#mdp").val()));
            },
            success: callback,
            error: function (jqXHR, textStatus, errorThrown) {
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
            $("#formAjoutUser").submit(function (event) {
                event.preventDefault();
                if ($("#ajoutLogin").val() != "" && $("#ajoutPass").val() != "") {
                    postUser("/test/utilisateur/", $("#ajoutNom").val(), $("#ajoutTelPort").val(), $("#ajoutTelFixe").val(), $("#ajoutEnt").val(), $("#ajoutFonct").val(), $("#ajoutRue").val(), $("#ajoutPrenom").val(), $("#ajoutCP").val(), $("#ajoutVille").val(), $("#ajoutLogin").val(), $("#ajoutPass").val(), $("#ajoutRole").val());
                }
            });
        }
    } else {
        $("#messageErreur").show();
    }
}

function makeAjoutMissionMessage() {
    let txt2 = $("<p id='newP'></p>").text("Ajout Mission Réussi");
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
        success: function (data, textStatus, jqXHR) {
            makeAjoutMissionMessage(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
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
        success: function (data, textStatus, jqXHR) {
            makeAjoutMessage(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
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
        success: function (data, textStatus, jqXHR) {
            makeUpdateMessage(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('postUser error: ' + textStatus);
        }
    });
}

function makeAdminProfil(user) {
    let html = `
    <h3>Bienvenue dans votre espace administration :</h1>
    <!--Ajout du tableau d'en tête (nom, prenom, logo neodrone, société, fonction)-->
    <table border="0" > 
        <tr> 
            <td> 
                <h3>${user.nom}</h3>
            </td> 
            <td rowspan="2">
                <a href="http://neodrone.fr"><img src="res/logo.png" alt="Logo neodrone"></a>
            </td> 
            <td>
                <h3> ${user.societe} </h3>
            </td> 
        </tr>
        <tr>
            <td>
                <h3>${user.prenom}</h3>
            </td> 
            <td>
                <h3>${user.fonction}</h3>
            </td>
        </tr>
    </table>
    <br>
   <!-->Ajout du menu "à onglet-->
    <ul class="nav nav-tabs">
        <li class="active">
            <a data-toggle="tab" href="#home">Clients</a>
        </li>
        <li>
            <a data-toggle="tab" href="#infos">Missions</a>
        </li>
        <li>
            <a data-toggle="tab" href="#files">Fichiers</a>
        </li>
    </ul>
    <div class="tab-content">
        <div id="home" class="tab-pane fade in active">
            <h3>Gestion clients</h3>
            <p>Ajout d'un utilisateur :</p>
            <form id="formAjoutUser" method="POST">
                    <label for="ajoutLogin">Mail :</label>
                    <input type="text" id="ajoutLogin">
                    </br>
                    <label for="ajoutRole">Rôle :</label>
                    <select id="ajoutRole">
                            <option value="admin">Administrateur</option>
                            <option value="client">Client</option>
                    </select>
                    </br>
                    <label for="ajoutPass">Mot de passe :</label>
                    <input type="text" id="ajoutPass" >
                    </br>
                    <label for="ajoutNom">Nom :</label>
                    <input type="text" id="ajoutNom">
                    </br>
                    <label for="ajoutPrenom">Prenom :</label>
                    <input type="text" id="ajoutPrenom">
                    </br>
                    <label for="ajoutVille">Ville :</label>
                    <input type="text" id="ajoutVille">
                    </br>
                    <label for="ajoutCP">Code Postal :</label>
                    <input type="text" id="ajoutCP">
                    </br>
                    <label for="ajoutRue">Rue :</label>
                    <input type="text" id="ajoutRue">
                    </br>
                    <label for="ajoutFonct">Fonction :</label>
                    <input type="text" id="ajoutFonct">
                    </br>
                    <label for="ajoutEnt">Entreprise :</label>
                    <input type="text" id="ajoutEnt">
                    </br>
                    <label for="ajoutTelFixe">Téléphone fixe :</label>
                    <input type="text" id="ajoutTelFixe">
                    </br>
                    <label for="ajoutTelPort">Téléphone portable :</label>
                    <input type="text" id="ajoutTelPort">
                    </br>
                    
                    
                    </br>
                    <input type="submit" id="btnAjout" value="Ajout utilisateur">
                </form>
        </div>
      
  
  
  
    <div id="infos" class="tab-pane">
        <h3>INFOS</h3>
        <p>Ajout d'une mission :</p>
        <form id="formAjoutMission" method="POST">
			<label for="missionNom">Mission :</label>
			<input type="text" id="missionNom">
			</br>
			<label for="missionClient">Mail client :</label>
			<input type="text" id="missionClient">
			</br>
			<label for="missionDesc">Description :</label>
			<textarea  id="missionDesc" form="formAjoutMission">Enter text here...</textarea>
		</br>

			<label for="missionEtat">Etat de la mission :</label>
			<select id="missionEtat">
					<option value="declaration">Déclaration realisée</option>
					<option value="Autorisation">Autorisation obtenue</option>
					<option value="mission">Mission réalisée</option>
					<option value="travail">Travail photo</option>
					<option value="fichiers">Fichiers disponibles</option>
					
			</select>
			<input type="submit" id="btnMission" value="Ajout mission">
	</form>
    </div>
    
    
    
    <div id="files" class="tab-pane fade">                        
        <h3>FILES</h3>
        <div class="container">
            <div class="row">
                <div class="col-sm-4">
                    <div id="treeview" class="">
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    return html;
}

function makeProfil(user) {
    let html = `
  <h3>Bienvenue dans votre espace perso :</h1>
  <!--Ajout du tableau d'en tête (nom, prenom, logo neodrone, société, fonction)-->
  <table border="0" > 
      <tr> 
          <td> 
              <h3>${user.nom}</h3>
          </td> 
          <td rowspan="2">
              <a href="http://neodrone.fr"><img src="./../images/logo.png" alt="Logo neodrone"></a>
          </td> 
          <td>
              <h3> ${user.societe} </h3>
          </td> 
      </tr>
      <tr>
          <td>
              <h3>${user.prenom}</h3>
          </td> 
          <td>
              <h3>${user.fonction}</h3>
          </td>
      </tr>
  </table>
  <br>
 <!-->Ajout du menu "à onglet-->
  <ul class="nav nav-tabs">
      <li class="active">
          <a data-toggle="tab" href="#home">Mon compte</a>
      </li>
      <li>
          <a data-toggle="tab" href="#infos">Mes missions</a>
      </li>
      <li>
          <a data-toggle="tab" href="#files">Mes fichiers</a>
      </li>
  </ul>
  <div class="tab-content">
      <div id="home" class="tab-pane fade in active">
          <h3>HOME</h3>
          <p>Modif d'un utilisateur :</p>
          <form id="formUpdateUser" method="POST">
              <label for="updateLogin">Mail :</label>
              <input type="text" id="updateLogin">
              </br>
              <label for="updatePass">Mot de passe :</label>"
              <input type="text" id="updatePass" >
              </br>
              <label for="updateNom">Nom :</label>
              <input type="text" id="updateNom">
              </br>
              <label for="updatePrenom">Prenom :</label>
              <input type="text" id="updatePrenom">
              </br>
              <label for="updateVille">Ville :</label>
              <input type="text" id="updateVille">
              </br>
              <label for="updateCP">Code Postal :</label>
              <input type="text" id="updateCP">
              </br>
              <label for="updateRue">Rue :</label>
              <input type="text" id="updateRue">
              </br>
              <label for="updateFonct">Fonction :</label>
              <input type="text" id="updateFonct">
              </br>
              <label for="updateEnt">Entreprise :</label>
              <input type="text" id="updateEnt">
              </br>
              <label for="updateTelFixe"\>Téléphone fixe :</label>
              <input type="text" id="updateTelFixe">
              </br>
              <label for="updateTelPort">Téléphone portable :</label>
              <input type="text" id="updateTelPort">
              </br>
              </br>
              <input type="submit" id="btnUpdateUser" value="Update utilisateur">
          </form>
      </div>
    



  <div id="infos" class="tab-pane">
      <h3>INFOS</h3>
      <p>BLABLA DES INFOS</p>
  </div>
  
  
  
  <div id="files" class="tab-pane fade">                        
      <h3>FILES</h3>
      <div class="container">
          <div class="row">
              <div class="col-sm-4">
                  <div id="treeview" class="">
                  </div>
              </div>
          </div>
      </div>
  </div>`;
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
    let txt2 = $("<p id='newP'></p>").text("Ajout client réussi");
    $("#output").append(txt2);
}

function makeUpdateMessage(data) {
    let txt2 = $("<p id='newP'></p>").text("update client réussi");
    $("#output").append(txt2);
}

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