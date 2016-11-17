/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(function () {
	$.getJSON("data/DATA.json", function (response) {
		for (var i = 0; i < response.length; i++) {
			makeNewContact(response[i]);
		}
	});
});

/**
 *
 * @param {Object} contact
 * @returns {undefined}
 */
function makeNewContact(contact) {

	//maybe convert to JQuery for readability
	var newContactElement = document.createElement('a');
	newContactElement.className = 'list-group-item';
	newContactElement.href = '#';
	newContactElement.textContent = contact.name;
	newContactElement.data = JSON.stringify(contact);
	newContactElement.onclick = contactClickEvent;
	var listElement = document.getElementById('ContactList');
	listElement.appendChild(newContactElement);
}


function contactClickEvent(e) {
	var data = JSON.parse(e.target.data);

	//sets entries to being non-active
	$('#SelectedContact').removeClass('active').removeAttr('id');

	//sets this entry to being active
	$(e.target).addClass('active').attr('id', 'SelectedContact');

	//sets the display part
	$('#phoneDisplay').text(data.phone);
	$('#emailDisplay').text(data.email);
	$('#addressDisplay').text(data.address);
	$('#nameDisplay').text(data.name);
}

function saveButtonHandler() {
	var currentSelection = $('#SelectContact');
	if (currentSelection.lengthh === 0)
		alert('hi');
}


function deleteButtonHandler() {
	$('#SelectedContact').remove();
}
