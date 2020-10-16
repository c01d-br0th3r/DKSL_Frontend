import React from "react";
import styled from "styled-components";
import { IPlayerInfo } from "../../interfaces/stat";
import { ITeamInfo } from "../../interfaces/team";

interface IProps {
  teamInfo: ITeamInfo;
  players: IPlayerInfo[];
}

const TableWrapper = styled.div`
  width: 100%;
  overflow: scroll;
  margin-bottom: 10px;
`;

const Table = styled.table`
  width: 100%;
  td {
    text-align: center;
    padding: 10px 15px;
    padding-top: 12px;
    white-space: nowrap;
    font-weight: 500;
  }
  tr:nth-child(2n + 1) {
    background-color: #f4f4f4;
  }
  tr:nth-child(1) {
    background-color: #2450aa;
    color: #fff;
    font-weight: 600;
  }
`;

const TeamsPresenter: React.FC<IProps> = ({ teamInfo, players }) => {
  console.log(teamInfo, players);
  return (
    <div>
      <div>
        <div>{teamInfo.teamName}</div>
        <div>창단: {teamInfo.foundingYear}</div>
        <div>총 {players.length}명</div>
      </div>
      <div></div>
    </div>
  );
};

export default TeamsPresenter;
