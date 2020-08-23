const getTeamInfo = (teamID, teamName, batters, pitcher) => {

	var batterInfo = [];
	var pitcherInfo = [];

	var count = 0;

	for (i in batters){

		batterInfo[count] = {
			ID : batters[i].ID,
			name : batters[i].name,
			position : batters[i].position,
			result : [0,0,0,0,0,0,0,0,0],	// 이닝별 타격 기록
			stat : {						// 총 타격 기록
				PA : 0,	// 타석
				AB : 0,	// 타수
				R : 0,	// 득점
				H : 0,	// 안타
				HR : 0,	// 홈런
				BB : 0,	// 볼넷
				HBP : 0,// 사구
				RBI : 0,// 타점
				SB : 0,	// 도루
				CS : 0,	// 도실
				E : 0	// 에러
			}
		};

		count++;
	}

	pitcherInfo[0] = {
		ID : pitcher[0].ID,
		name : pitcher[0].name,
		stat : {
			IP : 0,	// 이닝
			PA : 0,	// 타석
			NP : 0,	// 투구수
			S : 0,	// 스트라이크 수
			B : 0,	// 볼 수
			AB : 0,	// 타수
			H : 0,	// 피안타
			BB : 0,	// 볼넷
			HBP : 0,// 사구
			HR : 0,	// 피홈런
			SO : 0,	// 탈삼진
			R : 0,	// 실점
			ER : 0	// 자책
		}

	}

	var teamInfo = {
		ID : teamID,
		name : teamName,
		score : [0,0,0,0,0,0,0,0,0],	// 이닝별 스코어
		totalScore : 0,					// 총 스코어
		batterInfo : batterInfo,
		pitcherInfo : pitcherInfo
	}

	return teamInfo;

}

const getGameInfo = (castId, league, away, home, ground) => {

	var gameInfo = {
		castId : castId,
		league : league,
		away : away,
		home : home,
		nowInning : 1,
		nowTopBottom : 0,	// 초0, 말1 
		ground : ground
	};

	return gameInfo;

}

const getTeamBatterStat = (teamInfo, whatTheyWant) => {

	var result = 0;

	for (i in teamInfo.batterInfo){
		result += teamInfo.batterInfo[i].stat[whatTheyWant];
	}

	return result;

}

const TopBottom = ['회초', '회말'];