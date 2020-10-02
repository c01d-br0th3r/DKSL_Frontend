interface ITeam {
  ID: string;
  name: string;
  score: number;
}

export interface INowLive {
  away: ITeam;
  home: ITeam;
  nowInning: number;
  nowTopBottom: number;
  ground: string;
}
