import { FactBaseElement, QueryCore, Rule } from "../../../../deps.ts";

const beliefsReports = new Rule(
  {
    name: "BeliefsReports",
    condition: {
      premise: {
        fbe: "Beliefs",
        attr: "fromInput.informational",
      },
    },
    action: async (
      context: { [key: string]: FactBaseElement },
      notifications: any,
    ) => {
      const newInput = context["Inputs"].get("data");
      const reportsContext = context["Beliefs"].get("reports") || {};
      const bestMatch = QueryCore.utils.searchPattern(
        reportsContext,
        newInput,
        QueryCore.utils.rootId(newInput),
        false,
      )[0];
      const mergeResult = QueryCore.utils.joinGraph(
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
    },
  },
);

export { beliefsReports };
