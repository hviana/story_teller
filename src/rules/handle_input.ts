import { AMRGraph, AMRQuery, AMRUtils, QueryCore, Rule } from "../../deps.ts";

import NLP from "../nlp.ts";

const utils = new AMRUtils();

const handleInput = new Rule(
  {
    name: "HandleInput",
    condition: {
      premise: {
        fbe: "Inputs",
        attr: "text",
      },
    },
    action: async (context: any, notifications: any) => {
      const newInputAMR = await NLP.parse(context["Inputs"].get("text"));
      const query = new AMRQuery(newInputAMR);
      const sentences = QueryCore.runY((y: any) => query.core.sentences(y));
      if (sentences.length) {
        for (const s of sentences) {
          context["Inputs"].set({
            data: utils.subGraphAt(
              newInputAMR,
              s,
            ),
          }, "REPLACE_AND_IGNORE_MISSING");
        }
      } else {
        context["Inputs"].set(
          { data: newInputAMR },
          "REPLACE_AND_IGNORE_MISSING",
        );
      }
    },
  },
);

export { handleInput };
