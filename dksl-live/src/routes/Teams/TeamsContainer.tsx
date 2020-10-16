import React, { useState, useEffect } from "react";
import TeamsPresenter from "./TeamsPresenter";
import { RouteComponentProps } from "react-router-dom";
import { IBatterStatObj, IPitcherObj } from "../../interfaces/stat";
import { ITeamInfo } from "../../interfaces/team";
import apis from "../../apis";

interface IMatchProps {
  id: string;
}

const TeamsContainer: React.FC<RouteComponentProps<IMatchProps>> = ({
  match,
}) => {
  const [teamInfo, setTeamInfo] = useState<ITeamInfo[] | null>(null);
  const [batters, setBatters] = useState<IBatterStatObj[] | null>(null);
  const [pitchers, setPitchers] = useState<IPitcherObj[] | null>(null);
  const [isBatter, setIsBatter] = useState<boolean>(true);

  useEffect(() => {
    const {
      params: { id },
    } = match;
    const fetchTeamInfo = async (id: number) => {
      try {
        const { data: teamInfo } = await apis.fetchTeamInfo(id);
        setTeamInfo(teamInfo);
        const {
          data: { total: batters },
        } = await apis.fetchTeamPlayerBatterStat(id);
        const {
          data: { total: pitchers },
        } = await apis.fetchTeamPlayerPitcherStat(id);
        batters.sort((a: any, b: any) => b.AVG - a.AVG);
        setBatters(batters);
        pitchers.sort((a: any, b: any) => a.ERA - b.ERA);
        setPitchers(pitchers);
      } catch (e) {
        console.log(e);
      }
    };
    fetchTeamInfo(parseInt(id));
  }, []);

  const handleIsBatter = () => {
    setIsBatter((isBatter) => !isBatter);
  };

  return (
    <div>
      {teamInfo === null || batters === null || pitchers === null ? (
        <div>Loading ...</div>
      ) : (
        <TeamsPresenter
          teamInfo={teamInfo[0]}
          batters={batters}
          pitchers={pitchers}
          isBatter={isBatter}
          handleIsBatter={handleIsBatter}
        />
      )}
    </div>
  );
};

export default TeamsContainer;
