import type { IStartKey } from '@/services/api';

export class QueryParamsService {
	private readonly modelId: string;
	private readonly modelKey: string;

	private limit?: string | number;
	private start_key?: null | IStartKey;

	constructor(modelId: string, modelKey: string) {
		this.modelId = modelId;
		this.modelKey = modelKey;
	}

	setLimit(limit?: string | number) {
		this.limit = limit;

		return this;
	}

	setStartKey(startKey?: null | IStartKey) {
		this.start_key = startKey;

		return this;
	}

	toString() {
		const queryParams = {
			[this.modelKey]: this.modelId,
		};

		if (this.limit) {
			queryParams['limit'] = this.limit.toString();
		}

		if (this.start_key) {
			queryParams['start_key'] = encodeURIComponent(JSON.stringify(this.start_key));
		}

		return new URLSearchParams(queryParams).toString();
	}
}
