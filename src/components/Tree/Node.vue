<template>
  <section>
      <div :class="['node', { clickable: isClickable, selected: isSelected }]"
           :style="{ marginLeft: `${margin * depth}px` }"
           @click="toggle(title)"
           @keyup.enter.exact="toggle(title)"
           @keyup.shift.enter="select"
           @keyup.space="toggle(title)"
           ref="node"
           tabindex="0">
        <img :src="iconSource" :alt="type" class="icon">
        <span :class="['title', { link: isLink }]">{{ title }}</span>
      </div>
      <div v-for="item in contents" :key="item.name">
        <tree-node v-if="isExpanded"
                   :contents="item.contents"
                   :type="item.type"
                   :title="item.name"
                   :margin="margin"
                   :depth="depth + 1" />
      </div>
  </section>
</template>

<script>
export default {
  name: 'TreeNode',
  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      validator: (value) => ['file', 'link', 'directory'].includes(value),
    },
    depth: {
      type: Number,
      required: true,
    },
    margin: {
      type: Number,
      required: false,
      default: 40,
    },
    contents: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      isExpanded: false,
      isSelected: false,
    };
  },
  computed: {
    iconSource() {
      return require(`@/assets/icons/${this.type}.svg`);
    },
    isClickable() {
      return this.isLink || Boolean(this.contents?.length);
    },
    isLink() {
      return this.type === 'link';
    },
  },
  methods: {
    select() {
      this.isSelected = !this.isSelected;
    },
    toggle() {
      this.$refs.node.focus();

      if (this.isClickable) {
        this.isExpanded = !this.isExpanded;
      }

      if (this.type !== 'directory' || this.isSelected) {
        this.select();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "colors";

.node {
  display: flex;

  align-items: flex-end;

  & .icon {
    color: colors.$icon;
    width: 24px;
    height: 24px;
  }

  & .title {
    font-size: 16px;
    margin-left: 4px;
  }

  &.selected {
    background-color: colors.$node-bg;
  }

  &.clickable {
    cursor: pointer;

    & .title.link {
      color: colors.$link;

      &:hover {
        color: colors.$link-hovered;
      }
    }
  }
}
</style>
