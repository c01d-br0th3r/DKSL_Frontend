interface IStatObj {
  playerId: number;
  year: number;
  G: number;
  PA: number;
  AB: number;
  R: number;
  H: number;
  _2B: number;
  _3B: number;
  HR: number;
  TB: number;
  RBI: number;
  SB: number;
  CS: number;
  BB: number;
  IBB: number;
  HBP: number;
  SO: number;
  GDP: number;
  SAC: number;
  SF: number;
  AVG: number;
  OBP: number;
  SLG: number;
  OPS: number;
  WAR: number;
  GO: number;
  FO: number;
  LO: number;
  P: number;
  C: number;
  FRISTBASE: number;
  SECONDBASE: number;
  THIRDBASE: number;
  SS: number;
  LF: number;
  LC: number;
  CF: number;
  RC: number;
  RF: number;
}

interface IBatterStat {
  total: IStatObj;
  yearly: IStatObj[];
}

interface IPlayerInfo {
  Bat_Throw: string;
  backNum: number;
  birthday: string;
  playerName: string;
  playerPhoto: string;
  position: number;
  teamId: number;
  wasPro: number;
}

interface ITeamInfo {
  foundingYear: number;
  joinYear: number;
  leagueId: number;
  teamId: number;
  teamName: string;
}

export interface IStat {
  player_info: IPlayerInfo;
  batter_stat: IBatterStat;
  teamInfo: ITeamInfo;
}
