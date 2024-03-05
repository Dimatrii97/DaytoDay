<template>
    <VScene
        :key="currentSceneId"
        :scene="currentScene"
        @changeScene="changeScene"
    />
</template>

<script>
import VScene from './components/scene_type/VScene.vue';
import { FIRST_SCENE } from './scenes/constants';
import { DEFAULT_NEXT_ACTION_ID, RESTART_ACTION_ID, NEXT_SCENE_TRANSITION, SCENE_GRAPH } from './scenes/scene_graph';

export default {
    name: 'App',
    components: {
        VScene,
    },
    data() {
        return {
            currentSceneId: FIRST_SCENE,
        };
    },
    computed: {
        currentScene() {
            return SCENE_GRAPH[this.currentSceneId];
        },
    },
    methods: {
        changeScene(nextScene) {
            if (nextScene === DEFAULT_NEXT_ACTION_ID) {
                this.currentSceneId = NEXT_SCENE_TRANSITION[this.currentSceneId];
                return;
            }

            if (nextScene === RESTART_ACTION_ID) {
                this.currentSceneId = FIRST_SCENE;
                return;
            }

            this.currentSceneId = nextScene;
        },
    },
};
</script>

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
