<template>
  <div>
    <template v-for="index of 5">
      <span v-if="rating >= index" :key="index" class="icon icon--ratingFull">
        <svg>
          <use xlink:href="#icon-star" />
        </svg>
      </span>
      <span v-else :key="index" class="icon icon--ratingEmpty">
        <svg>
          <use xlink:href="#icon-star" />
        </svg>
      </span>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      required: true
    }
  }
}
</script>
