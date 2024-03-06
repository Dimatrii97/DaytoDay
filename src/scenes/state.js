import { SCENES } from './constants';

class SceneState {
    #wakeOn930 = false;

    constructor() {}

    handleScene(nextScene) {
        if (nextScene === SCENES.alarm930) {
            this.#wakeOn930 = true;
        }
    }

    get wakeOn930() {
        return this.#wakeOn930;
    }

    resetState() {
        this.#wakeOn930 = false;
    }
}

export const state = new SceneState();
