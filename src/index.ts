export interface ConfigInstance {
	/**
	 * An array of abbreviation where the index + 1 (x) represents 10^(3*x).
	 * @default
	 * ["k", "m", "b", "t"]
	 */
	abbreviations: string[];

	/**
	 * The number of decimal places to use.
	 * @default 2
	 */
	decimal: number;
}

export type OptionInstances = Partial<ConfigInstance>;

export class Instance {
	public config: ConfigInstance = {
		abbreviations: ["k", "m", "b", "t"],
		decimal: 2
	};

	constructor(options?: OptionInstances) {
		if (options) {
			// Merge options
			this.config = {
				...this.config,
				...options
			};
		}
	}

	// source: http://stackoverflow.com/a/2686098/1074592
	public simplify(num = 0) {
		let result = num;

		// 2 decimal places => 100, 3 => 1000, etc
		let decPlaces = this.config.decimal;
		decPlaces = decPlaces != null ? decPlaces : 2;
		decPlaces = Math.pow(10, decPlaces);

		const { abbreviations } = this.config;

		// Go through the array backwards, so we do the largest first
		for (let i = abbreviations.length - 1; i >= 0; i--) {
			// Convert array index to "1000", "1000000", etc
			const size = Math.pow(10, (i + 1) * 3);

			// If the number is bigger or equal do the abbreviation
			if (size <= result) {
				// Here, we multiply by decPlaces, round, and then divide by decPlaces.
				// This gives us nice rounding to a particular decimal place.
				result = Math.round((result * decPlaces) / size) / decPlaces;

				// Handle special case where we round up to the next abbreviation
				if (result === 1000 && i < abbreviations.length - 1) {
					result = 1;
					i++;
				}

				// Add the letter for the abbreviation
				(result as any) += abbreviations[i];

				// We are done... stop
				break;
			}
		}

		return String(result);
	}
}

/**
 * Simplifies a number by converting it to a string with an abbreviation.
 * @param num The number to simplify
 * @param config Options to format the number
 */
export function simplifyNumber(num: number, config?: OptionInstances) {
	const instance = new Instance(config);

	const simplifiedNumber = instance.simplify(num);

	return simplifiedNumber;
}

export default simplifyNumber;
