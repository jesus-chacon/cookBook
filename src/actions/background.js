import { CHANGE_BACKGROUND } from './actionsTypes';

export function ChangeBackground(background) {
    return {
        type: CHANGE_BACKGROUND,
        background
    };
}