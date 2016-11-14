/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//temporary
function showNewPlayerDialog() {
	alert('hi');
}

function convertToInput(e) {
	var elem = document.createElement('input');
	elem.value = e.firstElementChild.innerHTML;

	alert(e.firstElementChild.innerHTML);
}