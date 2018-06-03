<template>
  <div class="item">
    <h1 class="text-center mt-2">List of Items</h1>
    <ListItem/>
  </div>
</template>

<script>
import ListItem from '@/components/ListItem.vue'

export default {
  components: {
    ListItem
  }
}
</script>
