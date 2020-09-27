import { IBatterStat } from "./batterStat";

export interface IBatter {
  ID: string;
  position: string;
  name: string;
  result: any[];
  stat: IBatterStat;
}

export interface IBatterInfo {
  now: number;
  batters: IBatter[];
}
