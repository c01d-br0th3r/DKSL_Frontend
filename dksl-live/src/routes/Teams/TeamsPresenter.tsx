import React from "react";
import styled from "styled-components";
import { IBatterStatObj, IPitcherObj } from "../../interfaces/stat";
import { ITeamInfo } from "../../interfaces/team";
import BatterTable from "../../components/BatterTable";
import PitcherTable from "../../components/PitcherTable";

interface IProps {
  teamInfo: ITeamInfo;
  batters: IBatterStatObj[];
  pitchers: IPitcherObj[];
  isBatter: boolean;
  handleIsBatter: () => void;
  handleSortKeyB: (e: React.MouseEvent) => void;
  handleSortKeyP: (e: React.MouseEvent) => void;
}

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 15px;
  font-weight: 600;
`;

const Batter: any = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-right: 1px solid #c2c2c2;
  color: ${(props: any) => (props.isOn ? "#2450aa" : "#000")};
`;

const Pitcher: any = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${(props: any) => (props.isOn ? "#2450aa" : "#000")};
`;

const Team = styled.div`
  width: 100%;
  padding: 20px 15px;
`;

const TeamName = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Found = styled.div`
  font-size: 16px;
  font-weight: 500;
  opacity: 0.7;
`;

const TeamsPresenter: React.FC<IProps> = ({
  teamInfo,
  batters,
  pitchers,
  isBatter,
  handleIsBatter,
  handleSortKeyB,
  handleSortKeyP,
}) => {
  return (
    <div>
      <Team>
        <TeamName>{teamInfo.teamName}</TeamName>
        <Found>창단: {teamInfo.foundingYear}</Found>
      </Team>
      <div>
        <div>
          <BtnWrapper>
            <Batter onClick={handleIsBatter} isOn={isBatter}>
              타자
            </Batter>
            <Pitcher onClick={handleIsBatter} isOn={!isBatter}>
              투수
            </Pitcher>
          </BtnWrapper>
        </div>
        <div>
          {isBatter ? (
            <BatterTable batters={batters} handleClick={handleSortKeyB} />
          ) : (
            <PitcherTable pitchers={pitchers} handleClick={handleSortKeyP} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamsPresenter;
