// var API_SERVER_DOMAIN = "http://15.164.253.0:8081";
// =>변경 예정 
let loginBtn = document.getElementById("login-button");

function submitLoginForm(event) {
  event.preventDefault(); // 기본 제출 동작을 막습니다.

  // 사용자가 입력한 이메일과 비밀번호를 가져옴
  var id = document.getElementById("id");
  var password = document.getElementById("password");

  // 서버에 로그인 요청을 보냄
  fetch(API_SERVER_DOMAIN + "/account/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email: id.value,
      password: password.value,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.json();
    })
    .then((data) => {
      var accessToken = data.accessToken;
      var refreshToken = data.refreshToken;
      // 토큰을 쿠키에 저장
      setCookie("accessToken", accessToken, 1);
      setCookie("refreshToken", refreshToken, 1);
      // 로그인이 성공하면 다음 동작 수행
      window.location.replace("#.html");
      //로그인이 성공하면 페이지 넘어감
    })
    .catch((error) => {
      alert("로그인에 실패했습니다!");
    });
}

function setCookie(name, value, days) {
  var expires = "";
  //하루 단위로 변환하는 과정
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  //쿠키를 저장하는 형식
  document.cookie = name + "=" + value + expires + "; path=/";
}

loginBtn.addEventListener("click", submitLoginForm);
