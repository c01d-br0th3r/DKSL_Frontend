import React, { ChangeEvent, MouseEvent } from "react";
import { IBatterStatObj, IPitcherObj } from "../../interfaces/stat";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

const Notice = styled.div`
  padding: 10px 15px;
  font-size: 14px;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow: scroll;
  margin-bottom: 20px;
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
  tr:nth-child(1) {
    background-color: #2450aa;
    color: #fff;
    font-weight: 600;
  }
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
        <Select onChange={handleYearChange} defaultValue={allYears[-1]}>
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
          <TableWrapper>
            <Table>
              <tbody>
                <tr onClick={handleBatterKey}>
                  <td>선수명</td>
                  <td>AVG</td>
                  <td>G</td>
                  <td>PA</td>
                  <td>AB</td>
                  <td>R</td>
                  <td>H</td>
                  <td>2B</td>
                  <td>3B</td>
                  <td>HR</td>
                  <td>TB</td>
                  <td>RBI</td>
                  <td>SB</td>
                  <td>CS</td>
                  <td>SAC</td>
                  <td>SF</td>
                  <td>BB</td>
                  <td>IBB</td>
                  <td>HBP</td>
                  <td>SO</td>
                  <td>GDP</td>
                  <td>SLG</td>
                  <td>OBP</td>
                  <td>OPS</td>
                </tr>
                {batters.map((b) => (
                  <tr key={b.playerId}>
                    <td>{b.playerName}</td>
                    <td>{b.AVG && b.AVG.toFixed(3)}</td>
                    <td>{b.G}</td>
                    <td>{b.PA}</td>
                    <td>{b.AB}</td>
                    <td>{b.R}</td>
                    <td>{b.H}</td>
                    <td>{b._2B}</td>
                    <td>{b._3B}</td>
                    <td>{b.HR}</td>
                    <td>{b.TB}</td>
                    <td>{b.RBI}</td>
                    <td>{b.SB}</td>
                    <td>{b.CS}</td>
                    <td>{b.SAC}</td>
                    <td>{b.SF}</td>
                    <td>{b.BB}</td>
                    <td>{b.IBB}</td>
                    <td>{b.HBP}</td>
                    <td>{b.SO}</td>
                    <td>{b.GDP}</td>
                    <td>{b.SLG && b.SLG.toFixed(3)}</td>
                    <td>{b.OBP && b.OBP.toFixed(3)}</td>
                    <td>{b.OPS && b.OPS.toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        ) : (
          <TableWrapper>
            <Table>
              <tbody>
                <tr onClick={handlePitcherKey}>
                  <td>선수명</td>
                  <td>ERA</td>
                  <td>G</td>
                  <td>W</td>
                  <td>L</td>
                  <td>HLD</td>
                  <td>SV</td>
                  <td>IP</td>
                  <td>H</td>
                  <td>AB</td>
                  <td>BB</td>
                  <td>BK</td>
                  <td>Batters</td>
                  <td>ER</td>
                  <td>HBP</td>
                  <td>HR</td>
                  <td>K</td>
                  <td>NP</td>
                  <td>R</td>
                  <td>SAC</td>
                  <td>SF</td>
                  <td>WP</td>
                </tr>
                {pitchers.map((p) => (
                  <tr key={p.playerId}>
                    <td>{p.playerName}</td>
                    <td>{p.ERA.toFixed(2)}</td>
                    <td>{p.G}</td>
                    <td>{p.W}</td>
                    <td>{p.L}</td>
                    <td>{p.HLD}</td>
                    <td>{p.SV}</td>
                    <td>{p.IP && Math.floor(p.IP / 3)}</td>
                    <td>{p.H}</td>
                    <td>{p.AB}</td>
                    <td>{p.BB}</td>
                    <td>{p.BK}</td>
                    <td>{p.Batters}</td>
                    <td>{p.ER}</td>
                    <td>{p.HBP}</td>
                    <td>{p.HR}</td>
                    <td>{p.K}</td>
                    <td>{p.NP}</td>
                    <td>{p.R}</td>
                    <td>{p.SAC}</td>
                    <td>{p.SF}</td>
                    <td>{p.WP}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        )}
      </div>
    </div>
  );
};

export default RecordsPresenter;
