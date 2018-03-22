"use strict";

var aze = 55;

$("#formConnection").submit(function (event) {
  // des qu'il y a un event appeler la ligne suivante
  event.preventDefault();

  $("#messageErreur").hide();

  getWithAuthorizationHeader("/test/login", afficheUser);
});

function authent() {
  //console.log("authen");
}

$("#formAjoutUser").submit(function (event) {
  event.preventDefault();
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
  console.log(data);
  $("#output").html(userStringify(data));
}

function userStringify(user) {
  return user.id + ". " + user.nom + " &lt;" + user.email + "&gt;" + " (" + user.prenom + ")";
}