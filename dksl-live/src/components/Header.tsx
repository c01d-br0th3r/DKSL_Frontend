import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #2450aa;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
`;

const Menu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #2450aa;
  font-weight: 500;
  display: none;
  padding: 10px 20px;
  color: #fff;
`;

const List = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  padding-top: 12px;
  border-bottom: 1px solid #d2d2d2;
  &:last-child {
    border: none;
  }
`;

export default withRouter((props) => {
  useEffect(() => {
    const handleClick = () => {
      if (menu.classList.contains("hide")) {
        menu.classList.remove("hide");
        menu.style.display = "block";
      } else {
        menu.classList.add("hide");
        menu.style.display = "none";
      }
    };
    const menu: HTMLDivElement = document.querySelector(
      ".menu"
    ) as HTMLDivElement;
    const hamburger: HTMLDivElement = document.querySelector(
      ".hamburger"
    ) as HTMLDivElement;
    hamburger.addEventListener("click", handleClick);
    return () => {
      menu.removeEventListener("click", handleClick);
    };
  }, []);
  const handleButtonClick = () => {
    const menu: HTMLDivElement = document.querySelector(
      ".menu"
    ) as HTMLDivElement;
    if (menu.classList.contains("hide")) {
      menu.classList.remove("hide");
      menu.style.display = "block";
    } else {
      menu.classList.add("hide");
      menu.style.display = "none";
    }
  };
  return (
    <>
      <Wrapper>
        <div className="hamburger">
          <i className="fas fa-bars" />
        </div>
        <Link to="/">
          <div>DKSL</div>
        </Link>
        <div>
          <i className="fas fa-user"></i>
        </div>
      </Wrapper>
      <Menu className="menu hide" onClick={handleButtonClick}>
        <List>
          <Link to="/">Home</Link>
        </List>
        <List>
          <Link to="/league">리그</Link>
        </List>
        <List>
          <Link to="/records">기록실</Link>
        </List>
        <List>
          <Link to="/search">선수 정보</Link>
        </List>
        <List>문자 중계</List>
      </Menu>
    </>
  );
});
