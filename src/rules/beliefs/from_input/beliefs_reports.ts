import {
  AMRQuery,
  AMRUtils,
  FactBaseElement,
  FBEvalue,
  QueryCore,
  Rule,
} from "../../../../deps.ts";

const utils = new AMRUtils();

const beliefsReports = new Rule(
  {
    name: "BeliefsReports",
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
      const ids = QueryCore.runY((y: any) => query.reports(y));
      if (ids.length > 0) {
        const reportsContext = context["Beliefs"].get("reports") || {};
        const bestMatch = utils.searchPattern(
          reportsContext,
          newInput,
          utils.rootId(newInput),
          false,
        )[0];
        const mergeResult = utils.joinGraph(
          reportsContext,
          {
            graph: newInput,
            mode: "merge",
          },
          bestMatch ? [bestMatch as string] : undefined,
        );
        context["Beliefs"].set(
          { reports: mergeResult.graph },
          "REPLACE_AND_IGNORE_MISSING",
        );
      }
    },
  },
);

export { beliefsReports };
