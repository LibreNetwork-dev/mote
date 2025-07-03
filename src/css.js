// goes in class=${}
self.css = (() => {
	/**
	 * stuff like
	 * _m$1 or whatever
	 * for class names
	 */
	let id = 0;
	const styleCache = new Map();

	return (strings, ...values) => {
		const raw = String.raw(strings, ...values).trim();

		if (styleCache.has(raw)) {
			return styleCache.get(raw);
		}

		const className = `_m${id++}`;
		const style = document.createElement("style");
		style.textContent = `.${className} { ${raw} }`;
		document.head.appendChild(style);

		styleCache.set(raw, className);
		return className;
	};
})();