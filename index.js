
// for each folder in path.
//	- Create card based on folder name.
//	- Populate card popup with images from within folder.

class portfolioPiece
{
	constructor(title) {
		this.title = title.slice(0, -1);
		this.instantiate();
	}

	instantiate()
	{
		var portfolio_container = document.getElementById("portfolio_container");
		portfolio_container.innerHTML += "<title_card title=" + this.title + "></title_card>";
	}
}

var pieces = [];

function loadFolders() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'portfolio/', true);
	xhr.onload = function() {
		if (xhr.status === 200) {
			var parser = new DOMParser();
			var doc = parser.parseFromString(xhr.responseText, 'text/html');

			var links = doc.querySelectorAll('a');
			links.forEach(function(link) {
				var href = link.getAttribute('href');
				pieces.push(new portfolioPiece(href));
			});
		} else {
			console.error("Failed to load directory listing. Status:", xhr.status);
		}
	};
	xhr.onerror = function() {
		console.error("Request failed.");
	};
	xhr.send();
}

document.addEventListener('DOMContentLoaded', function() {
	loadFolders();
});
