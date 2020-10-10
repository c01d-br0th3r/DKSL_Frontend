export interface IBatterStatObj {
  playerName: string;
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
  total: IBatterStatObj;
  yearly: IBatterStatObj[];
}

export interface IPitcherObj {
  AB: number;
  BB: number;
  BK: number;
  Batters: number;
  ER: number;
  ERA: number;
  G: number;
  H: number;
  HBP: number;
  HLD: number;
  HR: number;
  IP: number;
  K: number;
  L: number;
  NP: number;
  R: number;
  SAC: number;
  SF: number;
  SV: number;
  W: number;
  WP: number;
  playerId: number;
  year: number;
  playerName: string;
}

interface IPitcherStat {
  total: IPitcherObj;
  yearly: IPitcherObj[];
}

export interface IPlayerInfo {
  Bat_Throw: string;
  backNum: number;
  birthday: string;
  playerName: string;
  playerPhoto: string;
  position: number;
  teamId: number;
  playerId: number;
  teamName: string;
  wasPro: number;
}

export interface IStat {
  player_info: IPlayerInfo;
  batter_stat: IBatterStat;
  pitcher_stat: IPitcherStat;
}
