/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//temporary

function makeClick(callback, e) {
	//make sure not to back propigate.
	e.stopPropagation();

	//converts all text boxes back into normal thingies
	var flips = document.getElementsByClassName('convertBack');
	for (var i = 0; i < flips.length; i++) {
		convertToText(flips[i]);
	}
	callback();
}

function showNewPlayerDialog() {
	alert('hi');
}

function convertToInput(s) {
	var elem = document.createElement('input');
	elem.value = s.innerHTML;
	elem.className += ' convertBack';
	elem.onclick = function () {
		var e = eval('event');
		e.stopPropagation();
	};
	s.parentElement.replaceChild(elem, s);
}

function convertToText(s) {
	var elem = document.createElement('p');
	elem.innerHTML = s.value === '' ? 'Blank' : s.value;
	elem.onclick = function () {
		makeClick(function () {
			convertToInput(elem);
		}, eval('event'));
	};
	s.parentElement.replaceChild(elem, s);
}