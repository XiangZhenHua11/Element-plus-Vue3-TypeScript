<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view />
    </transition>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  name: "AppMain",
});
</script>

<style lang="scss" scoped>
.app-main {
  overflow: hidden;
}
</style>
