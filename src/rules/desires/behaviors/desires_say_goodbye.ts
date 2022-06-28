import {
  AMRGenerator,
  AMRQuery,
  AMRUtils,
  FactBaseElement,
  QueryCore,
  Rule,
} from "../../../../deps.ts";
const utils = new AMRUtils();
const generator = new AMRGenerator();

const desiresSayGoodbye = new Rule(
  {
    name: "DesiresSayGoodbye",
    condition: {
      premise: {
        fbe: "Beliefs",
        attr: "fromInput.behaviors.receiveGoodbye",
      },
    },
    action: async (
      context: { [key: string]: FactBaseElement },
      notifications: any,
    ) => {
      context["Outputs"].set({
        data: generator.sayGoodbye(),
      }, "REPLACE_AND_IGNORE_MISSING");
    },
  },
);

export { desiresSayGoodbye };
