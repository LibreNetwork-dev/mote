export * from "./css.js";

self.html = function (strings, ...values) {
	const template = document.createElement("template");
	// use comment markers to mark areas that would need to be rewritten 
	const markers = [];

	const htmlString = strings
		.map((str, i) => {
			const val = values[i];

			if (val instanceof Node) {
				const marker = `<!--mote:${markers.length}-->`;
				markers.push(val);
				return str + marker;
			}

			if (val && typeof val === "object" && "subscribe" in val) {
				const textNode = document.createTextNode("");
				val.subscribe((v) => (textNode.textContent = v));
				const marker = `<!--mote:${markers.length}-->`;
				markers.push(textNode);
				return str + marker;
			}

			if (typeof val === "function") {
				const marker = `__fn:${markers.length}__`;
				markers.push(val);
				return str + marker;
			}

			return str + (val ?? "");
		})
		.join("");

	template.innerHTML = htmlString;
	const root = template.content;


	// replace the comment markers    
	const walker = document.createTreeWalker(root, NodeFilter.SHOW_COMMENT);
	while (walker.nextNode()) {
		const comment = walker.currentNode;
		const match = comment.nodeValue.match(/^mote:(\d+)$/);
		if (match) {
			const node = markers[parseInt(match[1])];
			comment.replaceWith(node);
		}
	}

	// replace the other comment markers
	root.querySelectorAll("*").forEach((el) => {
		for (const attr of [...el.attributes]) {
			const match = attr.name.match(/^on:([a-z]+)$/);
			if (match) {
				const event = match[1];
				const val = attr.value;

				const fnMatch = val.match(/^__fn:(\d+)__$/);
				if (fnMatch) {
					const handler = markers[parseInt(fnMatch[1])];
					el.addEventListener(event, handler);
					el.removeAttribute(attr.name);
				}
			}
		}
	});
	// probably a bad idea
	return root.children.length === 1
		? root.firstElementChild
		: root.cloneNode(true);
};

self.signal = function (initial) {
	const subscribers = new Set();

	const wrapper = {
		_value: initial,
		get value() {
			return this._value;
		},
		set value(v) {
			this._value = v;
			subscribers.forEach((fn) => fn(v));
		},
		subscribe(fn) {
			subscribers.add(fn);
			fn(this._value);
		},
	};

	return wrapper;
};
