import NLP from "../nlp.ts";
import { FactBaseElement, Rule } from "../../deps.ts";

const handleOutput = new Rule(
  {
    name: "HandleOutput",
    condition: {
      premise: {
        fbe: "Outputs",
        attr: "data",
      },
    },
    action: async (
      context: { [key: string]: FactBaseElement },
      notifications: any,
    ) => {
      return {
        outText: await NLP.gen(context["Outputs"].get("data")),
      };
    },
  },
);

export { handleOutput };
