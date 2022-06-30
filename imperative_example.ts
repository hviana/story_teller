import NLP from "./src/nlp.ts";

import {
  AMRGenerator,
  AMRGraph,
  AMRQuery,
  AMRUtils,
  FactBaseElement,
  QueryCore,
  readLines,
} from "./deps.ts"; //TODO point published

const log = true;
const generator = new AMRGenerator();
const utils = new AMRUtils();
await QueryCore.initWordnet();
/*
  PHRASES
  jonny lovingly make a cake because maria was hungry
  jonny lovingly make a cake because ana was hungry

  what is the name of the person who was hungry?
  what is the name of the person who made the cake?
  why was it made?
  what was made?
  How was the cake made?
*/

const beliefsReviews: any = {
  "reports": (
    context: { [key: string]: FactBaseElement },
    input: AMRGraph,
  ) => {
    const query = new AMRQuery(input);
    return { ids: QueryCore.runY((y: any) => query.reports(y)), extra: {} };
  },
  "behaviors": {
    "ReceiveGenAsk": (
      context: { [key: string]: FactBaseElement },
      input: AMRGraph,
    ) => {
      const query = new AMRQuery(input);
      return {
        ids: QueryCore.runY((y: any) =>
          query.core.search("behaviors.receiveGenAsk", y)
        ),
        extra: {
          time: Date.now(), //to force detect change
        },
      };
    },
    "ReceiveHi": (
      context: { [key: string]: FactBaseElement },
      input: AMRGraph,
    ) => {
      const query = new AMRQuery(input);
      return {
        ids: QueryCore.runY((y: any) =>
          query.core.search("behaviors.receiveHi", y)
        ),
        extra: {
          time: Date.now(), //to force detect change
        },
      };
    },
    "ReceiveGoodbye": (
      context: { [key: string]: FactBaseElement },
      input: AMRGraph,
    ) => {
      const query = new AMRQuery(input);
      return {
        ids: QueryCore.runY((y: any) =>
          query.core.search("behaviors.receiveGoodbye", y)
        ),
        extra: {
          time: Date.now(), //to force detect change
        },
      };
    },
  },
  "commands": {
    "receiveNames": (
      context: { [key: string]: FactBaseElement },
      input: AMRGraph,
    ) => {
      const query = new AMRQuery(input);
      return {
        ids: QueryCore.runY((y: any) =>
          query.core.search("behaviors.receiveSomeoneName", y)
        ),
        extra: {
          time: Date.now(), //to force detect change
        },
      };
    },
  },
};

var dataContext = {};
for await (const line of readLines(Deno.stdin)) {
  if (line) {
    const newInput = await NLP.parse(line);
    const beliefs: any = {};
    const reports = beliefsReviews["reports"]({}, newInput);
    if (reports.ids.length) {
      beliefs["reports"] = reports;
    }
    const receiveGenAsk = beliefsReviews["behaviors"]["ReceiveGenAsk"](
      {},
      newInput,
    );
    if (receiveGenAsk.ids.length) {
      beliefs["ReceiveGenAsk"] = receiveGenAsk;
    }
    const receiveHi = beliefsReviews["behaviors"]["ReceiveHi"]({}, newInput);
    if (receiveHi.ids.length) {
      beliefs["ReceiveHi"] = receiveHi;
    }
    const receiveGoodbye = beliefsReviews["behaviors"]["ReceiveGoodbye"](
      {},
      newInput,
    );
    if (receiveGoodbye.ids.length) {
      beliefs["ReceiveGoodbye"] = receiveGoodbye;
    }
    const receiveNames = beliefsReviews["commands"]["receiveNames"](
      {},
      newInput,
    );
    if (receiveNames.ids.length) {
      beliefs["receiveNames"] = receiveNames;
    }
    for (const act in beliefs) {
      if (act === "ReceiveHi") {
        const hiAMR = generator.introduceYourself();
        console.log(await NLP.gen(hiAMR));
      } else if (act === "receiveNames") {
        const niceToMeetYouAMR = generator.sayNiceToMeetYou(
          utils.subGraphAt(newInput, beliefs[act].ids[0]),
        );
        console.log(await NLP.gen(niceToMeetYouAMR));
      } else if (act === "ReceiveGoodbye") {
        console.log(await NLP.gen(generator.sayGoodbye()));
      } else if (act === "reports") {
        const bestMatch = utils.searchPattern(
          dataContext,
          newInput,
          utils.rootId(newInput),
          false,
        )[0];
        dataContext = utils.joinGraph(
          dataContext,
          {
            graph: newInput,
            mode: "merge",
          },
          bestMatch ? [bestMatch as string] : undefined,
        ).graph;
        console.log(await NLP.gen(generator.sayOk()));
      } else if (act === "ReceiveGenAsk") {
        const awnser = utils.searchPattern(
          dataContext,
          newInput,
          beliefs[act].ids,
          false,
        )[0]; //[0] => best score
        if (awnser) {
          console.log(
            await NLP.gen(utils.subGraphAt(
              dataContext,
              awnser as string,
            )),
          );
        } else { //TODO dont know
          console.log(generator.sayIdontKnow());
        }
      }
    }
  }
}
