/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//starts on document open
$(function () {
	emptyDisplay();
	$('.visibleWithTextDisplay').hide();

	if (localStorage.data === undefined) {	//if the data is unused, get from the DATA.json file
		$.getJSON("data/DATA.json", appendData);
		localStorage.data = getCurrentData;
	} else {								//if the data is used, get it from there
		appendData(JSON.parse(localStorage.data));
	}
});


/**
 * Sets back to a start state.
 */
function removeContacts() {
	$('.contact').remove();
	delete localStorage.data;
}

/**
 * returns all contacts as an array of objects
 *
 * @returns {Object[]} - array of contact objects
 */
function getCurrentData() {
	var output = [];
	$('.contact').each(function (i, elem) {
		output.push($(elem).data());
	});
	return output;
}


/**
 * appends aditional contacts based on what is in the array
 * @param {Object[]} contactArray
 */
var appendData = function (contactArray) {
	for (var i = 0; i < contactArray.length; i++) {
		makeNewContact(contactArray[i]);
	}
};

/**
 * Makes a new contact at the end of the list and returns the object
 *
 * @param {Object} contact
 * @returns {jQuery} The newly created object
 */
function makeNewContact(contact) {
	var $elem = $('<a>');
	$elem.addClass('list-group-item');
	$elem.addClass('contact');
	$elem.text(contact.name);
	$elem.click(contactClickEvent);
	$elem.data(contact);
	$('#ContactList').append($elem);
	return $elem;
}

/**
 * event handler for clicking on any contact entry
 *
 * @param {Event} e
 */
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
 * Sets the display text, for display setup (non-edit)
 *
 * @param {Object} dataObj - has a phone, email, address, and name property which are all strings.
 */
function setTextDisplay(dataObj) {
	$('#nameDisplay').text(dataObj.name);
	$('#phoneDisplay').text(dataObj.phone);
	$('#emailDisplay').text(dataObj.email);
	$('#addressDisplay').text(dataObj.address);
}


/**
 * Sets the display text, for edit setup
 *
 * @param {Object} dataObj - has a phone, email, address, and name property which are all strings.
 */
function setEditDisplay(dataObj) {
	$('#nameEdit').val(dataObj.name);
	$('#phoneEdit').val(dataObj.phone);
	$('#emailEdit').val(dataObj.email);
	$('#addressEdit').val(dataObj.address);
}

/**
 * gets a contact object based on what is in display text for non-edit mode
 *
 * @returns {Object} - has name, email, address, and phone properties, each of which is a string
 */
function getTextDisplay() {
	return {
		name: $('#nameDisplay').text(),
		phone: $('#phoneDisplay').text(),
		email: $('#emailDisplay').text(),
		address: $('#addressDisplay').text()
	};
}


/**
 * gets a contact object based on what is in display text for non-edit mode
 *
 * @returns {Object} - has name, email, address, and phone properties, each of which is a string
 */
function getEditDisplay() {
	return {
		name: $('#nameEdit').val(),
		phone: $('#phoneEdit').val(),
		email: $('#emailEdit').val(),
		address: $('#addressEdit').val()
	};
}

/**
 * handles a save button click event
 *
 */
function saveButtonHandler() {
	//switch to text display
	endEditDisplay();

	//the current selection as jQuery object
	var $currentSelection = $('#SelectedContact');
	if ($currentSelection.length === 0) {
		//make new entry if there is no current object
		makeNewContact(getTextDisplay()).addClass('active').attr('id', 'SelectedContact');
	} else {
		//save current data if there is a current object
		var newData = getTextDisplay();
		$currentSelection.data(newData);
		$currentSelection.text(newData.name);
	}

	localStorage.data = JSON.stringify(getCurrentData());
}

/**
 * Handles edit button click event
 */
function editButtonHandler() {
	startEditDisplay();
}

/**
 * changes display to being edit setup
 */
function startEditDisplay() {
	setEditDisplay(getTextDisplay());
	$('.visibleWithTextDisplay').hide();
	$('.visibleWithEditDisplay').show();

}

/**
 * changes display to be normal display setup
 */
function endEditDisplay() {
	setTextDisplay(getEditDisplay());
	$('.visibleWithEditDisplay').hide();
	$('.visibleWithTextDisplay').show();
}

/**
 * handles delete button event
 */
function deleteButtonHandler() {
	$('#SelectedContact').remove();
	startEditDisplay();
}

/**
 * handles new contact click event
 */
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