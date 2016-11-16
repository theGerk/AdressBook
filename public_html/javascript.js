/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.getJSON("DATA.json", function (response) {
	_GlobalData = response;
});

/**
 *
 * @param {Object} element - HTML Element
 * @param {String} className
 */
function addClass(element, className) {
	element.className += ' ' + className;
}

/**
 *
 * @param {Object} element - HTML Element
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