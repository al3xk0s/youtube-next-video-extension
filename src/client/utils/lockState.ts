import { createState } from "../../utils/state"

export const createLockState = (initial = false) => {
    const state = createState(initial);

    const lock = () => state.setValue(true);
    const unlock = () => state.setValue(false);

    return {
        getValue: state.getValue,
        lock,
        unlock,
        listen: state.listen,
    }
}

export type LockState = ReturnType<typeof createLockState>;
