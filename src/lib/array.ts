const countStarting = <T>(array: T[], predicate: (value: T) => boolean) => {
    let isCounting = false;

    let counter = 0;
    for (const value of array) {
        if(!isCounting) {
            isCounting = predicate(value);
        }

        if(!isCounting) continue;

        counter++;
    }

    return counter;
}