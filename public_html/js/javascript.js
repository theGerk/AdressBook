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
 * @param {Element} element - HTML Element
 * @param {String} className
 */
function addClass(element, className) {
	element.className += ' ' + className;
}

/**
 *
 * @param {Element} element - HTML Element
 * @param {String} className
 */
function removeClass(element, className) {
	if (element != null) {
		var classes = element.className.split(' ');
		var str = '';
		for (var i = 0; i < classes.length; i++) {
			if (classes[i] !== className)
				str += ' ' + classes[i];
		}
		element.className = str;
	}
}

/**
 *
 * @param {Object} contact
 * @returns {undefined}
 */
function makeNewContact(contact) {
	var newContactElement = document.createElement('a');
	addClass(newContactElement, 'list-group-item');
	newContactElement.href = '#';
	newContactElement.textContent = contact.name;
	newContactElement.data = JSON.stringify(contact);
	newContactElement.onclick = contactClickEvent;
	var listElement = document.getElementById('ContactList');
	listElement.appendChild(newContactElement);
}


function contactClickEvent(e) {
	var data = JSON.parse(e.target.data);

	var oldElement = $('#SelectedContact');
	//sets entries to being non-active
	oldElement.removeClass('active');
	oldElement.removeAttr('id');

	//sets this entry to being active
	$(e.target).addClass('active').attr('id', 'SelectedContact');

	//sets the display part
	document.getElementById('phoneDisplay').textContent = data.phone;
	document.getElementById('emailDisplay').textContent = data.email;
	document.getElementById('addressDisplay').textContent = data.address;
	document.getElementById('nameDisplay').textContent = data.name;
}

function saveButtonHandler() {
	alert('hi');
}


function deleteButtonHandler() {
	document.getElementById('ContactList').removeChild(document.getElementById('SelectedContact'));
}
