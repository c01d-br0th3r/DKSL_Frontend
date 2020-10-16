import React from "react";
import styled from "styled-components";
import { IBatterStatObj } from "../interfaces/stat";
import { Link } from "react-router-dom";

interface IProps {
  batters: IBatterStatObj[];
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

const BatterTable: React.FC<IProps> = ({ batters, handleClick }) => {
  return (
    <div>
      <TableWrapper>
        <Table>
          <tbody>
            <tr onClick={handleClick}>
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
    </div>
  );
};

export default BatterTable;
