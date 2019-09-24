<template>
  <div class="learning-card">
    <span class="english">{{ currentSentence.english }}</span>
    <span class="japanese">{{ currentSentence.japanese }}</span>
    <font-awesome-icon v-if="canPrevious" class="icon icon--previous" icon="arrow-alt-circle-left" @click="previous" />
    <font-awesome-icon v-if="canNext" class="icon icon--next" icon="arrow-alt-circle-right" @click="next" />
  </div>
</template>

<script>
export default {
  props: {
    learningSentences: Array
  },
  data() {
    return {
      currentNum: 0
    }
  },
  computed: {
    currentSentence() {
      return this.learningSentences[this.currentNum]
    },
    canNext() {
      return this.currentNum !== this.learningSentences.length - 1
    },
    canPrevious() {
      return this.currentNum !== 0
    }
  },
  methods: {
    next() {
      this.currentNum++
    },
    previous() {
      this.currentNum--
    }
  }
}
</script>

<style lang="scss" scoped>
.learning-card {
  position: relative;
  border: 2px solid $color-line-grey;
  border-radius: 5px;
  padding: 4rem 2rem;
}

.english {
  display: block;
  font-weight: bold;
  margin-bottom: 2rem;
}

.japanese {
  font-size: 14px;
}

.icon {
  position: absolute;
  bottom: -6rem;
  font-size: 3.2rem;
  color: $color-blue-light;
  cursor: pointer;
  @include respond(phone) {
    font-size: 4.8rem;
  }

  &--previous {
    left: 1.5rem;
  }

  &--next {
    right: 1.5rem;
  }
}
</style>
