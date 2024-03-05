<template>
    <div>
        <SceneBasic
            :scene="scene"
            @changeScene="$emit('changeScene', $event)"
         />
    </div>
</template>

<script>
import SceneBasic from './SceneBasic.vue';

export default {
    components: {
        SceneBasic,
    },
    props: {
        scene: {
            type: Object,
            required: true,
        },
    },
    emits: ['changeScene'],
};
</script>
