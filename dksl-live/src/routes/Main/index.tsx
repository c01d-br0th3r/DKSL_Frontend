import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import socketio from "socket.io-client";
import styled from "styled-components";
import { ILive } from "../..//interfaces/live";
import Record from "../../components/Record";
import Scoreboard from "../../components/Scoreboard";
import "./Main.css";

const socket: any = socketio.connect("http://localhost:4000");
const inning: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

interface MatchParams {
  id: string;
}

const BroadcastContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #5d93d2;
  overflow: scroll;
`;

const Button: any = styled.button`
  width: 100%;
  padding: 10px 0;
  background-color: ${(props) => (props.disabled ? "#5d93d2" : "#1D4AA0")};
  color: #fff;
  font-weight: 600;
  opacity: ${(props) => (props.disabled ? "0.7" : "1")};
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")}; ;
`;

const NavigationContainer = styled.div`
  width: 100%;
  display: flex;
`;

const Nav: any = styled.button`
  width: 100%;
  background-color: #2450aa;
  border: none;
  padding: 10px;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
`;

const Textcast = styled.div`
  padding: 10px;
`;

const Main: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const [live, setLive] = useState<ILive | null>(null);
  const [currentInning, setCurrentInning] = useState<number>(-1);
  const [isBroadcast, setIsBroadcast] = useState<boolean>(true);
  useEffect(() => {
    socket.emit("joinLive", match.params.id);
    socket.emit("getLiveCast", match.params.id);
    // 전송 누를 때마다
    socket.on("sendLiveCast", (live: ILive) => {
      console.log(live);
      setLive(live);
      setCurrentInning(live.nowInning);
    });
    socket.on("liveCast", (live: ILive) => {
      console.log(live);
      setLive(live);
      setCurrentInning(live.nowInning);
    });
  }, []);
  const handleClick = (e: any) => {
    const target = e.target as HTMLButtonElement;
    setCurrentInning(parseInt(target.innerText));
  };
  useEffect(() => {
    console.log(currentInning);
  }, [currentInning]);
  return (
    <div>
      {live === null ? (
        <div>No Game</div>
      ) : (
        <>
          <Scoreboard live={{ ...live }} />
          <NavigationContainer>
            <Nav onClick={() => setIsBroadcast(true)}>중계</Nav>
            <Nav onClick={() => setIsBroadcast(false)}>기록</Nav>
          </NavigationContainer>
          {isBroadcast ? (
            <BroadcastContainer>
              <ButtonContainer>
                {inning.map((inn) => (
                  <Button
                    inning={inn}
                    key={inn}
                    onClick={handleClick}
                    disabled={live.nowInning < inn}
                  >
                    {`${inn}회`}
                  </Button>
                ))}
              </ButtonContainer>
              <Textcast
                dangerouslySetInnerHTML={{
                  __html:
                    currentInning === -1
                      ? live.textCast[0]
                      : live.textCast[currentInning - 1],
                }}
              />
            </BroadcastContainer>
          ) : (
            <Record live={live} />
          )}
        </>
      )}
    </div>
  );
};

export default Main;
