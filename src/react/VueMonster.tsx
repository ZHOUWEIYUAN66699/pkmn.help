import { applyPureVueInReact } from "veaury";
import Monster, { MonsterProps } from "../vue/Monster.vue";

export const VueMonster = applyPureVueInReact(
  Monster
) as React.FC<MonsterProps>;
