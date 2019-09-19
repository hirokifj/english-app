<template>
  <div class="card" :class="cardClass">
    <div class="card__header" :class="headerColor">
      <slot name="header"></slot>
    </div>
    <div class="card__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    'color': String,
    'white': Boolean
  },
  data() {
    return {
      cardClass: {
        'card--white': this.white
      }
    }
  },
  computed: {
    headerColor() {
      return 'card__header--' + this.color
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  border: 2px solid $color-line-grey;
  border-radius: 5px;

  &--white {
    border: none;
    background-color: $color-white;
  }

  &__header {
    padding: 1.6rem 2rem;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1px;
    border-radius: 5px 5px 0 0;
    @include respond(tab-port) {
        text-align: center;
    }

    &--blue {
      background-color: $color-blue;
      color: $color-white;
    }

    &--green {
      background-color: $color-green;
      color: $color-white;
    }

    &--yellow {
      background-color: $color-yellow;
      color: $color-white;
    }

    &--pink {
      background-color: $color-pink;
      color: $color-white;
    }
  }

  &__body {
    padding: 4rem 2rem;
  }
}
</style>
