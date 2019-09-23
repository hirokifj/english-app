<template>
  <ul class="list">
    <li class="list__item" v-for="list in lists" :key="list.id">
      <router-link class="list__link" :to="{ name: 'listsDetail', params: { id: list.id } }">
        <span class="list-title">{{ list.title }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    lists: Array
  },
}
</script>

<style lang="scss" scoped>
.list {
  list-style: none;
  &__item {
    border: 2px solid $color-line-grey;

    &:not(:last-child) {
      margin-bottom: 2rem;
    }
  }

  &__link {
    min-height: 10rem;
    display: flex;
    align-items: center;
    padding: 2rem;

    &:hover {
      background-color: $color-grey-light-1;
    }

    &:link,
    &:visited {
      color: $color-dark;
      text-decoration: none;
    }
  }
}

.list-title {
  font-weight: bold;
}
</style>
