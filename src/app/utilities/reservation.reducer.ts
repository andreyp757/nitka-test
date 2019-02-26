import { Action } from './hall-store.class';

export const ACTION_TYPES = {
    TOGGLE: 'TOGGLE_SEAT',
    RESERVE: 'RESERVE_SEAT',
    RANDOM: 'RANDOM_RESERVE',
    CLEAR: 'CLEAR_SELECTED'
}

export const reservationReducer = (state: any, action: Action) => {
    const reserveOrClear = (param = false) => {
        return state = state.map(row => row.map(seat => {
            if (seat.selected) {
                seat.selected = false;
                seat.reserved = param;
            }
            return seat;
        }))
    }
    switch (action.type) {
        case ACTION_TYPES.TOGGLE:
            let payload = action.payload;
            state[payload.row][payload.seat] = { ...state[payload.row][payload.seat], selected: !state[payload.row][payload.seat].selected };
            return state;
        case ACTION_TYPES.CLEAR:
            return reserveOrClear();
        case ACTION_TYPES.RESERVE:
            return reserveOrClear(true)
        case ACTION_TYPES.RANDOM:
            const genRandom = () => ~~(Math.random() * 10);
            let counter = 0;
            const setRandom = () => {
                let randomRow = genRandom();
                let randomSeat = genRandom();
                if (!state[randomRow][randomSeat].reserved) {
                    state[randomRow][randomSeat] = { ...state[randomRow][randomSeat], reserved: true };
                    counter++;
                }
                counter < 10 && setRandom();
            }
            setRandom();
            return state;
        default:
            return state;
    }
}