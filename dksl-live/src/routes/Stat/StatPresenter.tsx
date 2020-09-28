import React from "react";
import { IStat } from "../../interfaces/stat";
import styled from "styled-components";

interface IStatProps {
  stat: IStat;
}

const Header = styled.div`
  padding: 15px 20px;
  background-color: #2450aa;
  color: #fff;
`;

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

const Info = styled.div`
  width: 100%;
  text-align: left;
`;

const Container = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const PlayerInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Total = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Record = styled.div`
  width: 100%;
  font-size: 16px;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow: scroll;
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

const StatPresenter: React.FC<IStatProps> = ({ stat }) => {
  console.log(stat);
  const { batter_stat: s, player_info: i, teamInfo: t } = stat;
  const handleClick = () => {
    window.history.back();
  };
  return (
    <>
      <Header>
        <div onClick={handleClick}>뒤로 가기</div>
      </Header>
      <Container>
        <PlayerInfo>
          <Img>stat.img</Img>
          <Info>
            <TeamName>{t.teamName}</TeamName>
            <Name>
              {i.playerName} No. {i.backNum}
            </Name>
            <Birth>{i.birthday.substring(0, 10).split("-").join("/")}</Birth>
          </Info>
        </PlayerInfo>
        <Record>
          <Total>선수 기록</Total>
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
        </Record>
      </Container>
    </>
  );
};

export default StatPresenter;
