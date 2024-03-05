<template>
    <div>
        <scene-video 
            v-if="isVideo"
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

export default {
    components: {
        SceneBasic,
        SceneVideo,
    },
    props: {
        scene: {
            type: Object,
            required: true,
        },
    },
    emits: ['changeScene'],
    computed: {
        isVideo() {
            return this.scene.type === TYPE.video;
        }
    }
};
</script>
