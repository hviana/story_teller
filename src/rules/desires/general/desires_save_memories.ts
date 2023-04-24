import { AMRGraph, FactBaseElement, Rule } from "../../../../deps.ts";
import MemoryPiece from "../../../types/memory_piece.ts";

//create hash from graph for otimize search
const getHashFromGraph = (graph: AMRGraph): string[] => {
  //TODO
  return [];
};
const add = (memoryPiece: MemoryPiece): void => {
  const time = Date.now();
  const id = crypto.randomUUID();
  const hash = getHashFromGraph(memoryPiece.fragment!.graph!);
  //TODO
};

const desiresSaveMemories = new Rule(
  {
    name: "DesiresSaveMemories",
    condition: {
      premise: {
        fbe: "Desires",
        attr: "general.saveMemories",
      },
    },
    action: async (
      context: { [key: string]: FactBaseElement },
      notifications: any,
    ) => {
    },
  },
);

export { desiresSaveMemories };
