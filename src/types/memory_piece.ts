import CommunicationFragment from "./communication_fragment.ts";

export default interface MemoryPiece {
  time: number;
  id: string;
  fragment?: CommunicationFragment;
}
