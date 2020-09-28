import React, { useState, useEffect } from "react";
import StatPresenter from "./StatPresenter";
import { IStat } from "../../interfaces/stat";
import apis from "../../apis";
import { RouteComponentProps } from "react-router-dom";

interface MatchProps {
  id: string;
}

const StatContainer: React.FC<RouteComponentProps<MatchProps>> = ({
  match,
}) => {
  const [stat, setStat] = useState<IStat | null>(null);
  useEffect(() => {
    const fetchStat = async (id: number) => {
      const { data: stat } = await apis.fetchPlayerStat(id);
      setStat(stat);
    };
    const id = parseInt(match.params.id);
    fetchStat(id);
  }, []);
  return (
    <div>
      {stat === null ? <div>Loading...</div> : <StatPresenter stat={stat} />}
    </div>
  );
};

export default StatContainer;
