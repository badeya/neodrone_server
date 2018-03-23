/*
$( "#contact_form" ).submit(function(event) {
	//console.log("Test");

	event.preventDefault();
	var formData = new FormData();// get the form data
		formData = {
			'idDemo_form'	: $('input[name=idDemo_form]').val(),
			'societe_form'	: $('input[name=societe_form]').val(),
			'office_form'	: $('input[name=office_form]').val(),
			'nom_form'		: $('input[name=nom_form]').val(),
			'prenom_form'	: $('input[name=prenom_form]').val(),
			'fonction_form'	: $('input[name=fonction_form]').val(),
			'email_form'	: $('input[name=email_form]').val(),
			'image_nom'		: ($('input[type=file]')[0].files[0]).name,
			'image_size'	: ($('input[type=file]')[0].files[0]).size,
			'image_type'	: ($('input[type=file]')[0].files[0]).type,
			'Authorization' : 'Basic Carle:Jean'
		};
	
		var form = $('form').get(0);
		var formData = new FormData(form);// get the form data
		// on envoi formData vers mail.php
		$.ajax({
			type		: 'POST', // define the type of HTTP verb we want to use (POST for our form)
			url		: 'test/upload', // the url where we want to POST
			data		: formData, // our data object
			dataType	: 'json', // what type of data do we expect back from the server
			processData: false,
			contentType: false
		});
		// using the done promise callback
		//.done(function(data) {
			//console.log("callback");
		//})
	//etc................................................
}); */

$(document).ready(function () {

	// jQuery methods go here...

	function uploadFiles() {

		//event.preventDefault();
		var formData = new FormData();// get the form data
		formData = {
			'image_nom': ($('input[type=file]'))[0].files[0].name,
			'image_size': ($('input[type=file]'))[0].files[0].size,
			'image_type': ($('input[type=file]'))[0].files[0].type,
			'Authorization': 'Basic Carle:Jean'
		};

		formData = {
			'image_nom': $('contact_form')[0].files[0].name,
			'image_size': ($('input[type=file]'))[0].files[0].size,
			'image_type': ($('input[type=file]'))[0].files[0].type,
			'Authorization': 'Basic Carle:Jean'
		};

		contact_form

		var form = $('form').get(0);
		var formData = new FormData(form); // get the form data
		// on envoi formData vers mail.php
		$.ajax({
			type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
			url: 'test/upload', // the url where we want to POST
			data: formData, // our data object
			dataType: 'json', // what type of data do we expect back from the server
			processData: false,
			contentType: false
		});
		// using the done promise callback
		//.done(function(data) {
		//console.log("callback");
		//})
		//etc................................................

		console.log("File uploaded");
	}


	"use strict"

	var fileList = []
	var fileDrag = document.getElementById("fileDrag")


	// get file list when user click on Select button
	document.getElementById("file").addEventListener("change", (e) => {
		fileList = e.target.files

		handleFiles(fileList);
	}, false)



	fileDrag.addEventListener("dragenter", (e) => {
		e.stopPropagation()
		e.preventDefault()

		fileDrag.classList.add("dragenter")
	}, false)

	fileDrag.addEventListener("dragover", (e) => {
		e.stopPropagation()
		e.preventDefault()
	}, false)

	fileDrag.addEventListener("dragleave", (e) => {
		e.stopPropagation()
		e.preventDefault()

		fileDrag.classList.remove("dragenter")
	}, false)

	fileDrag.addEventListener("drop", (e) => {
		e.stopPropagation()
		e.preventDefault()
		fileDrag.classList.remove("dragenter")

		fileList = e.dataTransfer.files

		handleFiles(fileList);
	}, false)



	var handleFiles = (files) => {

		let list = document.getElementById("list")
		let imageType = /^image\//;

		for (let file of files) {

			let li = document.createElement("li")
			let thumbWrapper = document.createElement("div")

			// remove folders
			if (file.type == "") {
				continue
			}
			// check if the file type is image
			else if (imageType.test(file.type)) {

				let img = document.createElement("img")
				img.file = file

				thumbWrapper.appendChild(img)

				// read image content
				let reader = new FileReader()
				reader.readAsDataURL(file)

				reader.onload = ((aImg) => {

					return (e) => {
						aImg.src = e.target.result
					}

				})(img)
			}
			// other file types
			else {
				let divThumb = document.createElement("div")
				divThumb.classList.add("thumb-ext")
				divThumb.innerText = file.name.split('.').pop().toUpperCase();
				thumbWrapper.appendChild(divThumb)
			}

			thumbWrapper.classList.add("thumb-wrapper")
			li.appendChild(thumbWrapper)

			let divInfo = document.createElement("div")
			let divName = document.createElement("div")
			let divSize = document.createElement("div")
			let divLastModified = document.createElement("div")

			divName.innerText = file.name
			divSize.innerText = `Size: ${file.size} bytes`
			divLastModified.innerText = `Last modified date: ${file.lastModifiedDate}`

			divInfo.classList.add("file-info")
			divInfo.appendChild(divName)
			divInfo.appendChild(divSize)
			divInfo.appendChild(divLastModified)
			li.appendChild(divInfo)

			list.appendChild(li)

			console.log("reached");

			//start upload
			uploadFiles();


		}

	}

}); 