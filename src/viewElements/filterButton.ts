import { FilterString } from "../api/filters";
import { createState } from "../lib/state";

export const $filterButton = (() => {
    const button = document.querySelector('#video-type');

    const state = createState<FilterString | null>(null, (newValue) => {
        button.textContent = newValue;
    });

    return {
        button,
        setFilterValue: state.setValue,
        listen: state.listen,
    }
})()
