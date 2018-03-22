'use strict';

//SCRIPT QUI GERE LA CONNEXION UTILISATEUR ET LE RETOUR DE CONNEXION
var mama = 42;
var mavariable = 1337;
console.log(mavariable);

$("#formConnection").submit(function (event) {
  // des qu'il y a un event appeler la ligne suivante
  event.preventDefault();

  //alert( "Handler for .submit() called." );
  var text = $('#formConnection').find('input[name="login"]').val();
  console.log(text);
  var mdp = $('#formConnection').find('input[name="password"]').val();
  console.log(mdp);
});