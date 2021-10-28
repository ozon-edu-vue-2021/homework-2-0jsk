<template>
    <tree-node :key="root.name"
               :depth="0"
               :margin="margin"
               :title="root.name"
               :contents="root.contents"
               :type="root.type" />
</template>

<script>
import Node from './Node';

export default {
  name: 'TreePresenter',
  components: { TreeNode: Node },
  props: {
    margin: {
      type: Number,
      required: false,
    },
    root: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedItems: [],
    };
  },
  methods: {
    toggleSelect() {
      return Boolean(this.selected.includes());
    },
  },
};
</script>
