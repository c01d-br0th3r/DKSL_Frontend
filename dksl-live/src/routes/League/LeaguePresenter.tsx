import React, { useState } from "react";
import { ITeamInfo } from "../../interfaces/team";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface IProps {
  teams: ITeamInfo[];
}

const List = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  font-weight: 500;
  border-bottom: 1px solid #f2f2f2;
`;

const LeaguePresenter: React.FC<IProps> = ({ teams }) => {
  console.log(teams);
  return (
    <div>
      <div>
        {teams.map((team) => (
          <List key={team.teamId}>
            <Link to={`/teams/${team.teamId}`}>{team.teamName}</Link>
          </List>
        ))}
      </div>
    </div>
  );
};

export default LeaguePresenter;
