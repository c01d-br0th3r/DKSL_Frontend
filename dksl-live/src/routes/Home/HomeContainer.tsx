import React, { useState, useEffect } from "react";
import HomePresenter from "./HomePresenter";
import apis from "../../apis";
import { INowLive } from "../../interfaces/nowLive";

const HomeContainer: React.FC<{}> = () => {
  const [live, setLive] = useState<INowLive[] | null>(null);
  useEffect(() => {
    const fetchLiveGames = async () => {
      try {
        const { data: live } = await apis.fetchLiveGames();
        setLive(live);
      } catch (e) {
        console.log(e);
      }
    };
    fetchLiveGames();
  }, []);
  return (
    <div>
      {live === null ? <div>Loading...</div> : <HomePresenter live={live} />}
    </div>
  );
};

export default HomeContainer;
