self.css = (() => {
	let id = 0;
	const styleCache = new Map();

	function processCSS(raw, className) {
		const lines = raw.split('\n').map(line => line.trim()).filter(Boolean);

		const topLevelProps = [];
		const extraBlocks = [];

		let insideBlock = false;
		let braceDepth = 0;
		let buffer = [];

		for (let line of lines) {
			// Replace & and .__class__ in every line
			line = line.replace(/&/g, `.${className}`).replace(/\.(__class__)\b/g, `.${className}`);

			// Detect start of block
			if (line.includes('{')) {
				braceDepth += (line.match(/{/g) || []).length;
				insideBlock = true;
			}

			if (insideBlock) {
				buffer.push(line);

				if (line.includes('}')) {
					braceDepth -= (line.match(/}/g) || []).length;

					if (braceDepth === 0) {
						extraBlocks.push(buffer.join('\n'));
						buffer = [];
						insideBlock = false;
					}
				}

				continue;
			}

			// Top-level properties
			if (line && !line.includes('{') && !line.includes('}')) {
				topLevelProps.push(line);
			}
		}

		let result = '';
		if (topLevelProps.length) {
			result += `.${className} {\n${topLevelProps.join('\n')}\n}\n`;
		}
		if (extraBlocks.length) {
			result += extraBlocks.join('\n\n') + '\n';
		}

		return result.trim();
	}

	return (strings, ...values) => {
		const raw = String.raw(strings, ...values).trim();

		if (styleCache.has(raw)) {
		 return styleCache.get(raw);
		}

		const className = `_m${id++}`;
		const cssText = processCSS(raw, className);

		const style = document.createElement("style");
		style.textContent = cssText;
		document.head.appendChild(style);

		styleCache.set(raw, className);
		return className;
	};
})();
