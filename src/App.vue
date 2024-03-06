<template>
    <!-- Так, зачем ты открыла инспектор, ну ка выйди, мне стыдно за свой прекрасный код...
        С 8 марта, счастья здоровья, меньше работы, больше денег -->
    <div>
        <div class="music">
            <MusicOn
                v-if="isMusicEnabled"
                class="icon"
                @click="enableMusicForUser = false"
            />
            <MusicOff
                v-else
                class="icon"
                @click="enableMusicForUser = true"
            />
        </div>
        <div 
            v-if="!started" 
            class="start"
            :style="{ backgroundImage: createBackgroundUrl(backgroundUrl) }"
        >
            <div class="start-background" />
            <div class="content">
                <h2>Привет! Мы предлагаем тебе прожить один день из жизни обычной айтишницы. Выбери режим</h2>
                <div class="actions">
                    <button type="button" @click="startGame('base')">
                        Культурный
                    </button>
                    <button type="button" @click="startGame('adult')">
                        Взрослый
                    </button>
                </div>
                TODO: УДАЛИТЬ БЛЯТЬ
                <select v-model="currentSceneId">
                    <option v-for="scene in scenes" :key="scene">{{ scene }}</option>
                </select>
            </div>
        </div>
        <VScene
            v-else
            :key="currentSceneId"
            :scene="currentScene"
            @changeScene="changeScene"
        />
    </div>
</template>

<script>
import MusicOff from './components/music/music-off.vue';
import MusicOn from './components/music/music-on.vue';
import VScene from './components/scene_type/VScene.vue';
// import { VIDEO } from './scenes/background';
import { FIRST_SCENE, SCENES, TYPE } from './scenes/constants';
import { DEFAULT_NEXT_ACTION_ID, RESTART_ACTION_ID, NEXT_SCENE_TRANSITION, getSceneGraph } from './scenes/scene_graph';
import { randomBoolean } from './util';
import { state } from './scenes/state';
import { createBackgroundUrl } from '@/util';
import { IMAGE } from './scenes/background';

const music = require('@/assets/music/never_gonna_give_you_up.mp4');
const secondMusic = require('@/assets/music/fruhling_in_paris.mp3');

export default {
    name: 'App',
    components: {
        VScene,
        MusicOff,
        MusicOn,
    },
    data() {
        return {
            scenes: Object.values(SCENES),
            started: false,
            currentSceneId: FIRST_SCENE,
            enableMusicForUser: true,
            isMusicEnabled: true,
            audio: null,
        };
    },
    mounted() {
        const audio = randomBoolean(0.1) ? secondMusic : music;
        this.audio = new Audio(audio);
        this.audio.loop = true;
        this.audio.volume = 0.1;
        this.audio.play();
    },
    computed: {
        currentScene() {
            // ЕБАНИНА СДЕЛАТЬ МЕТОД ТИПА getScene()
            return getSceneGraph()[this.currentSceneId];
        },
        backgroundUrl() {
            return IMAGE.HOME;
        },
    },
    methods: {
        startGame(mode) {
            this.audio.play();

            if (mode === 'adult') {
                state.isAdult = true;
            } else {
                state.isAdult = false;
            }

            this.started = true;
        },
        changeScene({ nextScene, text, callback }) {
            state.handleScene({ nextScene, text, callback });

            if (nextScene === DEFAULT_NEXT_ACTION_ID) {
                this.currentSceneId = NEXT_SCENE_TRANSITION[this.currentSceneId];
                return;
            }

            if (nextScene === RESTART_ACTION_ID) {
                this.currentSceneId = FIRST_SCENE;
                state.resetState();
                this.started = false;
                return;
            }

            // NOTE: ебучий костыль, чтобы перезагружалась сцена, когда id не изменился
            if (this.currentSceneId === nextScene) {
                this.currentSceneId = null;
            }

            this.currentSceneId = nextScene;
        },
        enableMusic() {
            if (!this.enableMusicForUser) {
                return;
            }

            this.isMusicEnabled = true;
        },
        createBackgroundUrl,
    },
    watch: {
        enableMusicForUser(value) {
            if (value) {
                this.enableMusic();
            } else {
                this.isMusicEnabled = false;
            }
        },
        isMusicEnabled(value) {
            if (value) {
                this.audio.play();
            } else {
                this.audio.pause();
            }
        },
        currentScene: {
            deep: true,
            handler(value) {
                if (value.type === TYPE.video) {
                    this.isMusicEnabled = false;
                } else {
                    this.enableMusic();
                }
            },
        },
    },
};
</script>

<style lang="scss" scoped>
.start {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 100px;

    .start-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: black;
        opacity: .7;
        z-index: 4;
    }

    .content {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: center;
        align-items: center;
        z-index: 5;

        .actions {
            display: flex;
            gap: 10px;
        }

        h2 {
            text-align: center;
            font-size: 32px;
            color: white;
        }
    }
}

.music {
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px;
    min-width: 40px;
    min-height: 40px;
    width: 5vw;
    height: 5vh;
    z-index: 5;
    background: rgba(white, 0.2);
    border-radius: 50px;
    cursor: pointer;

    :hover {
        background: rgba(black, 0.1);
    }

    .icon {
        width: 100%;
        height: 100%;
    }
}
</style>

<style>
*,
*:before,
*:after {
    box-sizing: border-box;
}

:root {
    --button-background-color: white;
    --button-font-color: black;
}

button {
    padding: 8px 16px;
    font-size: 16px;
    /* text-transform: uppercase; */
    cursor: pointer;
    transition: all 0.15s ease;
    border: 1px solid var(--button-background-color);
    background-color: var(--button-background-color);
    color: var(--button-font-color);
}

button:hover:not([disabled]) {
    background-color: var(--button-font-color);
    color: var(--button-background-color);
}

button:disabled {
    cursor: default;
    pointer-events: none;
    opacity: 0.5;
}

html,
body,
div,
span,
object,
iframe,
figure,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
code,
em,
img,
small,
strike,
strong,
sub,
sup,
tt,
b,
u,
i,
ol,
ul,
li,
fieldset,
form,
label,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
main,
canvas,
embed,
footer,
header,
nav,
section,
video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    text-size-adjust: none;
}

footer,
header,
nav,
section,
main {
    display: block;
}

body {
    line-height: 1;
}

ol,
ul {
    list-style: none;
}

blockquote,
q {
    quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
    content: '';
    content: none;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

input {
    -webkit-appearance: none;
    border-radius: 0;
}
</style>
