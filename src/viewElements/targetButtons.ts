export const $targetButtons = (() => {
    const previousButton = document.querySelector('#video-previous') as HTMLButtonElement;
    const nextButton = document.querySelector('#video-next') as HTMLButtonElement;

    const deactivate = () =>
        [previousButton, nextButton].forEach(b => {
            b.classList.replace('btn', 'buttons__button-inactive');
            b.disabled = true;
        });
    
    const activate = () =>
        [previousButton, nextButton].forEach(b => {
            b.classList.replace('buttons__button-inactive', 'btn');
            b.disabled = false;
        });

    return {
        deactivate,
        activate,
        nextButton,
        previousButton,
    }
})()
