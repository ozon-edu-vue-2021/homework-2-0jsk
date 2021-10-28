<template>
  <div id="app">
    <tree-presenter :margin="20" :root="modules" />
  </div>
</template>

<script>
import { Catalog } from '@/services/catalog';
import Presenter from '@/components/Tree/Presenter';

export default {
  name: 'App',
  components: { TreePresenter: Presenter },
  data() {
    return {
      modules: Catalog.get(),
    };
  },
  updated() {
    console.log({ m: this.modules });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
