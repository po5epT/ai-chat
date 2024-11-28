import { type Ref, ref, watch } from 'vue';

export const useStorage = <T>(key: string, defaultValue?: T): Ref<T> => {
	const cachedValue = JSON.parse(localStorage.getItem(key) ?? JSON.stringify(defaultValue ?? null));
	const state = ref(cachedValue);

	watch(state, (value) => {
		localStorage.setItem(key, JSON.stringify(value));
	});

	return state;
};
