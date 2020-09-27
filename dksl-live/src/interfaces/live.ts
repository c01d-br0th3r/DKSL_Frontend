import { ITeam } from "./team";
import { IBatter } from "./batter";

interface ILeague {
  id: string;
  name: string;
}

interface ICount {
  Ball: number;
  Out: number;
  Strike: number;
}

export interface ILive {
  away: ITeam;
  home: ITeam;
  caseId: number;
  ground: string;
  league: ILeague;
  nowBase: IBatter[];
  nowCount: ICount;
  nowInning: number;
  nowTopBottom: number;
  textCast: string[];
  waitForNextBatter: boolean;
}
