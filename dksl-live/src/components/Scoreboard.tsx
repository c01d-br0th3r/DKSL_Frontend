import React, { useState, useEffect } from "react";
import { ILive } from "../interfaces/live";
import styled from "styled-components";

interface IProps {
  live: ILive;
}

const ScoreContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 5px;
  background-color: #2450aa;
  color: #fff;
`;

const TeamScore = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Team = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 15px;
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  div:nth-child(1) {
    margin-bottom: 5px;
  }
`;

const Score = styled.div`
  font-size: 44px;
  font-weight: 700;
`;

const VSContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  position: relative;
`;

const Ground = styled.div`
  width: 100%;
  position: absolute;
  top: 25px;
  font-size: 12px;
  font-weight: 500;
  opacity: 0.8;
  text-align: center;
`;

const Board = styled.div`
  width: 100%;
  background-color: #1d4aa1;
  color: #fff;
  padding: 10px 5px;
  display: flex;
  justify-content: center;
  font-size: 14px;
`;

const Table = styled.table`
  width: 100%;
  text-align: center;
  td {
    padding: 5px 4px;
  }
`;

const Inning = styled.tr`
  opacity: 0.7;
  td {
    padding-bottom: 10px;
  }
`;

const TotalScore = styled.td`
  color: #7efff5;
`;

const Scoreboard: React.FC<IProps> = ({ live }) => {
  const [awayHits, setAwayHits] = useState<number>(0);
  const [homeHits, setHomeHits] = useState<number>(0);
  const [awayErr, setAwayErr] = useState<number>(0);
  const [homeErr, setHomeErr] = useState<number>(0);
  const [awayBB, setAwayBB] = useState<number>(0);
  const [homeBB, setHomeBB] = useState<number>(0);
  useEffect(() => {
    const awayBatterInfo = live.away.batterInfo;
    const homeBatterInfo = live.home.batterInfo;
    let awayHits = 0,
      homeHits = 0,
      awayErr = 0,
      homeErr = 0,
      awayBB = 0,
      homeBB = 0;
    awayBatterInfo.forEach((away) => {
      away.batters.forEach((batter) => {
        awayHits += batter.stat.H;
        awayErr += batter.stat.E;
        awayBB += batter.stat.BB;
        awayBB += batter.stat.HBP;
      });
    });
    homeBatterInfo.forEach((home) => {
      home.batters.forEach((batter) => {
        homeHits += batter.stat.H;
        homeErr += batter.stat.E;
        homeBB += batter.stat.BB;
        homeBB += batter.stat.HBP;
      });
    });
    setAwayHits(awayHits);
    setHomeHits(homeHits);
    setAwayErr(awayErr);
    setHomeErr(homeErr);
    setAwayBB(awayBB);
    setHomeBB(homeBB);
  }, [live]);
  return (
    <div>
      <ScoreContainer>
        <TeamScore>
          <Team>
            <div>{live.away.name.split(" ")[0]}</div>
            <div>{live.away.name.split(" ")[1]}</div>
          </Team>
          <Score>{live.away.totalScore}</Score>
        </TeamScore>
        <VSContainer>
          <div>VS</div>
          <Ground>{live.ground}</Ground>
        </VSContainer>
        <TeamScore>
          <Team>
            <div>{live.home.name.split(" ")[0]}</div>
            <div>{live.home.name.split(" ")[1]}</div>
          </Team>
          <Score>{live.home.totalScore}</Score>
        </TeamScore>
      </ScoreContainer>
      <Board>
        <Table>
          <tbody>
            <Inning>
              <td></td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
              <td>9</td>
              <TotalScore>R</TotalScore>
              <td>H</td>
              <td>E</td>
              <td>B</td>
            </Inning>
            <tr>
              <td>{live.away.name.split(" ")[0]}</td>
              {live.away.score.map((s, index) => (
                <td key={index}>{live.nowInning - 1 >= index ? s : ""}</td>
              ))}
              <TotalScore>{live.away.totalScore}</TotalScore>
              <td>{awayHits}</td>
              <td>{homeErr}</td>
              <td>{awayBB}</td>
            </tr>
            <tr>
              <td>{live.home.name.split(" ")[0]}</td>
              {live.home.score.map((s, index) => (
                <td key={index}>
                  {live.nowInning - 1 > index
                    ? s
                    : live.nowInning - 1 === index && live.nowTopBottom
                    ? s
                    : ""}
                </td>
              ))}
              <TotalScore>{live.home.totalScore}</TotalScore>
              <td>{homeHits}</td>
              <td>{awayErr}</td>
              <td>{homeBB}</td>
            </tr>
          </tbody>
        </Table>
      </Board>
    </div>
  );
};

export default Scoreboard;
