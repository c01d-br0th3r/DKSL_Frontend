import axios from "axios";

const api = axios.create({
  baseURL: "http://49.50.172.42:3001/",
});

const socketServer = axios.create({
  baseURL: "http://49.50.172.42:3002/",
});

const apis = {
  fetchLeague: () => api.get(`getLeagues`),
  fetchLeagueTeams: (id: number) => api.get(`getLeagueTeams/${id}`),
  fetchTeamPlayers: (id: number) => api.get(`getTeamPlayers/${id}`),
  fetchPlayerStat: (id: number) => api.get(`getPlayerStat/${id}`),
  fetchTeamInfo: (id: number) => api.get(`getTeamInfo/${id}`),
  fetchAllPlayers: () => api.get(`getAllPlayerInfo`),
  fetchLiveGames: () => socketServer.get(`getLiveGames`),
  fetchTeamsByLeagueId: (id: number) => api.get(`getLeagueTeams/${id}`),
  fetchAllPlayersBatterStat: () => api.get(`getAllPlayerBatterStat`),
  fetchAllPlayersPithcherStat: () => api.get(`getAllPlayerPitcherStat`),
  fetchTeamPlayerBatterStat: (id: number) =>
    api.get(`getTeamPlayerBatterStat/${id}`),
  fetchTeamPlayerPitcherStat: (id: number) =>
    api.get(`getTeamPlayerPitcherStat/${id}`),
};

export default apis;
