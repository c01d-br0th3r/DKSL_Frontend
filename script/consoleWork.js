// 문자중계 콘솔 작동부 전반 코드

// window가 로드되었을 때 css처리, 이벤트 지정

// 범타, 희생플라이, 희생번트, 야수선택 => 상세위치 필요없음
// 안타, 홈런 => 상세위치 필요함

$(window).load(() => {

	// 콘솔 토글작동 상황 버튼 숨김처리
	$("#hit_result").hide();
	$("#fielder").hide();
	$("#location").hide();

	// 볼 버튼 클릭 시
	$("#Ball").click(function(event){
		alert("볼");
	});

	// 스트라이크 버튼 클릭 시
	$("#Strike").click(function(event){
		alert("스트라이크");
	});

	// 파울 버튼 클릭 시
	$("#Foul").click(function(event){
		alert("파울");
	});

	// 헛스윙 버튼 클릭 시
	$("#Swing").click(function(event){
		alert("헛스윙");
	});

	// 타격 버튼 클릭 시
	$("#Hit").click(function(event) {
		if($("#hit_result").is(":visible") == false) {
			$("#hit_result").show();
		}
		else{
			$("#hit_result").hide();
		}
	});

	// 사구 버튼 클릭 시
	$("#HBP").click(function(event){
		alert("");
	});

});