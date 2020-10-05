import React, { useState } from "react";
import { ITeamInfo } from "../../interfaces/team";

interface IProps {
  teams: ITeamInfo[];
}

const LeaguePresenter: React.FC<IProps> = ({ teams }) => {
  const [term, setTerm] = useState<string>("");
  console.log(teams);
  return (
    <div>
      <input type="text" />
      <div>
        {teams.map((team) => (
          <div key={team.teamId}>{team.teamName}</div>
        ))}
      </div>
    </div>
  );
};

export default LeaguePresenter;
