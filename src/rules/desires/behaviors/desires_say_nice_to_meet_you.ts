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

const desiresSayNiceToMeetYou = new Rule(
  {
    name: "DesiresSayNiceToMeetYou",
    condition: {
      and: [
        {
          premise: {
            fbe: "Beliefs",
            attr: "fromInput.behaviors.receiveHi",
          },
        },
        {
          premise: {
            fbe: "Beliefs",
            attr: "fromInput.commands.receiveNames",
          },
        },
      ],
    },
    action: async (
      context: { [key: string]: FactBaseElement },
      notifications: any,
    ) => {
      const niceToMeetYouAMR = generator.sayNiceToMeetYou(
        utils.subGraphAt(
          context["Beliefs"].get("fromInput.commands.receiveNames")
            .graph,
          context["Beliefs"].get("fromInput.commands.receiveNames")
            .ids[0], //TODO use all names
        ),
      );
      context["Outputs"].set({
        data: niceToMeetYouAMR,
      }, "REPLACE_AND_IGNORE_MISSING");
    },
  },
);

export { desiresSayNiceToMeetYou };
