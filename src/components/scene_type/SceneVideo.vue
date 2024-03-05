<template>
    <div class="scene scene-video">
        <video
            width="100%"
            height="calc(100% - 1px)"
            autoplay
        >
            <source
                autoplay
                size="1080"
                :src="video"
                type="video/mp4"
            />
            <p>
                Sorry, Your Browser Doesn't Support Embedded Videos. Here's the
                <a href="https://www.youtube.com/watch?v=yDzQDeaW6O8">Link to the video</a>
            </p>
        </video>

        <ControlPanel
            :text="scene.text"
            :actions="scene.actions"
            @changeScene="$emit('changeScene', $event)"
        />
    </div>
</template>

<script>
import ControlPanel from '@/components/ControlPanel.vue';

export default {
    name: 'SceneVideo',
    props: {
        scene: {
            type: Object,
            required: true,
        },
    },
    emits: ['changeScene'],
    components: {
        ControlPanel,
    },
    computed: {
        video() {
            return require('@/assets/video/' + this.scene.scene);
        },
    },
    methods: {
        createBackgroundUrl(url) {
            return `url(${url})`;
        },
    },
};
</script>

<style lang="scss" scoped>
.scene {
    width: 100%;
    height: 100vh;
    position: relative;
    background: black;

    .background {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
    }
}
</style>
