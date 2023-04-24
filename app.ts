import { inputs } from "./src/fbes.ts";
import { App, readLines } from "./deps.ts";

App.init({
  numThreads: 1,
  maxHistorySize: 5000,
  rulesURL: new URL("./src/rules.ts", import.meta.url).href,
  onRuleNotification: (rule: any, notification: any) => {
    if (notification && rule === "HandleOutput") {
      if (notification.outText) {
        console.log(notification.outText);
        //console.log(App.history)
      }
    }
  },
});

for await (const line of readLines(Deno.stdin)) {
  if (line) {
    inputs.set({
      text: line,
    }, "REPLACE_AND_IGNORE_MISSING");
  }
}
