import {
  AMRQuery,
  FactBaseElement,
  FBEvalue,
  QueryCore,
  Rule,
} from "../../../../../deps.ts";
import CommunicationFragment from "../../../../types/communication_fragment.ts";
const beliefsReceiveNames = new Rule(
  {
    name: "BeliefsReceiveNames",
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
      const ids = QueryCore.runY((y: any) => query.receiveNames(y));
      if (ids.length > 0) {
        context["Beliefs"].set(
          {
            fromInput: {
              commands: {
                receiveNames: <CommunicationFragment> {
                  ids: ids,
                  graph: newInput,
                },
              },
            },
          },
          "IGNORE_MISSING",
        );
      }
    },
  },
);

export { beliefsReceiveNames };
