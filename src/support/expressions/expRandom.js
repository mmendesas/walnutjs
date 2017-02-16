var helperString = require('../helper/string');

var expRandom = {

	/**
	 * Used to return a random value
	 */
	parseExpression: function (expression) {

		var parts = expression.split('|');
		var num = Math.floor((Math.random() * 9) + 1);
		var retNum = '';

		if (parts.length == 2) {
			var part01 = parts[0].trim().toLowerCase();

			// random(n|8);
			if (helperString.isLetter(part01[0])) {
				retNum = this.getRandomAlfaNumeric(part01, parseInt(parts[1]));
				return retNum;
			} else {
				// random(15.78|55.98);
				var minimum = parseFloat(parts[0]);
				var maximum = parseFloat(parts[1]);

				var range = maximum - minimum;
				var r = Math.floor((Math.random() * range) + 1);
				var randomNum = minimum + r;
				retNum = randomNum.tovar();
				return retNum;
			}
		} else if (parts.length == 1) {

			try {
				var num = parseInt(expression);
				retNum = Math.floor((Math.random() * num - 1) + 1);
				return retNum;
			} catch (err) {

				var sb = [];
				sb.push("[1] - random(num|num) - random(3|7) - 6");
				sb.push("[2] - random(n|num)   - random(n|5) - 65871");
				sb.push("[3] - random(l|num)   - random(l|5) - 6aS7x");
				sb.push("[4] - random(a|num)   - random(a|3) - XyB");

				throw sb.join('\n');
			}
		}
	},

	/**
	 * return a random value like number, letter or both
	 */
	getRandomAlfaNumeric: function (option, num) {

		var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var numbers = "0123456789";

		var ret = "";
		var text = "";

		switch (option.trim().toLowerCase()) {
			case "l":
				text = letters;
				break;
			case "n":
				text = numbers;
				break;
			case "a":
				text = numbers + letters;
				break;
			default:
				break;
		}

		for (var i = 0; i < num; i++) {
			var idx = Math.floor((Math.random() * text.length - 1) + 1);
			ret += text[idx];
		}

		return ret;
	}

};

module.exports = expRandom;