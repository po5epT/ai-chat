import { type Ref, ref, watch } from 'vue';

export const useStorage = <T>(key: string): Ref<T> => {
	const cachedValue = JSON.parse(localStorage.getItem(key) ?? 'null');
	const state = ref(cachedValue);

	watch(state, (value) => {
		if (value === null) {
			localStorage.removeItem(key);
			return;
		}

		localStorage.setItem(key, JSON.stringify(value));
	});

	return state;
};
