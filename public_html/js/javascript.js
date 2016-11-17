/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(function () {
	emptyDisplay();
	$('.visibleWithTextDisplay').hide();
	$.getJSON("data/DATA.json", function (response) {
		for (var i = 0; i < response.length; i++) {
			makeNewContact(response[i]);
		}
	});
});

/**
 *
 * @param {Object} contact
 * @returns {jQuery} The newly created object
 */
function makeNewContact(contact) {
	var $elem = $('<a>');
	$elem.addClass('list-group-item');
	$elem.text(contact.name);
	$elem.click(contactClickEvent);
	$elem.data(contact);
	$('#ContactList').append($elem);
	return $elem;
}


function contactClickEvent(e) {
	var $target = $(e.target);
	var data = $target.data();

	//sets entries to being non-active
	$('#SelectedContact').removeClass('active').removeAttr('id');

	//sets this entry to being active
	$target.addClass('active').attr('id', 'SelectedContact');

	//sets the display part
	endEditDisplay();
	setTextDisplay(data);
}

/**
 *
 * @param {Object} dataObj - has a phone, email, address, and name property which are all strings.
 */
function setTextDisplay(dataObj) {
	$('#nameDisplay').text(dataObj.name);
	$('#phoneDisplay').text(dataObj.phone);
	$('#emailDisplay').text(dataObj.email);
	$('#addressDisplay').text(dataObj.address);
}

function setEditDisplay(dataObj) {
	$('#nameEdit').val(dataObj.name);
	$('#phoneEdit').val(dataObj.phone);
	$('#emailEdit').val(dataObj.email);
	$('#addressEdit').val(dataObj.address);
}

function getTextDisplay() {
	return {
		name: $('#nameDisplay').text(),
		phone: $('#phoneDisplay').text(),
		email: $('#emailDisplay').text(),
		address: $('#addressDisplay').text()
	};
}

function getEditDisplay() {
	return {
		name: $('#nameEdit').val(),
		phone: $('#phoneEdit').val(),
		email: $('#emailEdit').val(),
		address: $('#addressEdit').val()
	};
}

function saveButtonHandler() {
	endEditDisplay();
	var $currentSelection = $('#SelectedContact');
	if ($currentSelection.length === 0) {
		//make new entry
		makeNewContact(getTextDisplay()).addClass('active').attr('id', 'SelectedContact');
	} else {
		//save to current entry
		var newData = getTextDisplay();
		$currentSelection.data(newData);
		$currentSelection.text(newData.name);
	}
}


function editButtonHandler() {
	startEditDisplay();
}

function startEditDisplay() {
	setEditDisplay(getTextDisplay());
	$('.visibleWithTextDisplay').hide();
	$('.visibleWithEditDisplay').show();

}

function endEditDisplay() {
	setTextDisplay(getEditDisplay());
	$('.visibleWithEditDisplay').hide();
	$('.visibleWithTextDisplay').show();
}

function deleteButtonHandler() {
	$('#SelectedContact').remove();
	startEditDisplay();
}

function newContactHandler() {
	emptyDisplay();

	//make no selected contact
	$('#SelectedContact').removeClass('active').removeAttr('id');

	//allow new contact to be edited
	startEditDisplay();
}

/**
 * sets display to being empty
 */
function emptyDisplay() {
	var empty = {
		name: '',
		phone: '',
		email: '',
		address: ''
	};
	setTextDisplay(empty);
	setEditDisplay(empty);
}