import { AMRGraph } from "../../deps.ts";

export default interface ComunicationFragment {
  ids: string[];
  graph: AMRGraph;
  extra?: { [key: string]: any };
}
