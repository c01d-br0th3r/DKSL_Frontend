import React, { useState, useEffect } from "react";
import { IPlayerInfo } from "../../interfaces/stat";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface ISearch {
  player: IPlayerInfo[];
}

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const InputForm = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  border: 2px solid #c2c2c2;
  font-size: 18px;
  padding: 5px 10px;
  margin-right: 15px;
`;

const Btn = styled.div`
  opacity: 0.7;
  font-size: 18px;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow: scroll;
`;

const Table = styled.table`
  width: 100%;
  tr:nth-child(1) {
    background-color: #2450aa;
    color: #fff;
    font-weight: 600;
    white-space: nowrap;
  }
  td {
    text-align: center;
    padding: 10px;
    border-bottom: 1px solid #f2f2f2;
  }
`;

const SLink = styled(Link)`
  width: 100%;
`;

const SearchPresenter: React.FC<ISearch> = ({ player }) => {
  const [term, setTerm] = useState<string>("");
  const [filtered, setFiltered] = useState<IPlayerInfo[] | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };
  const handleClick = () => {
    if (term === "") {
      setFiltered(null);
      return -1;
    }
    const filtered = player.filter((p) => p.playerName.includes(term));
    setFiltered(filtered);
  };
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") handleClick();
  };
  return (
    <Wrapper>
      <Title>선수 정보</Title>
      <InputForm>
        <Input
          type="text"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <Btn onClick={handleClick}>
          <i className="fas fa-search"></i>
        </Btn>
      </InputForm>
      <div>
        {filtered === null ? (
          <div>검색어를 입력하세용</div>
        ) : (
          <TableWrapper>
            <Table>
              <tbody>
                <tr>
                  <td>선수명</td>
                  <td>소속</td>
                  <td>등번호</td>
                </tr>
                {filtered.map((p) => (
                  <tr key={p.playerId}>
                    <td>
                      <SLink to={`/stat/${p.playerId}`}>{p.playerName}</SLink>
                    </td>
                    <td>
                      <SLink to={`/stat/${p.playerId}`}>{p.teamName}</SLink>
                    </td>
                    <td>
                      <SLink to={`/stat/${p.playerId}`}>{p.backNum}</SLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        )}
      </div>
    </Wrapper>
  );
};

export default SearchPresenter;
