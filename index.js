class portfolioPiece {
	constructor(title, _id) {
		this.title = title.slice(0, -1).replaceAll("_", " ");
		this._id = _id;

		this.content = [];
	}

	instantiate() {
		var portfolio_container = document.getElementById("portfolio_container");
		portfolio_container.innerHTML += "<title_card content='" + JSON.stringify(this.content) + "' pid='" + this._id + "' title='" + this.title + "'></title_card>";
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
				var piece = new portfolioPiece(href, pieces.length);
				pieces.push(piece);
				loadFilesInFolder("portfolio/" + href, piece);
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

function loadFilesInFolder(folderPath, piece) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', folderPath, true);
	xhr.onload = function() {
		if (xhr.status === 200) {
			var parser = new DOMParser();
			var doc = parser.parseFromString(xhr.responseText, 'text/html');
			var links = doc.querySelectorAll('a');
			links.forEach(function(link) {
				var href = link.getAttribute('href');
				piece.content.push(href);
			});
			piece.instantiate(); // Instantiate the piece only after content is loaded
		} else {
			console.error("Failed to load folder contents. Status:", xhr.status);
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