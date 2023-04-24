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

const desiresSayOk = new Rule(
  {
    name: "DesiresSayOk",
    condition: {
      premise: {
        fbe: "Beliefs",
        attr: "reports",
      },
    },
    action: async (
      context: { [key: string]: FactBaseElement },
      notifications: any,
    ) => {
      context["Outputs"].set({
        data: generator.sayOk(),
      }, "REPLACE_AND_IGNORE_MISSING");
    },
  },
);

export { desiresSayOk };
