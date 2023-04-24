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

const desiresSayHi = new Rule(
  {
    name: "DesiresSayHi",
    condition: {
      premise: {
        fbe: "Beliefs",
        attr: "fromInput.behaviors.receiveHi",
      },
    },
    action: async (
      context: { [key: string]: FactBaseElement },
      notifications: any,
    ) => {
      const hiAMR = generator.introduceYourself();
      context["Outputs"].set({
        data: hiAMR,
      }, "REPLACE_AND_IGNORE_MISSING");
    },
  },
);

export { desiresSayHi };
