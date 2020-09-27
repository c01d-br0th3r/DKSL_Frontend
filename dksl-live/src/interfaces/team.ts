import { IBatterInfo } from "./batter";
import { IPitcherInfo } from "./pitcher";

export interface ITeam {
  ID: string;
  batterInfo: IBatterInfo[];
  name: string;
  nowBatter: number;
  nowPitcher: number;
  pitcherInfo: IPitcherInfo[];
  score: number[];
  totalScore: number;
}
