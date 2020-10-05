import React, { useState, useEffect, ChangeEvent } from "react";
import apis from "../../apis";
import LeaguePresenter from "./LeaguePresenter";
import { ITeamInfo } from "../../interfaces/team";

interface ILeague {
  leagueId: number;
  leagueName: string;
}

const LeagueContainer: React.FC<{}> = () => {
  const [league, setLeague] = useState<ILeague[] | null>(null);
  const [leagueId, setLeagueId] = useState<number>(0);
  const [teams, setTeams] = useState<ITeamInfo[] | null>(null);
  useEffect(() => {
    const fetchLeague = async () => {
      try {
        const { data: league } = await apis.fetchLeague();
        setLeague(league);
      } catch (e) {
        console.log(e);
      }
    };
    fetchLeague();
  }, []);
  useEffect(() => {
    const fetchTeamsbyLeagueId = async () => {
      if (leagueId > 0) {
        try {
          const { data: teams } = await apis.fetchTeamsByLeagueId(leagueId);
          setTeams(teams);
        } catch (e) {
          console.log(e);
        }
      } else if (leagueId === 0) {
        setTeams(null);
      }
    };
    fetchTeamsbyLeagueId();
  }, [leagueId]);
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLeagueId(parseInt(e.target.value));
  };
  return (
    <div>
      {league === null ? (
        <div>Loading ... </div>
      ) : (
        <div>
          <select onChange={handleChange} defaultValue="0">
            <option value="0">리그 선택</option>
            {league.map((l) => (
              <option value={l.leagueId} key={l.leagueId}>
                {l.leagueName}
              </option>
            ))}
          </select>
          {leagueId === 0 ? (
            <div></div>
          ) : (
            <div>
              {teams === null ? (
                <div>Loading...</div>
              ) : (
                <LeaguePresenter teams={teams} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LeagueContainer;
