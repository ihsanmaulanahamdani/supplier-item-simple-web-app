<template>
  <div class="supplier">
    <h1 class="text-center mt-2">List of Suppliers</h1>
    <ListSupplier/>
  </div>
</template>

<script>
import ListSupplier from '@/components/ListSupplier.vue'

export default {
  components: {
    ListSupplier
  }
}
</script>
