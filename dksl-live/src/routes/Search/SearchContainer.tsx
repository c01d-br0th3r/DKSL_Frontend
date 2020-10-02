import React, { useState, useEffect } from "react";
import SearchPresenter from "./SearchPresenter";
import apis from "../../apis";
import { IPlayerInfo } from "../../interfaces/stat";

const SearchContainer: React.FC<{}> = () => {
  const [player, setPlayer] = useState<IPlayerInfo[] | null>(null);
  useEffect(() => {
    const fetchAllPlayers = async () => {
      try {
        const { data: player } = await apis.fetchAllPlayers();
        setPlayer(player);
      } catch (e) {
        console.log(e);
      }
    };
    fetchAllPlayers();
  }, []);
  return (
    <div>
      {player === null ? (
        <div>Loading...</div>
      ) : (
        <SearchPresenter player={player} />
      )}
    </div>
  );
};

export default SearchContainer;
