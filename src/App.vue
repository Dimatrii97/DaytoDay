<template>
    <!-- Так, зачем ты открыла инспектор, ну ка выйди, мне стыдно за свой говнокод...
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
        <VScene
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
import { FIRST_SCENE, TYPE } from './scenes/constants';
import { DEFAULT_NEXT_ACTION_ID, RESTART_ACTION_ID, NEXT_SCENE_TRANSITION, getSceneGraph } from './scenes/scene_graph';
import { randomBoolean } from './util';
import { state } from './scenes/state';

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
    },
    methods: {
        changeScene(nextScene) {
            state.handleScene(nextScene);

            if (nextScene === DEFAULT_NEXT_ACTION_ID) {
                this.currentSceneId = NEXT_SCENE_TRANSITION[this.currentSceneId];
                return;
            }

            if (nextScene === RESTART_ACTION_ID) {
                this.currentSceneId = FIRST_SCENE;
                state.resetState();
                return;
            }

            this.currentSceneId = nextScene;
        },
        enableMusic() {
            if (!this.enableMusicForUser) {
                return;
            }

            this.isMusicEnabled = true;
        }
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
