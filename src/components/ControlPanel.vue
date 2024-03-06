<template>
    <!-- Дима л... лучший разработчик CRM B2B! -->
    <div class="control-panel">
        <span class="autor"> </span>
        <div class="panel">
            <div v-if="!skipTypeWriter" class="text" id="typewriter" />
            <div class="text" v-else>{{ text }}</div>
            <div class="actions" :class="{ hide: !showActions }">
                <div class="left"></div>
                <div class="center">

                </div>
                <div class="right">
                    <button
                        v-for="action in actions"
                        :key="action.nextScene"
                        type="button"
                        @click="goToNextScene(action)"
                    >
                        {{ action.text }}
                    </button>
                    <button v-if="!actions.length" type="button" @click="nextScene">
                        {{ nextAction.text }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Typewriter from 'typewriter-effect/dist/core';
import { NEXT_ACTION } from '@/scenes/scene_graph';
import { DEFAULT_NEXT_ACTION_ID } from '../scenes/scene_graph';

export default {
    name: 'ControlPanel',
    props: {
        text: {
            type: String,
            required: true,
        },
        actions: {
            type: Array,
            required: false,
            default: () => [],
        },
        delay: {
            type: Number,
            required: false,
            default: 0,
        },
    },
    emits: ['changeScene'],
    data() {
        return {
            nextSceneId: null,
            showActions: false,
            skipTypeWriter: false,
        };
    },
    methods: {
        write() { },
        chooseAction(scene) {
            this.nextSceneId = scene;
        },
        nextScene() {
            this.goToNextScene({ nextScene: DEFAULT_NEXT_ACTION_ID });
        },
        goToNextScene(scene) {
            if (!this.showActions) {
                return;
            }

            this.$emit('changeScene', scene);
        },
        skipTypeWriterEffect() {
            this.skipTypeWriter = true;
            this.showActions = true;
        },
        skipTypeWriterEffectOnSpace(event) {
            if (event.code === 'Space') {
                this.skipTypeWriterEffect();
            }
        },
    },
    mounted() {
        document.addEventListener('keyup', this.skipTypeWriterEffectOnSpace);

        const writer = new Typewriter('#typewriter', {
            autoStart: true,
            delay: 65,
        });

        writer
            .pauseFor(this.delay)
            .typeString(this.text)
            .pauseFor(300)
            .callFunction(() => {
                this.showActions = true;
            })
            .start();
    },
    beforeUnmount() {
        document.removeEventListener('keyup', this.skipTypeWriterEffectOnSpace);
    },
    computed: {
        nextAction() {
            return NEXT_ACTION;
        },
        actionNotSelected() {
            return this.actions.length && !this.nextSceneId;
        },
    },
    watch: {
        // Если изменился текст, значит другая сцена
        text() {
            this.nextScene = null;
        },
    },
};
</script>

<style lang="scss" scoped>
.control-panel {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 90vw;
    color: white;
    font-size: 20px;
}

.panel {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    padding: 20px 50px;

    display: flex;
    flex-direction: column;
    gap: 10px;

    .text {
        white-space: pre-line;
    }
}

.actions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    &.hide {
        opacity: 0;

        button {
            cursor: default;
        }
    }

    .right {
        justify-self: end;
    }

    .center {
        justify-self: center;
    }

    .center, .right {
        gap: 10px;
        display: flex;
    }
}
</style>
