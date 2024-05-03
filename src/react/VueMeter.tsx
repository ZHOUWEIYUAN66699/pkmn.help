import { applyPureVueInReact } from "veaury";
import Meter, { MeterProps } from "../vue/Meter.vue";

export const VueMeter = applyPureVueInReact(Meter) as React.FC<MeterProps>;
