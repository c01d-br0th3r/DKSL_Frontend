import React from "react";
import { ILive } from "../interfaces/live";
import styled from "styled-components";

interface IProps {
  live: ILive;
}

const Away = styled.div`
  padding-bottom: 20px;
`;

const Home = styled.div`
  padding-bottom: 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: 700;
  padding: 20px 0;
  padding-left: 10px;
`;

const Table = styled.table`
  width: 100%;
  td {
    text-align: center;
    padding: 10px 0;
    padding-top: 13px;
    font-size: 13px;
    border-bottom: 1px solid #f2f2f2;
  }
`;

const TitleTr = styled.tr`
  background-color: #2450aa;
  color: #fff;
  font-weight: 500;
  font-size: 12px;
`;

const Pinch = styled.span`
  font-size: 10px;
  opacity: 0.7;
`;

const Record: React.FC<IProps> = ({ live }) => {
  return (
    <div>
      <Away>
        <Name>{live.away.name}</Name>
        <Table>
          <tbody>
            <TitleTr>
              <td></td>
              <td>타수</td>
              <td>안타</td>
              <td>2루타</td>
              <td>3루타</td>
              <td>타점</td>
              <td>득점</td>
              <td>홈런</td>
              <td>볼넷</td>
            </TitleTr>
            {live.away.batterInfo.map((info) => {
              return info.batters.map((batter, index) => (
                <tr key={index}>
                  <td>
                    {batter.name}{" "}
                    {info.now !== 0 && index !== 0 && <Pinch>대</Pinch>}
                  </td>
                  <td>{batter.stat.AB}</td>
                  <td>{batter.stat.H}</td>
                  <td>{batter.stat._2B}</td>
                  <td>{batter.stat._3B}</td>
                  <td>{batter.stat.RBI}</td>
                  <td>{batter.stat.R}</td>
                  <td>{batter.stat.HR}</td>
                  <td>{batter.stat.BB + batter.stat.HBP}</td>
                </tr>
              ));
            })}
          </tbody>
        </Table>
        <Table>
          <tbody>
            <TitleTr>
              <td></td>
              <td>이닝</td>
              <td>자책</td>
              <td>볼넷</td>
              <td>삼진</td>
              <td>피안타</td>
              <td>투구수</td>
            </TitleTr>
            {live.away.pitcherInfo.map((pitcher, index) => (
              <tr key={index}>
                <td>{pitcher.name}</td>
                <td>{pitcher.stat.IP}</td>
                <td>{pitcher.stat.ER}</td>
                <td>{pitcher.stat.BB}</td>
                <td>{pitcher.stat.SO}</td>
                <td>{pitcher.stat.H}</td>
                <td>{pitcher.stat.NP}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Away>
      <Home>
        <Name>{live.home.name}</Name>
        <Table>
          <tbody>
            <TitleTr>
              <td></td>
              <td>타수</td>
              <td>안타</td>
              <td>2루타</td>
              <td>3루타</td>
              <td>타점</td>
              <td>득점</td>
              <td>홈런</td>
              <td>볼넷</td>
            </TitleTr>
            {live.home.batterInfo.map((info) => {
              return info.batters.map((batter, index) => (
                <tr key={index}>
                  <td>
                    {batter.name}{" "}
                    {info.now !== 0 && index !== 0 && <Pinch>대</Pinch>}
                  </td>
                  <td>{batter.stat.AB}</td>
                  <td>{batter.stat.H}</td>
                  <td>{batter.stat._2B}</td>
                  <td>{batter.stat._3B}</td>
                  <td>{batter.stat.RBI}</td>
                  <td>{batter.stat.R}</td>
                  <td>{batter.stat.HR}</td>
                  <td>{batter.stat.BB + batter.stat.HBP}</td>
                </tr>
              ));
            })}
          </tbody>
        </Table>
        <Table>
          <tbody>
            <TitleTr>
              <td></td>
              <td>이닝</td>
              <td>자책</td>
              <td>볼넷</td>
              <td>삼진</td>
              <td>피안타</td>
              <td>투구수</td>
            </TitleTr>
            {live.home.pitcherInfo.map((pitcher, index) => (
              <tr key={index}>
                <td>{pitcher.name}</td>
                <td>{pitcher.stat.IP}</td>
                <td>{pitcher.stat.ER}</td>
                <td>{pitcher.stat.BB}</td>
                <td>{pitcher.stat.SO}</td>
                <td>{pitcher.stat.H}</td>
                <td>{pitcher.stat.NP}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Home>
    </div>
  );
};

export default Record;
