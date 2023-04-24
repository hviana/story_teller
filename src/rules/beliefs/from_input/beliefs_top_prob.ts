import {
  AMRQuery,
  AMRUtils,
  FactBaseElement,
  FBEvalue,
  QueryCore,
  Rule,
} from "../../../../deps.ts";

const utils = new AMRUtils();

const beliefsTopProb = new Rule(
  {
    name: "BeliefsTopProb",
    condition: {
      premise: {
        fbe: "Inputs",
        attr: "data",
      },
    },
    action: async (
      context: { [key: string]: FactBaseElement },
      notifications: any,
    ) => {
      const newInput = context["Inputs"].get("data");
      const query = new AMRQuery(newInput);
      const topProb =
        QueryCore.runY((y: any) => query.core.search("", true, y))[0];
      const parts = topProb.split(".");
      const id = parts.pop();
      const obj: any = { fromInput: {} };
      var tempObj: any = {};
      tempObj = obj["fromInput"];
      for (var i = 0; i < parts.length; i++) {
        if (i === parts.length - 1) {
          tempObj[parts[i]] = { ids: [id], graph: newInput };
        } else {
          tempObj[parts[i]] = {};
          tempObj = tempObj[parts[i]];
        }
      }
      context["Beliefs"].set(
        obj,
        "REPLACE_AND_IGNORE_MISSING",
      );
    },
  },
);

export { beliefsTopProb };
