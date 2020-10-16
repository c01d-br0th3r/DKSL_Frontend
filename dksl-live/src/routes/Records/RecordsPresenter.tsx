import React, { ChangeEvent } from "react";
import { IBatterStatObj, IPitcherObj } from "../../interfaces/stat";
import styled from "styled-components";
import { Link } from "react-router-dom";
import BatterTable from "../../components/BatterTable";
import PitcherTable from "../../components/PitcherTable";

interface IPresenter {
  allYears: number[];
  year: number;
  batters: IBatterStatObj[];
  pitchers: IPitcherObj[];
  isBatter: boolean;
  handleYearChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleBatterKey: (e: any) => void;
  handlePitcherKey: (e: any) => void;
  handleIsBatter: () => void;
}

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 18px;
  font-weight: 600;
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 15px;
  font-weight: 600;
`;

const Notice = styled.div`
  padding: 5px;
  font-weight: 600;
  font-size: 14px;
  color: #2450aa;
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

const RecordsPresenter: React.FC<IPresenter> = ({
  allYears,
  year,
  batters,
  pitchers,
  isBatter,
  handleYearChange,
  handleBatterKey,
  handlePitcherKey,
  handleIsBatter,
}) => {
  return (
    <div>
      <div>
        <Select onChange={handleYearChange} defaultValue={allYears[1]}>
          {allYears.map((y) => (
            <option value={y} key={y}>
              {y}
            </option>
          ))}
        </Select>
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
          <BatterTable
            batters={batters.slice(0, 40)}
            handleClick={handleBatterKey}
          />
        ) : (
          <PitcherTable
            pitchers={pitchers.slice(0, 40)}
            handleClick={handlePitcherKey}
          />
        )}
      </div>
      <Notice>상위 40등까지 조회할 수 있습니다.</Notice>
      <Notice>선수 이름 클릭 시 상세 정보 페이지로 이동합니다.</Notice>
    </div>
  );
};

export default RecordsPresenter;
