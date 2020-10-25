import React, { useState, useEffect } from "react";
import { IPlayerInfo } from "../../interfaces/stat";
import styled from "styled-components";
import { Link } from "react-router-dom";

let dataPerPage = 30;

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
    padding-top: 12px;
    border-bottom: 1px solid #f2f2f2;
  }
`;

const Pagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 10px 0;
`;

const Button: any = styled.button`
  all: unset;
  font-weight: 600;
  color: ${(props: any) => (props.select ? "#2450aa" : "#999")};
`;

const SLink = styled(Link)`
  width: 100%;
`;

const SearchPresenter: React.FC<ISearch> = ({ player }) => {
  const [term, setTerm] = useState<string>("");
  const [filtered, setFiltered] = useState<IPlayerInfo[] | null>(null);
  const [page, setPage] = useState<number>(0);
  const [pageData, setPageData] = useState<IPlayerInfo[] | null>(null);
  const [totalPage, setTotalPage] = useState<number>(0);

  useEffect(() => {
    setTotalPage(Math.ceil(player.length / dataPerPage));
    setPage(0);
  }, []);

  useEffect(() => {
    const start = page * dataPerPage;
    const end = page * dataPerPage + dataPerPage;
    if (!filtered) {
      setPageData(player.slice(start, end));
    } else {
      setPageData(filtered.slice(start, end));
    }
  }, [page]);

  const handlePageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setPage(parseInt(target.innerText) - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const handleRightArrowClick = () => {
    if (page === totalPage - 1) return false;
    setPage((page) => page + 1);
  };

  const handleLeftArrowClick = () => {
    if (page === 0) return false;
    setPage((page) => page - 1);
  };

  const handleClick = () => {
    const start = page * dataPerPage;
    const end = page * dataPerPage + dataPerPage;
    if (term === "") {
      setFiltered(null);
      setPage(0);
      setTotalPage(Math.ceil(player.length / dataPerPage));
      setPageData(player.slice(start, end));
      return -1;
    }
    const filtered = player.filter(
      (p) =>
        p.playerName.includes(term) ||
        p.teamName.includes(term) ||
        p.backNum == parseInt(term)
    );
    setPage(0);
    setTotalPage(Math.ceil(filtered.length / dataPerPage));
    setFiltered(filtered);
    setPageData(filtered.slice(start, end));
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
        <div></div>
        {pageData === null ? (
          <div>Loading...</div>
        ) : (
          <TableWrapper>
            <Table>
              <tbody>
                <tr>
                  <td>선수명</td>
                  <td>소속</td>
                  <td>등번호</td>
                </tr>
                {pageData.map((p) => (
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
        {totalPage !== 0 && (
          <Pagination>
            <div onClick={handleLeftArrowClick}>{`<`}</div>
            {[...Array(totalPage)].map((t, i) => {
              if (page < 3) {
                if (i <= 4) {
                  return (
                    <Button
                      onClick={handlePageClick}
                      key={i}
                      select={page === i}
                    >
                      {i + 1}
                    </Button>
                  );
                }
              } else if (page <= totalPage - 3) {
                if (i >= page - 2 && i <= page + 2)
                  return (
                    <Button
                      onClick={handlePageClick}
                      key={i}
                      select={page === i}
                    >
                      {i + 1}
                    </Button>
                  );
              } else {
                if (i >= totalPage - 5 && i <= totalPage - 1)
                  return (
                    <Button
                      onClick={handlePageClick}
                      key={i}
                      select={page === i}
                    >
                      {i + 1}
                    </Button>
                  );
              }
            })}
            <div onClick={handleRightArrowClick}>{`>`}</div>
          </Pagination>
        )}
      </div>
    </Wrapper>
  );
};

export default SearchPresenter;
