/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
	$.getJSON("data/DATA.json", function (response) {
		_GlobalData = response;
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
	var classes = element.className.split(' ');
	var str = '';
	for (var i = 0; i < classes.length; i++) {
		if (classes[i] !== className)
			str += ' ' + classes[i];
	}
	element.className = str;
}

/**
 *
 * @param {String} name
 * @param {String} phone
 * @param {String} email
 * @param {String} home
 * @returns {undefined}
 */
function makeNewContact(name, phone, email, home) {
	var newContactElement = document.createElement('a');
	addClass(newContactElement, 'list-group-item');
	newContactElement.href = '#';
	newContactElement.textContent = name;
	newContactElement.onclick = contactClickEvent;
	var listElement = document.getElementById('ContactList');
	listElement.appendChild(newContactElement);
}

function contactClickEvent(e) {

}