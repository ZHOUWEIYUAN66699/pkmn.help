<template>
  <div :class="$style.meter">
    <div :class="$style.meterFill"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

export type MeterProps = {
  value: number;
  max: number;
  color?: string;
};

const props = defineProps<MeterProps>();

const meterColor = computed(() => props.color ?? "var(--color-fg3)");
const meterWidth = computed(() => (props.value / props.max) * 100 + "%");
</script>

<style module>
.meter {
  display: flex;
  box-shadow: inset 0 0 0 1px var(--color-border2);
  border-radius: 2px;
  min-height: 1rem;
}

.meterFill {
  border-radius: inherit;
  width: v-bind("meterWidth");
  background: v-bind("meterColor");
  box-shadow: inset 0 0 0 1px var(--color-vibrant-border1);
  transition: width 250ms;
}
</style>
