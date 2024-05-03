import { applyPureVueInReact } from "veaury";
import ScreenPokedex, { ScreenPokedexProps } from "../vue/ScreenPokedex.vue";

export const VueScreenPokedex = applyPureVueInReact(
  ScreenPokedex
) as React.FC<ScreenPokedexProps>;
