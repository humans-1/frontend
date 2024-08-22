// var API_SERVER_DOMAIN = "http://15.164.253.0:8081";

const signupBtn = document.getElementById("sign-up-button");

let password = document.getElementById("s-password");

let email = document.getElementById("s-email");
let nickname = document.getElementById("s-nickname");

// 회원가입 폼 제출 함수
function submitSignupForm(event) {
  event.preventDefault(); // 기본 제출 동작을 막음

  // 비밀번호 길이 검사
  if (password.value.length < 8) {
    alert("비밀번호는 8자 이상이어야 합니다.");
    return;
  }

  // 닉네임 길이 검사
  if (nickname.value.length < 2) {
    alert("닉네임은 2자 이상이어야 합니다.");
    return;
  }

  fetch(API_SERVER_DOMAIN + "/account/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nickName: nickname.value,
      email: email.value,
      password: password.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.createdAt) {
        alert("회원가입 성공!");
        window.location.href = "../frontend/login.html";
      } else {
        alert("회원가입 실패: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("서버와의 통신 오류가 발생했습니다.");
    });
}

// 회원가입 버튼에 이벤트 리스너 추가
signupBtn.addEventListener("click", submitSignupForm);
