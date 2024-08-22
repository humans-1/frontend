document
  .getElementById("input-file")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (event) {
        const fileContent = event.target.result;
        const previewDiv = document.getElementById("left-file");
        previewDiv.innerHTML = ""; // 이전 내용 지우기

        if (file.type === "application/pdf") {
          // PDF 파일인 경우
          const iframe = document.createElement("iframe");
          iframe.src = URL.createObjectURL(file);
          iframe.width = "100%";
          iframe.height = "100%"; // PDF 뷰어의 높이 설정
          iframe.style.borderBottomLeftRadius = "0.5cm";
          iframe.style.borderBottomRightRadius = "0.5cm";
          previewDiv.appendChild(iframe);
        } else if (file.type === "text/plain") {
          // 텍스트 파일인 경우
          const textarea = document.createElement("textarea");
          textarea.style.resize = "none";
          textarea.textContent = fileContent;
          textarea.readOnly = true; // 텍스트 영역을 읽기 전용으로 설정
          // textarea.style.width = "100%";
          textarea.style.height = "408px"; // 텍스트 영역의 높이를 고정
          textarea.style.borderBottomLeftRadius = "0.5cm";
          textarea.style.borderBottomRightRadius = "0.5cm";
          previewDiv.appendChild(textarea);
        } else {
          // 다른 파일 형식의 경우
          //   const message = document.createElement("p");
          //   message.textContent = "이 파일 형식은 지원하지 않습니다.";
          //   previewDiv.appendChild(message);
          alert("이 파일 형식은 지원하지 않습니다.");
        }
      };

      reader.readAsText(file);
    }
  });

const memoEditor = document.getElementById("memo-editor");
const saveButton = document.getElementById("save-button");

// 저장 버튼 클릭 시 이벤트 처리
saveButton.addEventListener("click", function () {
  const memoContent = memoEditor.value;
  const blob = new Blob([memoContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "나만의 노트.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});
