export { handleInput } from "./rules/handle_input.ts";
export { handleOutput } from "./rules/handle_output.ts";

export { beliefsReports, beliefsTopProb } from "./rules/handle_beliefs.ts";

export {
  desiresAnswerGenAsk,
  desiresGetMemories,
  desiresSaveMemories,
  desiresSayGoodbye,
  desiresSayHi,
  desiresSayNiceToMeetYou,
  desiresSayOk,
} from "./rules/handle_desires.ts";

import { QueryCore } from "../deps.ts";

await QueryCore.initWordnet();
