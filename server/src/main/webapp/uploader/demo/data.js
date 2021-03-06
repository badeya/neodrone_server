$(document).ready(function () {

    $("#clientList").show();
    $("#missionList").hide();
    $("#dropArea").hide();

    displayClients();

    // SELECT CLIENT IN LIST
    $("#clientList").change(function () {
        // If element is still not used
        if ($("#clientList").is(":visible")) {

            var value = $("#clientSelect").val();
            console.log(value);
            displayMissions(value);

            // AJAX

            $("#clientList").hide();
            $("#missionList").show();
        }

        else
            alert("An error occured, please relad page.");
    });


    // SELECT MISSION FOR THIS CLIENT
    $("#missionList").change(function () {
        // If element is still not used
        if ($("#missionList").is(":visible")) {
            var val = $("#missionSelect").val();
            $("#idMission").val(val);

            $("#missionList").hide();
            $("#dropArea").show();
        }

        else
            alert("An error occured, please relad page.");
    });

    $("#reloadUpload").click(function () {
        $("#clientList").show();
        $("#missionList").hide();
        $("#dropArea").hide();

        displayClients();
    })

});

function displayClients() {
    var url = "/test/utilisateur";

    $("#clientSelect").empty();
    $("#clientSelect").append("<option disabled selected value> selectionnez un client </option>");

    $.getJSON(url, function () {
        // TODO
    })
        .done(function (data) {

            $.each(data, function (index, value) {

                var element = '<option value="' + value.email + '"> ' + value.prenom + ' ' + value.nom + ' </option>';

                $("#clientSelect").append(element);

            });
        });
}

function displayMissions(clientId) {

    var url = "/test/mission/" + clientId;
    console.log(url);

    $("#missionSelect").empty();
    $("#missionSelect").append("<option disabled selected value> selectionnez une mission </option>");



    $.getJSON(url, function () {
        // TODO
    })
        .done(function (data) {

            $.each(data, function (index, value) {

                var element = '<option value="' + value.id + '"> ' + value.mission + ' </option>';

                $("#missionSelect").append(element);

            });
        });
}