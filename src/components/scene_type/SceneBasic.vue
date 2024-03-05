<template>
    <div class="scene scene-basic">
        <div class="background">

            <ControlPanel/>
        </div>
    </div>
</template>

<script>
import ControlPanel from '@/components/ControlPanel.vue';


export default {
    name: 'SceneBasic',
    components: {

        ControlPanel
    }
};
</script>

<style lang="scss" scoped>
.scene {
    width: 100vw;
    height: 100vh;
    position: relative;
    .background {
        width: 100%;
        height: 100%;
        background-image: url("../../assets/img/back/img.png");
        background-repeat: no-repeat;
        background-size: cover;
    }
}
</style>