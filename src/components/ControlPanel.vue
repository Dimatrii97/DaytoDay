<template>
    <div class="control-panel">
        <span class="autor"> </span>
        <div class="panel">
            <vue-typewriter-effect
                :key="text"
                :strings="text"
                :delay="65"
                cursor=""
                :loop="false"
            />
            <!-- // TODO: анимация появление экшнов после текста -->
            <div class="actions">
                <div class="left"></div>
                <div class="center">

                </div>
                <div class="right">
                    <button
                        v-for="action in actions"
                        :key="action.nextScene"
                        type="button"
                        @click="goToNextScene(action.nextScene)"
                    >
                        {{ action.text }}
                    </button>
                    <button v-if="!actions.length" type="button" :disabled="actionNotSelected" @click="nextScene">
                        {{ nextAction.text }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
    },
    emits: ['changeScene'],
    data() {
        return {
            nextSceneId: null,
        };
    },
    methods: {
        write() { },
        chooseAction(scene) {
            this.nextSceneId = scene;
        },
        nextScene() {
            this.goToNextScene(DEFAULT_NEXT_ACTION_ID);
        },
        goToNextScene(scene) {
            this.$emit('changeScene', scene);
        },
    },
    mounted() {
        this.write();
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
        }
    }
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
}

.actions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

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
