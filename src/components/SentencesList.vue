<template>
  <ul class="list">
    <li class="list__item" v-for="sentence in sentences" :key="sentence.id">
      <template v-if="selectable">
        <div class="list__content">
          <div class="sentence">
            <span class="sentence__en">{{ sentence.english }}</span>
            <span class="sentence__ja">{{ sentence.japanese }}</span>
          </div>
          <font-awesome-icon :class="iconClass" :icon="iconName" @click="select(sentence.id)" />
        </div>
      </template>
      <template v-else>
        <router-link class="list__link" :to="{ name: 'senetncesDetail', params: { id: sentence.id } }">
          <div class="sentence">
            <span class="sentence__en">{{ sentence.english }}</span>
            <span class="sentence__ja">{{ sentence.japanese }}</span>
          </div>
        </router-link>
      </template>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    sentences: Array,
    selectable: Boolean,
    type: String
  },
  computed: {
    iconName() {
      return this.type === 'add' ? 'plus-circle' : 'times-circle'
    },
    iconClass() {
      return {
        'icon': true,
        'add-icon': this.type === 'add',
        'remove-icon': this.type === 'remove'
      }
    }
  },
  methods: {
    select(id) {
      this.$emit('select', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  list-style: none;
  &__item {
    min-height: 10rem;
    border: 2px solid $color-line-grey;

    &:not(:last-child) {
      margin-bottom: 2rem;
    }
  }

  &__link {
    display: block;
    width: 100%;
    height: 100%;
    padding: 2rem;
    transition: background-color .4s;

    &:hover {
      background-color: $color-grey-light-1;
    }

    &:link,
    &:visited {
      color: $color-dark;
      text-decoration: none;
    }
  }

  &__content {
    position: relative;
    padding: 6rem 2rem;
    @include respond(tab-port) {
      padding: 4rem 2rem;
    }
  }
}

.icon {
  font-size: 3.2rem;
  position: absolute;
  top: 1.2rem;
  right: 1rem;
  cursor: pointer;
}

.add-icon {
  color: $color-blue-light;
}

.remove-icon {
  color: $color-pink-light;
}

.sentence {
  &__en {
    display: block;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  &__ja {
    font-size: 14px;
    color: $color-grey-dark-1;
  }
}
</style>
