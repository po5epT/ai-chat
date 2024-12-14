type ValueFormatter = (value: string | number) => string;

export class SearchParamsService {
	private searchParams: Record<string, string> = {};

	constructor() {}

	addParam(key: string, value?: string | number): this;
	addParam(key: string, value: any, valueFormatter: ValueFormatter): this;

	addParam(key: string, value?: string | number, valueFormatter?: ValueFormatter) {
		if (typeof value === 'undefined') {
			return this;
		}

		this.searchParams[key] = valueFormatter ? valueFormatter(value) : value.toString();

		return this;
	}

	toString() {
		console.log(this.searchParams);
		return new URLSearchParams(this.searchParams).toString();
	}
}
