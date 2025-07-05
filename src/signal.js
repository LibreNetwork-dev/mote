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
