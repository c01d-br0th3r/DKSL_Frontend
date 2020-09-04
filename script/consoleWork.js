// 문자중계 콘솔 작동부 전반 코드
function isEmptyObject(param) {
    return Object.keys(param).length === 0 && param.constructor === Object;
}

const gameId = $(location).attr('pathname').split('/')[2] * 1;

const socket = io();

var liveInfo = [];
var nowPitchCount = 1;

var awayPlayer = [];
var homePlayer = [];

var textForSend = "";
var situationType = 0;

// 상황 이후 목적베이스
var afterSituBase = [0, 0, 0];

const setNowPlayer = function () {
    var tmp = "";
    tmp += "현재 타자 : " + getNowBatter().name + "<br/>";
    tmp += "현재 투수 : " + liveInfo[dfTeam[liveInfo.nowTopBottom]].pitcherInfo[liveInfo[dfTeam[liveInfo.nowTopBottom]].nowPitcher].name;
    $("#nowBatterPitcher").html(tmp);
}

const setCountBoard = function () {
    $("#ballCount").html("<p>B</p>");
    $("#strikeCount").html("<p>S</p>");
    $("#outCount").html("<p>O</p>");
    for (var i = 0; i < liveInfo.nowCount.Ball; i++) 
        $("#ballCount").append("<div></div>");
    
    for (var i = 0; i < liveInfo.nowCount.Strike; i++) 
        $("#strikeCount").append("<div></div>");
    
    for (var i = 0; i < liveInfo.nowCount.Out; i++) 
        $("#outCount").append("<div></div>");
    
}

const clearText = function () {
    textForSend = "";
    afterSituBase = [0, 0, 0];
    $("#scriptContents").html("");
    $("#sendText").unbind("click");
    $("#hit_result").children().each(function (index, el) {
        $(el).unbind('click');
    });
    $("#fielder").children().each(function (index, el) {
        $(el).unbind('click');
    });
    $("#location").children().each(function (index, el) {
        $(el).unbind('click');
    });
    $("#runner").children().each(function (index, el) {
        $(el).unbind('click');
    });
    $("#runnerTagOutLoca").children().each(function (index, el) {
        $(el).unbind('click');
    });
    $("#runnerForceOutLoca").children().each(function (index, el) {
        $(el).unbind('click');
    });
}

const inputText = function (text) {
    if (textForSend != "") {
        alert("이미 입력한 내용부터 전송해주세요.");
        return false;
    } else {
        textForSend += text;
        $("#scriptContents").html(textForSend);
        return true;
    }
}

const appendText = function (text) {
    textForSend += text;
    $("#scriptContents").append(text);
}

const sendText = function () {
    liveInfo.textCast[liveInfo.nowInning - 1] += textForSend;
    socket.emit("renewLive", gameId, liveInfo);
    clearText();
    setNowPlayer();
    renewBase();
}

const clearTextandAction = function () {
    if (confirm("정말 보낼 내용을 초기화하시겠습니까? (상황도 이루어지지 않습니다.)")) {
        clearText();
        // 콘솔 토글작동 상황 버튼 숨김처리
        $("#hit_result").hide();
        $("#fielder").hide();
        $("#location").hide();
        $("#runner").hide();
        $("#runnerForceOutLoca").hide();
        $("#runnerTagOutLoca").hide();
    }
}

const getNowOffenseTeam = function () {
    return liveInfo[ofTeam[liveInfo.nowTopBottom]];
}
const getNowBatter = function () {
    return liveInfo[ofTeam[liveInfo.nowTopBottom]].batterInfo[liveInfo[ofTeam[liveInfo.nowTopBottom]].nowBatter - 1].batters[liveInfo[ofTeam[liveInfo.nowTopBottom]].batterInfo[liveInfo[ofTeam[liveInfo.nowTopBottom]].nowBatter - 1].now];
}
const getNowDefenceTeam = function () {
    return liveInfo[dfTeam[liveInfo.nowTopBottom]];
}
const getNowPitcher = function () {
    return liveInfo[dfTeam[liveInfo.nowTopBottom]].pitcherInfo[liveInfo[dfTeam[liveInfo.nowTopBottom]].nowPitcher];
}
const getAwayTeam = function () {
    return liveInfo["away"];
}
const getHomeTeam = function () {
    return liveInfo["home"];
}

const setRunnerSitu = function (base, p, r) {
    $("#runner").hide();
    $("#runner").children().each(function (index, el) {
        $(el).unbind('click');
    });
    $("#runnerTagOutLoca").children().each(function (index, el) {
        $(el).unbind('click');
    });
    $("#runnerForceOutLoca").children().each(function (index, el) {
        $(el).unbind('click');
    });
    if (base < 0) {
        console.log(r);
        $("#sendText").click(function (event) {
            switch (r) {
                case "안타":
                    hit(p, r);
                    break;
                case "2루타":
                    _2B(p);
                    break;
                case "3루타":
                    _3B(p);
                    break;
                case "내야안타":
                    hit(p, r);
                    break;
                case "번트안타":
                    hit(p, r);
                    break;
                    // case "그라운드 홈런" : HR(p); break;
                case "땅볼 아웃":
                case "땅볼로 출루":
                case "플라이 아웃":
                case "직선타":
                case "희생플라이":
                case "희생번트":
                case "병살타":
                case "직선타병살":
                case "삼중살":
                case "번트땅볼 아웃":
                case "번트뜬공 아웃":
                case "야수선택":
                case "실책으로 출루":
                    Out(p, r);
                    break;
            }
            sendText();
            setCountBoard();
            renewBase();
        });
        return;
    }
    if (! isEmptyObject(liveInfo.nowBase[base])) {
        $("#runner").show();
        $("#runnerHeader").html("<h2>" + (
            base + 1
        ) + "루주자 타격 후 상황</h2>");
        var tmp = (base + 1) + "루주자 " + liveInfo.nowBase[base].name + " : ";
        var isOut = false;
        $("#runner").children().each(function (index, el) {
            $(el).click(function (event) {
                $("#ruuner").hide();
                switch ($(el).attr("id")) {
                    case "tag": isOut = true;
                        afterSituBase[base] = tagOut;
                        $("#runnerTagOutLoca").show();
                        $("#runnerTagOutLoca").children().each(function (index, el) {
                            $(el).click(function (event) {
                                tmp += $(el).html() + " 태그아웃<br/>";
                                appendText(tmp);
                                setRunnerSitu(base - 1, p, r);
                                $("#runnerTagOutLoca").hide();
                            });
                        });
                        break;
                    case "force": isOut = true;
                        afterSituBase[base] = forceOut;
                        $("#runnerForceOutLoca").show();
                        $("#runnerForceOutLoca").children().each(function (index, el) {
                            $(el).click(function (event) {
                                tmp += $(el).html() + " 포스아웃<br/>";
                                appendText(tmp);
                                setRunnerSitu(base - 1, p, r);
                                $("#runnerForceOutLoca").hide();
                            });
                        });
                        break;
                    case "notMove": afterSituBase[base] = notMove;
                        break;
                    case "2B": tmp += "2루까지 진루<br/>";
                        appendText(tmp);
                        afterSituBase[base] = to2B;
                        break;
                    case "3B": tmp += "3루까지 진루<br/>";
                        appendText(tmp);
                        afterSituBase[base] = to3B;
                        break;
                    case "home": tmp += "홈인<br/>";
                        appendText(tmp);
                        afterSituBase[base] = toHome;
                        break;
                }
                if (! isOut) 
                    setRunnerSitu(base - 1, p, r);
                
            });
        });
    } else 
        setRunnerSitu(base - 1, p, r);
    
}

const moveRunnerWhenBB = function (base, move) {
    if (base > 2) 
        return;
     else if (isEmptyObject(liveInfo.nowBase[base])) {
        move = false;
    } else if (move) {
        switch (base) {
            case 0: afterSituBase[base] = to2B;
                break;
            case 1: afterSituBase[base] = to3B;
                break;
            case 2: afterSituBase[base] = toHome;
                break;
        }
        move = true;
    } else {
        afterSituBase[base] = notMove;
        move = false;
    } moveRunnerWhenBB(base + 1, move);
    if (move) {
        var toBase = (base + 2) + "루까지 진루";
        if (base > 1) 
            toBase = "홈인";
        
        appendText((base + 1) + "루주자 " + liveInfo.nowBase[base].name + " : " + toBase + "<br/>");
    }
    return;
}

const moveRunner = function () {
    
    var tmpBase = [{}, {}, {}];
    var RBI = 0;
    for (var i = 2; i >= 0; i--) {
        if (! isEmptyObject(liveInfo.nowBase[i])) {
            switch (afterSituBase[i]) {
                case tagOut:
                case forceOut: liveInfo.nowCount.Out++;
                    break;
                case notMove: tmpBase[i] = liveInfo.nowBase[i];
                    break;
                case to2B: tmpBase[1] = liveInfo.nowBase[i];
                    break;
                case to3B: tmpBase[2] = liveInfo.nowBase[i];
                    break;
                case toHome:
                    liveInfo.nowBase[i].stat.R ++;
                    RBI++;
                    break;
            }
        }
    }
    console.log(RBI);
    liveInfo.nowBase = tmpBase;
    return RBI;
}

const renewPlayerList = function () {

	$(".players").unbind("click");

    $("#awayTeamPlayers").children("ul").html("");
    $("#homeTeamPlayers").children("ul").html("");
    $("#awayTeamPlayers").children("ul").append("<div class=\"list-group-item-heading\" id=\"awayTeamName\">" + liveInfo.away.name + "</div>");
    for (i in liveInfo.away.batterInfo) 
        $("#awayTeamPlayers").children("ul").append("<div class=\"list-group-item players\" id=\"awayPlayers\" player-name=\"" + liveInfo.away.batterInfo[i].batters[liveInfo.away.batterInfo[i].now].name + "\" player-id=\"" + liveInfo.away.batterInfo[i].batters[liveInfo.away.batterInfo[i].now].ID + "\">" + liveInfo.away.batterInfo[i].batters[liveInfo.away.batterInfo[i].now].name + " - " + getKeyByValue(posCode, liveInfo.away.batterInfo[i].batters[liveInfo.away.batterInfo[i].now].position) + "</div>");
    
    $("#homeTeamPlayers").children("ul").append("<div class=\"list-group-item-heading\" id=\"homeTeamName\">" + liveInfo.home.name + "</div>");
    for (i in liveInfo.home.batterInfo) 
        $("#homeTeamPlayers").children("ul").append("<div class=\"list-group-item players\" id=\"homePlayers\" player-name=\"" + liveInfo.home.batterInfo[i].batters[liveInfo.home.batterInfo[i].now].name + "\" player-id=\"" + liveInfo.home.batterInfo[i].batters[liveInfo.home.batterInfo[i].now].ID + "\">" + liveInfo.home.batterInfo[i].batters[liveInfo.home.batterInfo[i].now].name + " - " + getKeyByValue(posCode, liveInfo.home.batterInfo[i].batters[liveInfo.home.batterInfo[i].now].position) + "</div>");
    
    $(".players[player-id=" + getNowBatter().ID + "]").append("  <strong>현재타자</strong>")

    // 선수명단 조작
    $(".players").click(function(event) {

    	var mousePos = getMousePos(event);
            
        $("#playerOption").show();
        $("#playerOption").css({
            left : mousePos.x,
            top : mousePos.y
        });
        $("#playerOptionHeader").html($(this).attr("player-name"));
        $("#playerChange").html("선수 교체");

        if (getNowBatter().ID == $(this).attr("player-id")*1){
            $("#playerOptionHeader").append("  <strong>현재타자</strong>");
            $("#playerChange").html("대타 교체")
        }

    });

    // 대기선수 갱신 (현재 라인업에 들어가있는 명단 제거)
    for (i in getAwayTeam().batterInfo){
        for (j = 0; j <= getAwayTeam().batterInfo[i].now; j++){
            for (k in awayPlayer){
                if (awayPlayer[k].playerId == (getAwayTeam().batterInfo[i].batters[j].ID * 1)){
                    awayPlayer.splice(k, 1);
                    break;
                }
            }
        }
    }

    for (i in getHomeTeam().batterInfo){
        for (j = 0; j <= getHomeTeam().batterInfo[i].now; j++){
            for (k in homePlayer){
                if (homePlayer[k].playerId == (getHomeTeam().batterInfo[i].batters[j].ID * 1)){
                    homePlayer.splice(k, 1);
                    break;
                }
            }
        }
    }

    console.log(awayPlayer);

}

const getMousePos = function (e) {

    var x = 0;
    var y = 0;

    if (!e){
        var e = window.event;
    }
    if (e.pageX || e.pageY){
        x = e.pageX;
        y = e.pageY;
    }
    else if (e.clientX || e.clientY){
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY = document.body.scrollTop + document.documentElement.scrollTop;
    }

    return { x, y };

}