"use strict";

var aze = 55;

$("#formConnection").submit(function (event) {
  // des qu'il y a un event appeler la ligne suivante
  event.preventDefault();

  $("#messageErreur").hide();
  var login = $('#formConnection').find('input[name="login"]').val();
  var password = $('#formConnection').find('input[name="password"]').val();

  //console.log(login);
  //console.log(password);

  if (login.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {

    //console.log(JSON.stringify($("form").serializeArray()));
    $.ajax({
      url: "/test/connect",
      type: "POST",
      dataType: "json",
      data: "{login :" + login + ",mdp :" + password + "}",
      success: function success(json) {
        authent(json);
      },
      error: function error(xhr, status, errorThrown) {
        alert("Sorry, there was a problem!");
        console.log("Error: " + errorThrown);
        console.log("Status: " + status);
        console.dir(xhr);
      },
      complete: function complete(xhr, status) {
        console.log('ajax request completed !');
      }
    });
  } else {
    //Gestion erreur saisie MAIL

    $("#messageErreur").show();
  }
});

function authent(json) {
  console.log("rep :" + json);
}