import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  console.log(props);
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
  return (
    <>
      <Wrapper>
        <div className="hamburger">
          <i className="fab fa-accessible-icon" />
        </div>
        <div>DKSL</div>
        <div>
          <i className="fas fa-user"></i>
        </div>
      </Wrapper>
      <Menu className="menu hide">
        <List>Home</List>
        <List>리그</List>
        <List>선수 정보</List>
        <List>문자 중계</List>
      </Menu>
    </>
  );
});
