import React, { useState, useEffect, ChangeEvent } from "react";
import apis from "../../apis";
import LeaguePresenter from "./LeaguePresenter";
import { ITeamInfo } from "../../interfaces/team";
import styled from "styled-components";

interface ILeague {
  leagueId: number;
  leagueName: string;
}

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const LeagueContainer: React.FC<{}> = () => {
  const [league, setLeague] = useState<ILeague[] | null>(null);
  const [leagueId, setLeagueId] = useState<number>(1);
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
          teams.sort((a: ITeamInfo, b: ITeamInfo) => {
            if (a.teamName < b.teamName) {
              return -1;
            }
            if (a.teamName > b.teamName) {
              return 1;
            }
            return 0;
          });
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
          <Select onChange={handleChange} defaultValue="1">
            {league.map((l) => (
              <option value={l.leagueId} key={l.leagueId}>
                {l.leagueName}
              </option>
            ))}
          </Select>
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
