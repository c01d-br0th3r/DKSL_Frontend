import React, { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import apis from "../../apis";
import RecordsPresenter from "./RecordsPresenter";
import { IBatterStatObj, IPitcherObj } from "../../interfaces/stat";

interface IBatters {
  [year: number]: IBatterStatObj[];
}

interface IPitchers {
  [year: number]: IPitcherObj[];
}

const RecordsContainer: React.FC<{}> = () => {
  const [batters, setBatters] = useState<IBatterStatObj[] | null>(null);
  const [pitchers, setPitchers] = useState<IPitcherObj[] | null>(null);
  const [years, setYears] = useState<number[] | null>(null);
  const [
    batterPlayersWithYear,
    setBatterPlayerWithYear,
  ] = useState<IBatters | null>(null);
  const [
    pitcherPlayersWithYear,
    setPitcherPlayerWithYear,
  ] = useState<IPitchers | null>(null);
  const [isBatter, setIsBatter] = useState<boolean>(true);
  const [currentYear, setCurrentYear] = useState<number>(2019);
  const [sortBKey, setBSortKey] = useState<string>("AVG");
  const [sortPKey, setPSortKey] = useState<string>("W");
  const [sortBatter, setSortBatter] = useState<IBatterStatObj[] | null>(null);
  const [sortPitcher, setSortPitcher] = useState<IPitcherObj[] | null>(null);
  useEffect(() => {
    const fetchAllPlayersStat = async () => {
      try {
        let _years = new Set();
        const { data: batters } = await apis.fetchAllPlayersBatterStat();
        const { data: pitchers } = await apis.fetchAllPlayersPithcherStat();
        setBatters(batters);
        setPitchers(pitchers);
        batters.forEach((b: IBatterStatObj) => {
          _years.add(b.year);
        });
        let years = Array.from(_years) as number[];
        setYears(years);
      } catch (e) {
        console.log(e);
      }
    };
    fetchAllPlayersStat();
  }, []);

  useEffect(() => {
    if (years && batters && pitchers) {
      let batterPlayersWithYear: any = {};
      years.forEach((year) => {
        let batterArr = batters.filter(
          (batter) => batter.year === year && batter.PA >= 40
        );
        batterPlayersWithYear[year] = batterArr;
      });
      let pitcherPlayersWithYear: any = {};
      years.forEach((year) => {
        let pitcherArr = pitchers.filter((pitcher) => pitcher.year === year);
        pitcherPlayersWithYear[year] = pitcherArr;
      });
      setBatterPlayerWithYear(batterPlayersWithYear);
      setPitcherPlayerWithYear(pitcherPlayersWithYear);
    }
  }, [years]);

  useEffect(() => {
    if (batterPlayersWithYear && pitcherPlayersWithYear) {
      let newBatters = batterPlayersWithYear[currentYear].sort(
        (a: any, b: any) => b[sortBKey] - a[sortBKey]
      );
      setSortBatter([...newBatters]);
      if (sortPKey === "ERA") {
        let newPithers = pitcherPlayersWithYear[currentYear].sort(
          (a: any, b: any) => a[sortPKey] - b[sortPKey]
        );
        setSortPitcher([...newPithers]);
      } else {
        let newPithers = pitcherPlayersWithYear[currentYear].sort(
          (a: any, b: any) => b[sortPKey] - a[sortPKey]
        );
        setSortPitcher([...newPithers]);
      }
    }
  }, [
    batterPlayersWithYear,
    pitcherPlayersWithYear,
    currentYear,
    sortBKey,
    sortPKey,
  ]);

  useEffect(() => {
    setBSortKey("AVG");
    setPSortKey("W");
  }, [currentYear]);

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentYear(parseInt(e.target.value));
  };

  const handleBatterKey = (e: any) => {
    let key = e.target.innerText;
    if (key === "2B" || key === "3B") {
      key = `_${key}`;
    }
    if (key === "선수명") return false;
    setBSortKey(key);
  };

  const handlePitcherKey = (e: any) => {
    let key = e.target.innerText;
    if (key === "선수명") return false;
    setPSortKey(key);
  };

  const handleIsBatter = () => {
    setIsBatter((isBatter) => !isBatter);
  };

  return (
    <div>
      {years === null || sortBatter === null || sortPitcher === null ? (
        <div>Loading...</div>
      ) : (
        <RecordsPresenter
          allYears={years}
          year={currentYear}
          batters={sortBatter}
          pitchers={sortPitcher}
          isBatter={isBatter}
          handleYearChange={handleYearChange}
          handleBatterKey={handleBatterKey}
          handlePitcherKey={handlePitcherKey}
          handleIsBatter={handleIsBatter}
        />
      )}
    </div>
  );
};

export default RecordsContainer;
