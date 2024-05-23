import { FilterString } from "../api/filters";

export interface IFilterRepo {
    getValue() : Promise<FilterString>;
    setValue(newValue: FilterString) : Promise<void>;
}

export const LocalStorageFilterRepo : IFilterRepo = {
    getValue: async () => (localStorage.getItem('filter') ?? 'long') as FilterString,
    setValue: async (value: string) => localStorage.setItem('filter', value),
}
