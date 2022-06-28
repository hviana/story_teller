import { AMRGraph, AMRUtils } from "../deps.ts";

export default class NLP {
  static utils = new AMRUtils();
  static url = "http://localhost:41425";
  static async #post(data: any): Promise<any> {
    return (await (await fetch(NLP.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    })).json()).res;
  }
  static async gen(graph: AMRGraph): Promise<string> {
    return await this.#post({ graph: NLP.utils.AMRGraphToTriples(graph) });
  }
  static async parse(text: string): Promise<AMRGraph> {
    return NLP.utils.triplesToAMRGraph(await this.#post({ text: text }));
  }
}
