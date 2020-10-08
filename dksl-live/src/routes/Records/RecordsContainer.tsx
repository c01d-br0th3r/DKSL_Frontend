import React, { useState, useEffect } from "react";
import apis from "../../apis";
import RecordsPresenter from "./RecordsPresenter";
import { IPlayerInfo } from "../../interfaces/stat";

const RecordsContainer: React.FC<{}> = () => {
  useEffect(() => {
    const fetchAllPlayersStat = async () => {
      try {
        const { data: batter } = await apis.fetchAllPlayersBatterStat();
        const { data: pitcher } = await apis.fetchAllPlayersPithcherStat();
        console.log(batter);
        console.log(pitcher);
      } catch (e) {
        console.log(e);
      }
    };
    fetchAllPlayersStat();
  }, []);
  return (
    <div>
      <RecordsPresenter />
    </div>
  );
};

export default RecordsContainer;
