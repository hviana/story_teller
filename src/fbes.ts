import Inputs from "./fbes/inputs.ts";
import Outputs from "./fbes/outputs.ts";
import Beliefs from "./fbes/beliefs.ts";
import Desires from "./fbes/desires.ts";

const inputs = new Inputs();
const outputs = new Outputs();
const beliefs = new Beliefs();
const desires = new Desires();

export { beliefs, desires, inputs, outputs };
