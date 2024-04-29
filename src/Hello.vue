<script setup lang="ts">
import { ref } from "vue";

type Props = {
  x?: string;
};

// Can store reference if needed...
const props = defineProps<Props>();

console.log({ ...props });

const message = ref("Hello");
</script>

<style module>
.x {
  color: blue;
}
</style>

<template>
  <div :class="$style.x">{{ message }} = {{ x }}</div>
</template>
