const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const port = 4000;

// mysql
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "49.50.172.42",
  port: "3306",
  user: "server",
  password: "tlstkddn!",
  database: "dksl_live",
});

connection.connect();
// mysql end

// 생성된 중계방 정보-----
var liveRoom = [];
//---------------------

app.use("/script", express.static(__dirname + "/script"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/makeRoom", (req, res) => {
  res.sendFile(__dirname + "/makeRoom.html");
});

app.get("/console/:gameId", (req, res) => {
  var gameId = req.params.gameId;
  if (liveRoom.length - 1 < gameId) {
    res.sendFile(__dirname + "/404.html");
  } else {
    res.sendFile(__dirname + "/index.html");
  }
});

app.get("/test", (req, res) => {
  res.sendFile(__dirname + "/test.html");
});

app.get("/live/:gameId", (req, res) => {
  var gameId = req.params.gameId;
  if (liveRoom.length - 1 < gameId) {
    res.sendFile(__dirname + "/404.html");
  } else {
    res.sendFile(__dirname + "/dksl-live/live2/index.html");
  }
});

io.on("connect", (socket) => {
  console.log("누군가 들어왔다 " + socket.id);

  // 리그 정보 요청 시
  socket.on("getLeagues", () => {
    connection.query("SELECT * from league_info ", function (
      err,
      results,
      fields
    ) {
      if (err) {
        console.log(err);
      } else {
        io.emit("sendLeagues", results);
      }
    });
  });

  // 팀 정보 요청 시
  socket.on("getTeams", (league_id) => {
    connection.query(
      "SELECT * from team_info where leagueId = " + league_id,
      function (err, results, fields) {
        if (err) {
          console.log(err);
        } else {
          io.emit("sendTeams", results);
        }
      }
    );
  });

  // 선수 정보 요청 시
  socket.on("getAwayPlayers", (team_id) => {
    connection.query(
      "SELECT * from player_info where teamId = " + team_id,
      function (err, results, fields) {
        if (err) {
          console.log(err);
        } else {
          io.emit("sendAwayPlayers", results);
        }
      }
    );
  });
  socket.on("getHomePlayers", (team_id) => {
    connection.query(
      "SELECT * from player_info where teamId = " + team_id,
      function (err, results, fields) {
        if (err) {
          console.log(err);
        } else {
          io.emit("sendHomePlayers", results);
        }
      }
    );
  });

  // 중계방 생성 요청 시
  socket.on("createLive", (gameInfo) => {
    liveRoom.push(gameInfo);
    //console.log(liveRoom);
  });

  // 중계정보 갱신 시
  socket.on("renewLive", (index, gameInfo) => {
    liveRoom[index] = gameInfo;
    socket.in("room" + index).emit("liveCast", liveRoom[index]);
  });

  // 중계방 종료 요청 시
  socket.on("deleteLive", (gameInfo) => {});

  // 중계방 입장 시
  socket.on("joinLive", (gameId) => {
    socket.join("room" + gameId);
  });

  // 문자중계 요청 시
  socket.on("getLiveCast", (gameId) => {
    socket.emit("sendLiveCast", liveRoom[gameId]);
  });

  // 콘솔에서 중계정보 요청 시
  socket.on("getLiveInfo", (gameId) => {
    var away = [];
    var home = [];

    connection.query(
      "SELECT playerId, playerName from player_info where teamId = " +
        liveRoom[gameId].away.ID,
      function (err, results, fields) {
        if (err) {
          console.log(err);
        } else {
          away = results;
          connection.query(
            "SELECT playerId, playerName from player_info where teamId = " +
              liveRoom[gameId].home.ID,
            function (err, results, fields) {
              if (err) {
                console.log(err);
              } else {
                home = results;
                socket.emit("sendLiveInfo", liveRoom[gameId], away, home);
              }
            }
          );
        }
      }
    );
  });

  // 로그인 요청 시
  socket.on("login", (name) => {
    console.log(name + " now log in.");
  });

  // 중계방 목룍 요청 시
  socket.on("isThereLive", () => {
    socket.emit("sendLiveRoom", liveRoom);
  });

  // 연결 종료 시
  socket.on("disconnect", () => {
    console.log("user disconnect");
  });
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/404.html");
});

http.listen(port, () => {
  console.log("Connected at " + port);
});
