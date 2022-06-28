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

const desiresAnswerGenAsk = new Rule(
  {
    name: "DesiresAnswerGenAsk",
    condition: {
      premise: {
        fbe: "Beliefs",
        attr: "fromInput.behaviors.receiveGenAsk",
      },
    },
    action: async (
      context: { [key: string]: FactBaseElement },
      notifications: any,
    ) => {
      const belief = context["Beliefs"].get(
        "fromInput.behaviors.receiveGenAsk",
      );
      const awnser = utils.searchPattern(
        context["Beliefs"].get("reports"),
        belief.graph,
        belief.ids[0],
        false,
      )[0]; //[0] => best score
      if (awnser) {
        context["Outputs"].set({
          data: utils.subGraphAt(
            context["Beliefs"].get("reports"),
            awnser as string,
          ),
        }, "REPLACE_AND_IGNORE_MISSING");
      } else { //TODO dont know
        context["Outputs"].set({
          data: generator.sayIdontKnow(),
        }, "REPLACE_AND_IGNORE_MISSING");
      }
    },
  },
);

export { desiresAnswerGenAsk };
