/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//temporary

/**
 * Called any time a click is made anywhere.
 *
 * Tries to make all text boxes back into text
 *
 * @param {Function} callback
 * @param {Object} event - event object
 */
function makeClick(callback, event) {
	//make sure not to back propigate.
	event.stopPropagation();

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
	elem.value = s.innerHTML.trim();
	elem.className = 'convertBack ' + s.className;
	elem.onclick = function () {
		var e = eval('event');
		e.stopPropagation();
	};
	s.parentElement.replaceChild(elem, s);
}

function convertToText(s) {
	if (s.value.trim() !== '') {
		var elem = document.createElement('p');
		elem.className = s.className.substr('convertBack '.length);
		elem.innerHTML = s.value;
		elem.onclick = function () {
			makeClick(function () {
				convertToInput(elem);
			}, eval('event'));
		};
		s.parentElement.replaceChild(elem, s);
	}
}