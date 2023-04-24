import { AMRGraph, FactBaseElement, Rule } from "../../../../deps.ts";
import MemoryPiece from "../../../types/memory_piece.ts";

const getHashFromGraph = (graph: AMRGraph): string[] => {
  //TODO
  return [];
};

const search = (
  cateogries: string[],
  startTime: number,
  endTime: number,
  graphForHash?: AMRGraph,
): MemoryPiece[] => {
  //TODO
  return [];
};

const desiresGetMemories = new Rule(
  {
    name: "DesiresGetMemories",
    condition: {
      premise: {
        fbe: "Desires",
        attr: "general.getMemories",
      },
    },
    action: async (
      context: { [key: string]: FactBaseElement },
      notifications: any,
    ) => {
    },
  },
);

export { desiresGetMemories };
