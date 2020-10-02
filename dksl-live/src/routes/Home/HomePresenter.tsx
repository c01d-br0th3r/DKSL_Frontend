import React from "react";
import styled from "styled-components";
import { INowLive } from "../../interfaces/nowLive";
import Slider from "react-slick";
import { Link } from "react-router-dom";

interface IHome {
  live: INowLive[];
}

const Wrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const LiveGames = styled.div``;

const Game = styled.div`
  display: flex !important;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 5px;
`;

const Team = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  div:nth-child(2) {
    font-size: 22px;
    margin-top: 5px;
  }
`;

const VS = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  div:nth-child(1) {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 3px;
  }
  div:nth-child(2) {
    font-size: 14px;
    color: #2450aa;
    font-weight: 700;
  }
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Img = styled.img`
  width: 100%;
  margin-bottom: 20px;
`;

const HomePresenter: React.FC<IHome> = ({ live }) => {
  console.log(live);
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
  };

  return (
    <div>
      <Wrapper>
        <Img src="https://s7d2.scene7.com/is/image/TWCNews/mlb_baseball_jpeg" />
        <Title>진행중인 게임</Title>
        <LiveGames>
          <Slider {...settings}>
            {live.map((l, idx) => (
              <div key={idx}>
                <Link to={`live/${idx}`}>
                  <Game>
                    <Team>
                      <div>{l.away.name.split(" ")[0]}</div>
                      <div>{l.away.score}</div>
                    </Team>
                    <VS>
                      <div>vs</div>
                      <div>
                        {l.nowInning === 0
                          ? "경기 전"
                          : `${l.nowInning}회 ${l.nowTopBottom ? "말" : "초"}`}
                      </div>
                    </VS>
                    <Team>
                      <div>{l.home.name.split(" ")[0]}</div>
                      <div>{l.home.score}</div>
                    </Team>
                  </Game>
                </Link>
              </div>
            ))}
          </Slider>
        </LiveGames>
      </Wrapper>
    </div>
  );
};

export default HomePresenter;
