import React, { useState, useEffect } from "react";
import TeamsPresenter from "./TeamsPresenter";
import { RouteComponentProps } from "react-router-dom";
import { IPlayerInfo } from "../../interfaces/stat";
import { ITeamInfo } from "../../interfaces/team";
import apis from "../../apis";

interface IMatchProps {
  id: string;
}

const TeamsContainer: React.FC<RouteComponentProps<IMatchProps>> = ({
  match,
}) => {
  const [teamInfo, setTeamInfo] = useState<ITeamInfo[] | null>(null);
  const [players, setPlayers] = useState<IPlayerInfo[] | null>(null);
  useEffect(() => {
    const {
      params: { id },
    } = match;
    const fetchTeamInfo = async (id: number) => {
      try {
        const { data: teamInfo } = await apis.fetchTeamInfo(id);
        setTeamInfo(teamInfo);
        const { data: players } = await apis.fetchTeamPlayers(id);
        setPlayers(players);
      } catch (e) {
        console.log(e);
      }
    };
    fetchTeamInfo(parseInt(id));
  }, []);
  return (
    <div>
      {teamInfo === null || players === null ? (
        <div>Loading ...</div>
      ) : (
        <TeamsPresenter teamInfo={teamInfo[0]} players={players} />
      )}
    </div>
  );
};

export default TeamsContainer;
