<template>
  <div>
    <div>{{ speciesName }}</div>
    <div>{{ formattedFormName }}</div>
    <img :srcset="image" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Pokemon } from "../data-types";
import { getWebpSrcSet } from "../getImage";
import { formatMonsterNumber } from "../formatMonsterNumber";

export type MonsterProps = {
  pokemon: Pokemon;
};

const props = defineProps<MonsterProps>();

const image = computed(() => {
  return getWebpSrcSet({ id: props.pokemon.id, shiny: false });
});

const audioRef = ref<HTMLAudioElement>();

function t(key: string) {
  return key;
}

// const { t, i18n } = useTranslation();
// const language = useComputedLanguage();
const language = "en";
const shiny = ref(false);
const playing = ref(false);

const displayNumber = computed(() => {
  return formatMonsterNumber(props.pokemon.number);
});

const speciesName = computed(() => {
  return props.pokemon.speciesNames[language] || props.pokemon.speciesNames.en;
});

const formName = computed(() => {
  return props.pokemon.formNames[language] || props.pokemon.formNames.en;
});

const formattedFormName = computed(() => {
  return formName.value ? `(${formName.value})` : "\u00a0";
});

function playCry() {
  const audio = audioRef.value;
  if (!audio) {
    return;
  }
  if (audio.paused) {
    audio.play();
  }
}
</script>

<style module></style>
