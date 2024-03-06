import { SCENES, TRANSPORT_SCENES, NPC } from './constants';

class SceneState {
    #isAdult = false;

    #wakeOn930 = false;
    #selectedTransport = [];
    #talkedWith = [];

    constructor() {
        const params = new URLSearchParams(document.location.search);
        this.#isAdult = params.get('adult') || false;
    }

    handleScene({ nextScene, text, callback }) {
        if (callback) {
            callback();
        }

        if (nextScene === SCENES.alarm930) {
            this.#wakeOn930 = true;
        }

        if (TRANSPORT_SCENES.includes(nextScene)) {
            this.selectTransport(text);
        }
    }

    get wakeOn930() {
        return this.#wakeOn930;
    }

    get isAdultVersion() {
        return this.#isAdult;
    }

    get allTransportsSelected() {
        return this.#selectedTransport.length === 4;
    }

    get talkedWithAllNpc() {
        return this.#talkedWith.length === Object.values(NPC).length;
    }

    talkedWithNpc(name) {
        return this.#talkedWith.includes(name);
    }

    talkWithNpc(name) {
        this.#talkedWith.push(name);
    }

    isTransportSelected(transport) {
        return this.#selectedTransport.includes(transport);
    }

    selectTransport(transport) {
        this.#selectedTransport.push(transport);
    }

    set isAdult(value) {
        this.#isAdult = value;
    }

    resetState() {
        this.#wakeOn930 = false;
        this.#isAdult = false;
        this.#selectedTransport = [];
        this.#talkedWith = [];
    }
}

export const state = new SceneState();
