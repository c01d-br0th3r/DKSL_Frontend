import React from "react";
import styled from "styled-components";
import { IBatterStatObj, IPitcherObj } from "../../interfaces/stat";
import { ITeamInfo } from "../../interfaces/team";
import { Link } from "react-router-dom";

interface IProps {
  teamInfo: ITeamInfo;
  batters: IBatterStatObj[];
  pitchers: IPitcherObj[];
  isBatter: boolean;
  handleIsBatter: () => void;
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

const Rank = styled.td`
  color: ${(props) =>
    props.id === "1"
      ? "#C3A935"
      : props.id === "2"
      ? "#BABABA"
      : props.id === "3"
      ? "#C77B30"
      : "#000"};
  font-weight: ${(props) =>
    props.id === "1" || props.id === "2" || props.id === "3" ? "700" : "400"};
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
            <TableWrapper>
              <Table>
                <tbody>
                  <tr>
                    <td>랭킹</td>
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
                  {batters.map((b, i) => (
                    <tr key={b.playerId}>
                      <Rank id={`${i + 1}`}>{i + 1}</Rank>
                      <td>
                        <Link to={`/stat/${b.playerId}`}>{b.playerName}</Link>
                      </td>
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
                  <tr>
                    <td>랭킹</td>
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
                  {pitchers.map((p, i) => (
                    <tr key={p.playerId}>
                      <Rank id={`${i + 1}`}>{i + 1}</Rank>
                      <td>
                        <Link to={`/stat/${p.playerId}`}>{p.playerName}</Link>
                      </td>
                      <td>{p.ERA && p.ERA.toFixed(2)}</td>
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
    </div>
  );
};

export default TeamsPresenter;
