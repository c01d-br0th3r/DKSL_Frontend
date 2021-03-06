import React, { useState } from "react";
import { IStat } from "../../interfaces/stat";
import styled from "styled-components";

interface IStatProps {
  stat: IStat;
}

const TeamName = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Birth = styled.div``;

const Img = styled.div`
  width: 100%;
  height: 200px;
  border: 1px solid gray;
  margin-right: 30px;
`;

const GroundWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Ground = styled.div`
  margin-top: 20px;
  width: 350px;
  height: 350px;
  position: relative;
  background: url("/images/ground.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  color: #fff;
  font-weight: 600;
  div {
    font-size: 14px;
  }
`;

const GroundImg = styled.img`
  width: 100%;
  position: relative;
`;

const Info = styled.div`
  width: 100%;
  text-align: left;
`;

const Container = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const PlayerInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Total = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin: 20px 0;
`;

const Record = styled.div`
  width: 100%;
  font-size: 16px;
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

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
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

const P = styled.div`
  position: absolute;
  top: 59%;
  left: 45%;
  color: #000;
`;
const C = styled.div`
  position: absolute;
  top: 78%;
  left: 45%;
  color: #000;
`;
const F = styled.div`
  position: absolute;
  top: 59%;
  left: 63%;
  color: #000;
`;
const S = styled.div`
  position: absolute;
  top: 45%;
  left: 56%;
  color: #000;
`;
const T = styled.div`
  position: absolute;
  top: 59%;
  left: 25%;
  color: #000;
`;
const SS = styled.div`
  position: absolute;
  top: 45%;
  left: 32%;
  color: #000;
`;
const LF = styled.div`
  position: absolute;
  top: 30%;
  left: 18%;
`;
const CF = styled.div`
  position: absolute;
  top: 23%;
  left: 45%;
`;
const RF = styled.div`
  position: absolute;
  top: 30%;
  left: 72%;
`;
const LC = styled.div`
  position: absolute;
  top: 20%;
  left: 27%;
`;
const RC = styled.div`
  position: absolute;
  top: 20%;
  left: 65%;
`;
const GO = styled.div`
  color: #000;
  position: absolute;
  bottom: 17%;
  left: 5%;
`;
const FO = styled.div`
  color: #000;
  position: absolute;
  bottom: 12%;
  left: 5%;
`;
const LO = styled.div`
  color: #000;
  position: absolute;
  bottom: 7%;
  left: 5%;
`;
const BatterName = styled.div`
  color: #000;
  position: absolute;
  bottom: 22%;
  left: 5%;
  font-weight: 600;
`;

const StatPresenter: React.FC<IStatProps> = ({ stat }) => {
  const [isBatter, setIsBatter] = useState<boolean>(true);
  const [isPitcher, setIsPitcher] = useState<boolean>(false);
  const { batter_stat: s, player_info: i, pitcher_stat: p } = stat;
  const handleBatter = () => {
    setIsBatter(true);
    setIsPitcher(false);
  };
  const handlePitcher = () => {
    setIsBatter(false);
    setIsPitcher(true);
  };
  const calcAvg = (rec: number) => {
    const total =
      s.total.P +
      s.total.C +
      s.total.FRISTBASE +
      s.total.SECONDBASE +
      s.total.THIRDBASE +
      s.total.SS +
      s.total.LF +
      s.total.CF +
      s.total.RF +
      s.total.LC +
      s.total.RC;
    return `${((rec / total) * 100).toFixed(1)}%`;
  };
  return (
    <>
      <Container>
        <PlayerInfo>
          <Img>stat.img</Img>
          <Info>
            <TeamName>{i.teamName}</TeamName>
            <Name>
              {i.playerName} No. {i.backNum}
            </Name>
            <Birth>{i.birthday.substring(0, 10).split("-").join("/")}</Birth>
          </Info>
        </PlayerInfo>
        <Record>
          <Total>선수 기록 - {isBatter ? "타자" : "투수"}</Total>
          <BtnWrapper>
            <Batter onClick={handleBatter} isOn={isBatter}>
              타자
            </Batter>
            <Pitcher onClick={handlePitcher} isOn={isPitcher}>
              투수
            </Pitcher>
          </BtnWrapper>
          {isBatter ? (
            <>
              <TableWrapper>
                <Table>
                  <tbody>
                    <tr>
                      <td>시즌</td>
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
                    <tr>
                      <td>통산</td>
                      <td>{s.total.AVG && s.total.AVG.toFixed(3)}</td>
                      <td>{s.total.G}</td>
                      <td>{s.total.PA}</td>
                      <td>{s.total.AB}</td>
                      <td>{s.total.R}</td>
                      <td>{s.total.H}</td>
                      <td>{s.total._2B}</td>
                      <td>{s.total._3B}</td>
                      <td>{s.total.HR}</td>
                      <td>{s.total.TB}</td>
                      <td>{s.total.RBI}</td>
                      <td>{s.total.SB}</td>
                      <td>{s.total.CS}</td>
                      <td>{s.total.SAC}</td>
                      <td>{s.total.SF}</td>
                      <td>{s.total.BB}</td>
                      <td>{s.total.IBB}</td>
                      <td>{s.total.HBP}</td>
                      <td>{s.total.SO}</td>
                      <td>{s.total.GDP}</td>
                      <td>{s.total.SLG && s.total.SLG.toFixed(3)}</td>
                      <td>{s.total.OBP && s.total.OBP.toFixed(3)}</td>
                      <td>{s.total.OPS && s.total.OPS.toFixed(3)}</td>
                    </tr>
                    {s.yearly.map((y) => (
                      <tr key={y.year}>
                        <td>{y.year}</td>
                        <td>{y.AVG && y.AVG.toFixed(3)}</td>
                        <td>{y.G}</td>
                        <td>{y.PA}</td>
                        <td>{y.AB}</td>
                        <td>{y.R}</td>
                        <td>{y.H}</td>
                        <td>{y._2B}</td>
                        <td>{y._3B}</td>
                        <td>{y.HR}</td>
                        <td>{y.TB}</td>
                        <td>{y.RBI}</td>
                        <td>{y.SB}</td>
                        <td>{y.CS}</td>
                        <td>{y.SAC}</td>
                        <td>{y.SF}</td>
                        <td>{y.BB}</td>
                        <td>{y.IBB}</td>
                        <td>{y.HBP}</td>
                        <td>{y.SO}</td>
                        <td>{y.GDP}</td>
                        <td>{y.SLG && y.SLG.toFixed(3)}</td>
                        <td>{y.OBP && y.OBP.toFixed(3)}</td>
                        <td>{y.OPS && y.OPS.toFixed(3)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableWrapper>
              <Total>타구 분포도</Total>
              <GroundWrapper>
                <Ground>
                  <P>{calcAvg(s.total.P)}</P>
                  <C>{calcAvg(s.total.C)}</C>
                  <F>{calcAvg(s.total.FRISTBASE)}</F>
                  <S>{calcAvg(s.total.SECONDBASE)}</S>
                  <T>{calcAvg(s.total.THIRDBASE)}</T>
                  <SS>{calcAvg(s.total.SS)}</SS>
                  <LF>{calcAvg(s.total.LF)}</LF>
                  <CF>{calcAvg(s.total.CF)}</CF>
                  <RF>{calcAvg(s.total.RF)}</RF>
                  <LC>{calcAvg(s.total.LC)}</LC>
                  <RC>{calcAvg(s.total.RC)}</RC>
                  <GO>GO: {s.total.GO}</GO>
                  <FO>FO: {s.total.FO}</FO>
                  <LO>LO: {s.total.LO}</LO>
                  <BatterName>{i.playerName}</BatterName>
                </Ground>
              </GroundWrapper>
            </>
          ) : (
            <TableWrapper>
              <Table>
                <tbody>
                  <tr>
                    <td>시즌</td>
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
                  <tr>
                    <td>통산</td>
                    <td>{p.total.ERA && p.total.ERA.toFixed(2)}</td>
                    <td>{p.total.G}</td>
                    <td>{p.total.W}</td>
                    <td>{p.total.L}</td>
                    <td>{p.total.HLD}</td>
                    <td>{p.total.SV}</td>
                    <td>{p.total.IP}</td>
                    <td>{p.total.H}</td>
                    <td>{p.total.AB}</td>
                    <td>{p.total.BB}</td>
                    <td>{p.total.BK}</td>
                    <td>{p.total.Batters}</td>
                    <td>{p.total.ER}</td>
                    <td>{p.total.HBP}</td>
                    <td>{p.total.HR}</td>
                    <td>{p.total.K}</td>
                    <td>{p.total.NP}</td>
                    <td>{p.total.R}</td>
                    <td>{p.total.SAC}</td>
                    <td>{p.total.SF}</td>
                    <td>{p.total.WP}</td>
                  </tr>
                  {p.yearly.map((y) => (
                    <tr key={y.year}>
                      <td>{y.year}</td>
                      <td>{y.ERA && y.ERA.toFixed(2)}</td>
                      <td>{y.G}</td>
                      <td>{y.W}</td>
                      <td>{y.L}</td>
                      <td>{y.HLD}</td>
                      <td>{y.SV}</td>
                      <td>{y.IP}</td>
                      <td>{y.H}</td>
                      <td>{y.AB}</td>
                      <td>{y.BB}</td>
                      <td>{y.BK}</td>
                      <td>{y.Batters}</td>
                      <td>{y.ER}</td>
                      <td>{y.HBP}</td>
                      <td>{y.HR}</td>
                      <td>{y.K}</td>
                      <td>{y.NP}</td>
                      <td>{y.R}</td>
                      <td>{y.SAC}</td>
                      <td>{y.SF}</td>

                      <td>{y.WP}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableWrapper>
          )}
        </Record>
      </Container>
    </>
  );
};

export default StatPresenter;
