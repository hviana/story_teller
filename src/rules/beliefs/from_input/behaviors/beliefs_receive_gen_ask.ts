import {
  AMRGenerator,
  AMRQuery,
  AMRUtils,
  FactBaseElement,
  FBEvalue,
  QueryCore,
  Rule,
} from "../../../../../deps.ts";
import CommunicationFragment from "../../../../types/communication_fragment.ts";

const utils = new AMRUtils();
const generator = new AMRGenerator();

const beliefsReceiveGenAsk = new Rule(
  {
    name: "BeliefsReceiveGenAsk",
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
      const ids = QueryCore.runY((y: any) =>
        query.core.search("behaviors.receiveGenAsk", y)
      );
      if (ids.length > 0) {
        const communicationFragment: CommunicationFragment = {
          ids: ids,
          graph: newInput,
        };
        context["Beliefs"].set(
          {
            fromInput: {
              behaviors: {
                receiveGenAsk: communicationFragment,
              },
            },
          },
          "IGNORE_MISSING",
        );
      }
    },
  },
);

export { beliefsReceiveGenAsk };
