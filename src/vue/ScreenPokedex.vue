<template>
  <main className="ph3 mt3 center content-narrow">
    <div className="pt2" />
    <input v-model="query" />
    <Monster v-for="pokemon in pkmnPage" :key="pokemon.id" :pokemon="pokemon" />
  </main>
</template>

<script setup lang="ts">
import { matchSorter } from "match-sorter";
import { Pokemon, Type, typesFromUserInput } from "../data-types";
import Monster from "./Monster.vue";
import { computed, ref } from "vue";

function t(key: string) {
  return key;
}

export type ScreenPokedexProps = {
  allPokemon: Pokemon[];
  isLoading: boolean;
};

const props = defineProps<ScreenPokedexProps>();

const query = ref("");

const searchablePkmn = computed<Pokemon[]>(() => {
  return props.allPokemon.map((p) => {
    return {
      ...p,
      speciesName: p.speciesNames.en,
      formName: p.formNames.en,
    };
  });
});

const pkmn = computed<Pokemon[]>(() => {
  const s = query.value.trim().toLocaleLowerCase();
  if (/^[0-9]+$/.test(s)) {
    const number = Number(s);
    return searchablePkmn.value.filter((p) => p.number === number);
  }
  // The return value of `t` depends on the current value of `language`, but
  // the rules of hooks can't realize these. Pretend to use `language` here to
  // make it happy.
  // language;
  const types = typesFromUserInput({ types: s, t, strict: true });
  if (types.length > 0) {
    return searchablePkmn.value.filter((p) => {
      if (types.length === 1) {
        return p.types[0] === types[0] || p.types[1] === types[0];
      }
      if (types.length === 2 && types[1] === Type.none) {
        return p.types.length === 1 && p.types[0] === types[0];
      }
      return (
        p.types.slice().sort().join(" ") === types.slice().sort().join(" ")
      );
    });
  }
  if (!s) {
    return searchablePkmn.value;
  }
  const ret: Pokemon[] = matchSorter(searchablePkmn.value, s, {
    keys: ["speciesName", "formName", "number"],
  });
  return ret;
});

const pkmnPage = computed(() => {
  return pkmn.value.slice(0, 20);
});
</script>
