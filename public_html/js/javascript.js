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
	var $elem = $('<a>');
	$elem.addClass('list-group-item');
	$elem.text(contact.name);
	$elem.click(contactClickEvent);
	$elem.data(contact);
	$('#ContactList').append($elem);
}


function contactClickEvent(e) {
	var $target = $(e.target);
	var data = $target.data();

	//sets entries to being non-active
	$('#SelectedContact').removeClass('active').removeAttr('id');

	//sets this entry to being active
	$target.addClass('active').attr('id', 'SelectedContact');

	//sets the display part
	setDisplay(data);
}

/**
 *
 * @param {Object} dataObj - has a phone, email, address, and name property which are all strings.
 */
function setDisplay(dataObj) {
	$('#nameDisplay').text(dataObj.name);
	$('#phoneDisplay').text(dataObj.phone);
	$('#emailDisplay').text(dataObj.email);
	$('#addressDisplay').text(dataObj.address);
}

function getDisplay() {
	return {
		name: $('#nameDisplay').text(),
		phone: $('#phoneDisplay').text(),
		email: $('#emailDisplay').text(),
		address: $('#addressDisplay').text()
	};
}

function saveButtonHandler() {
	var $currentSelection = $('#SelectedContact');
	if ($currentSelection.length === 0) {
		//make new entry
		makeNewContact(getDisplay());
	} else {
		//save to current entry
		var newData = getDisplay();
		$currentSelection.data(newData);
		$currentSelection.text(newData.name);
	}
	$('#SaveButton').addClass('hidden');
	$('#EditButton').removeClass('hidden');
}

function editButtonHandler() {
	readyDisplayForEdit();
}

function readyDisplayForEdit() {
	$('.visibileWithTextDisplay').addClass('hidden');
	$('.visibileWithEditDisplay').removeClass('hidden');

	//make text fields editable
}

function deleteButtonHandler() {
	$('#SelectedContact').remove();
}

function newContactHandler() {
	emptyDisplay();
	//allow new contact to be edited
	readyDisplayForEdit();
}

/**
 * sets display to being empty
 */
function emptyDisplay() {
	setDisplay({
		name: '',
		phone: '',
		email: '',
		address: ''
	})
}