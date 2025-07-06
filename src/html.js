/*
	markers work like 
	_m_   -> A regular dom elm or node
	_mfn -> A function to be attached 

*/
self.html = function (strings, ...values) {
	const template = document.createElement("template");
	const markers = [];

	const htmlString = strings
		.map((str, i) => {
			const val = values[i];

			if (typeof val === "function" && /<\s*$/.test(str) || val instanceof Node) {
				const node = val();
				const marker = `<!--_m_:${markers.length}-->`;
				markers.push(node);
				return str + marker;
			}

			if (val && typeof val === "object" && "subscribe" in val) {
				const container = document.createElement("span"); 
				val.subscribe((v) => {
					container.textContent = ""; 
					if (v instanceof Node) {
						container.replaceChildren(v);
					} else {
						container.textContent = v;
					}
				});
				const marker = `<!--_m_:${markers.length}-->`;
				markers.push(container);
				return str + marker;
			}

			if (typeof val === "function") {
				const marker = `_mfn:${markers.length}`;
				markers.push(val);
				return str + marker;
			}

			return str + (val ?? "");
		})
		.join("");

	template.innerHTML = htmlString;
	const root = template.content;

	// replace the normal ones
	const walker = document.createTreeWalker(root, NodeFilter.SHOW_COMMENT);
	while (walker.nextNode()) {
		const comment = walker.currentNode;
		const match = comment.nodeValue.match(/^_m_:(\d+)$/);
		if (match) {
			const node = markers[parseInt(match[1])];
			comment.replaceWith(node);
		}
	}

	// replace the onclicks
	root.querySelectorAll("*").forEach((el) => {
		for (const attr of [...el.attributes]) {
			const match = attr.name.match(/^on:([a-z]+)$/);
			if (match) {
				const event = match[1];
				const val = attr.value;

				const fnMatch = val.match(/^_mfn:(\d+)$/);
				if (fnMatch) {
					const handler = markers[parseInt(fnMatch[1])];
					el.addEventListener(event, handler);
					el.removeAttribute(attr.name);
				}
			}
		}
	});
	return root;
};