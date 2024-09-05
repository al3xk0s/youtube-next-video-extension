// import { FilterString } from "../api/filters";
// import { createState } from "../lib/state";

// export const $filterButton = (() => {
//     const button = document.querySelector('#video-type')!;

//     const state = createState<FilterString | null>(null, (newValue) => {
//         button.textContent = newValue;
//     });

//     return {
//         button,
//         setFilterValue: state.setValue,
//         listen: state.listen,
//     }
// })()


// const subscribeFilterButton = () => {
//     $filterButton.listen(v => repo.setValue(v!));

//     const setNextFilter = async () => {
//         const current = await repo.getValue();
//         const next = filtres.nextFilter(current);

//         return $filterButton.setFilterValue(next);
//     }

//     $filterButton.button.addEventListener('click', setNextFilter);
// }