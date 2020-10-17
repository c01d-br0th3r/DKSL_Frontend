import React from "react";
import styled from "styled-components";
import { ICount } from "../interfaces/live";
import { IBatter } from "../interfaces/batter";

interface IProps {
  count: ICount;
  base: IBatter[];
}

const Wrapper = styled.div`
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
    font-size: 16px;
  }
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
  left: 46%;
  color: #000;
`;
const T = styled.div`
  position: absolute;
  top: 59%;
  left: 30%;
  color: #000;
`;

const Ball = styled.div`
  display: flex;
  color: #000;
  position: absolute;
  bottom: 17%;
  left: 5%;
`;
const Strike = styled.div`
  display: flex;
  color: #000;
  position: absolute;
  bottom: 12%;
  left: 5%;
`;
const Out = styled.div`
  display: flex;
  color: #000;
  position: absolute;
  bottom: 7%;
  left: 5%;
`;

const SCircle = styled.div`
  width: 10px;
  height: 10px;
  background-color: #f6b93b;
  border-radius: 5px;
  margin-left: 5px;
`;

const BCircle = styled.div`
  width: 10px;
  height: 10px;
  background-color: #38ada9;
  border-radius: 5px;
  margin-left: 5px;
`;

const OCircle = styled.div`
  width: 10px;
  height: 10px;
  background-color: #eb2f06;
  border-radius: 5px;
  margin-left: 5px;
`;

const Counter = styled.div`
  width: 15px;
`;

const LiveGround: React.FC<IProps> = ({ count, base }) => {
  const isBase = (base: IBatter): boolean => {
    if (Object.keys(base).length === 0) return false;
    else return true;
  };
  const parseToArray = (cnt: number): number[] => {
    let arr = [];
    for (let i = 0; i < cnt; i++) arr.push(i);
    return arr;
  };
  console.log(count);
  return (
    <Wrapper>
      <Ground>
        <F>{isBase(base[0]) && base[0].name}</F>
        <S>{isBase(base[1]) && base[1].name}</S>
        <T>{isBase(base[2]) && base[2].name}</T>
        <Ball>
          <Counter>B: </Counter>
          {parseToArray(count.Ball).map((b) => (
            <BCircle key={b} />
          ))}
        </Ball>
        <Strike>
          <Counter>S: </Counter>
          {parseToArray(count.Strike).map((s) => (
            <SCircle key={s} />
          ))}
        </Strike>
        <Out>
          <Counter>O: </Counter>
          {parseToArray(count.Out).map((o) => (
            <OCircle key={o} />
          ))}
        </Out>
      </Ground>
    </Wrapper>
  );
};

export default LiveGround;
