import React from "react";
import { IStat } from "../../interfaces/stat";

interface IStatProps {
  stat: IStat;
}

const StatPresenter: React.FC<IStatProps> = ({ stat }) => {
  return (
    <div>
      <div>통산 기록</div>
      <div>AVG: {stat.total.AVG}</div>
      <div>G: {stat.total.G}</div>
      <div>PA: {stat.total.PA}</div>
      <div>AB: {stat.total.AB}</div>
      <div>R: {stat.total.R}</div>
      <div>H: {stat.total.H}</div>
      <div>2B: {stat.total._2B}</div>
      <div>3B: {stat.total._3B}</div>
      <div>HR: {stat.total.HR}</div>
      <div>TB: {stat.total.TB}</div>
      <div>RBI: {stat.total.RBI}</div>
      <div>SB: {stat.total.SB}</div>
      <div>CS: {stat.total.CS}</div>
      <div>SAC: {stat.total.SAC}</div>
      <div>SF: {stat.total.SF}</div>
      <div>BB: {stat.total.BB}</div>
      <div>IBB: {stat.total.IBB}</div>
      <div>HBP: {stat.total.HBP}</div>
      <div>SO: {stat.total.SO}</div>
      <div>GDP: {stat.total.GDP}</div>
      <div>SLG: {stat.total.SLG}</div>
      <div>OBP: {stat.total.OBP}</div>
      <div>OPS: {stat.total.OPS}</div>
    </div>
  );
};

export default StatPresenter;
