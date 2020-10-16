import React from "react";
import styled from "styled-components";
import { IPitcherObj } from "../interfaces/stat";
import { Link } from "react-router-dom";

interface IProps {
  pitchers: IPitcherObj[];
  handleClick?: (e: any) => void;
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

const PitcherTable: React.FC<IProps> = ({ pitchers, handleClick }) => {
  return (
    <div>
      <TableWrapper>
        <Table>
          <tbody>
            <tr onClick={handleClick}>
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
                <td>{p.IP}</td>
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
    </div>
  );
};

export default PitcherTable;
