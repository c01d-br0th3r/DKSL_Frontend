interface IStatObj {
  playerId: number;
  year: number;
  G: number;
  PA: number;
  AB: number;
  R: number;
  H: number;
  _2B: number;
  _3b: number;
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

export interface IStat {
  total: IStatObj;
  yearly: IStatObj[];
}
