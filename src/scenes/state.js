import { SCENES } from './constants';

class SceneState {
    #isAdult = false;

    #wakeOn930 = false;

    constructor() {
        const params = new URLSearchParams(document.location.search);
        this.#isAdult = params.get('adult') || false;
    }

    handleScene(nextScene) {
        if (nextScene === SCENES.alarm930) {
            this.#wakeOn930 = true;
        }
    }

    get wakeOn930() {
        return this.#wakeOn930;
    }

    get isAdultVersion() {
        return this.#isAdult;
    }

    resetState() {
        this.#wakeOn930 = false;
    }
}

export const state = new SceneState();
