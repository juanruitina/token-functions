import Color from "https://colorjs.io/color.js";

const response = await fetch("rgba.txt");
const text = await response.text();
document.querySelector("textarea.original").value = text;

function convertColors() {
	const text = document.querySelector("textarea.original").value;
	const rgba = text.split("\n");
	console.log(rgba);

	// convert to Color objects
	let converted = [];
	for (let i = 0; i < rgba.length; i++) {
	rgba[i] = new Color(rgba[i]);
	// convert to oklch
	converted.push( rgba[i].to("oklch").toString({precision: 2}) );
	}

	console.log(converted);
	document.querySelector("textarea.converted").value = converted.join("\n");

	// create table if not exists, else remove all rows
	let table = document.querySelector("table");
	if (table) {
		table.querySelectorAll("tr").forEach((row, index) => {
			row.remove();
		});
	} else {
		table = document.createElement("table");
		document.body.appendChild(table);
	}

	// header
	const header = document.createElement("thead");
	const header_row = document.createElement("tr");
	const header_cells = ["rgba", "oklch", "", "hue", "lightness", "chroma", "alpha"];
	for (let i = 0; i < header_cells.length; i++) {
		const cell = document.createElement("th");
		cell.textContent = header_cells[i];
		header_row.appendChild(cell);
	}
	header.appendChild(header_row);
	table.appendChild(header);

	for (let i = 0; i < rgba.length; i++) {
		const row = document.createElement("tr");
		table.appendChild(row);

		const cell2 = document.createElement("td");
		cell2.textContent = rgba[i];
		row.appendChild(cell2);

		const cell3 = document.createElement("td");
		cell3.textContent = rgba[i].to("oklch").toString({precision: 3});
		row.appendChild(cell3);

		const cell = document.createElement("td");
		cell.style.backgroundColor = rgba[i];
		// width 100px
		cell.style.width = "100px";
		row.appendChild(cell);

		// hue
		const cell4 = document.createElement("td");
		cell4.textContent = rgba[i].lch.h;
		row.appendChild(cell4);

		// lightness
		const cell5 = document.createElement("td");
		cell5.textContent = rgba[i].lch.l;
		row.appendChild(cell5);

		// chroma
		const cell6 = document.createElement("td");
		cell6.textContent = rgba[i].lch.c;
		row.appendChild(cell6);

		// alpha
		const cell7 = document.createElement("td");
		cell7.textContent = rgba[i].alpha;
		row.appendChild(cell7);
	}
}

convertColors();

// when content inside textarea changes
document.querySelector("textarea.original").addEventListener("input", function() {
	convertColors();
});

// change background based on radio buttons inside .background-switch. colours are light, paper and dark
document.querySelector(".background-switch").addEventListener("change", function() {
	const value = document.querySelector(".background-switch input:checked").value;
	document.body.className = "is-" + value;
});
