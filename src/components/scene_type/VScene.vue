<template>
    <div>
        <scene-video 
            v-if="isVideo"
            :scene="scene"
            @changeScene="$emit('changeScene', $event)"
        />
        <SceneGame
            v-if="isGame"
            :scene="scene"
            @changeScene="$emit('changeScene', $event)"
        />
        <SceneBasic
            v-else
            :scene="scene"
            @changeScene="$emit('changeScene', $event)"
        />
    </div>
</template>

<script>
import { TYPE } from '@/scenes/constants';
import SceneBasic from './SceneBasic.vue';
import SceneVideo from './SceneVideo.vue';
import SceneGame from './SceneGame.vue';

export default {
    components: {
        SceneBasic,
        SceneVideo,
        SceneGame
    },
    props: {
        scene: {
            type: Object,
            required: true,
        },
    },
    emits: ['changeScene'],
    mounted() {
        console.log('VScene mounted')
    },
    computed: {
        isVideo() {
            return this.scene.type === TYPE.video;
        },
        isGame() {
            return this.scene.type === TYPE.game;
        }
    }
};
</script>
