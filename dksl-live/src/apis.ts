import axios from "axios";

const api = axios.create({
  baseURL: "http://49.50.172.42:3001/",
});

const apis = {
  fetchLeague: () => api.get(`getLeagues`),
  fetchLeagueTeams: (id: number) => api.get(`getLeagueTeams/${id}`),
  fetchTeamPlayers: (id: number) => api.get(`getTeamPlayers/${id}`),
  fetchPlayerStat: (id: number) => api.get(`getPlayerStat/${id}`),
  fetchTeamInfo: (id: number) => api.get(`getTeamInfo/${id}`),
};

export default apis;
