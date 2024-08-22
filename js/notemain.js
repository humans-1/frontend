document.addEventListener("DOMContentLoaded", function () {
  let selectedSubject = null;

  const createSubBtn = document.querySelector(".create-sub-btn");
  const createNoteBtn = document.querySelector(".create-note-btn");
  const mainContent = document.querySelector(".main-content");

  createSubBtn.addEventListener("click", function () {
    addSubjectInput();
  });

  createNoteBtn.addEventListener("click", function () {
    if (selectedSubject) {
      addNoteToSubject(selectedSubject);
    } else {
      alert("과목을 먼저 선택하세요.");
    }
  });

  function addSubjectInput() {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "과목명";
    input.className = "subject-input";

    const li = document.createElement("li");
    li.className = "subject-item";
    li.appendChild(input);
    document.querySelector(".subject-list").appendChild(li);

    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        convertInputToDiv(input);
      }
    });
  }

  function convertInputToDiv(input) {
    const value = input.value.trim();

    if (value !== "") {
      const div = document.createElement("div");
      div.textContent = value;
      div.className = "subject-name";
      div.style.color = "#333";

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.className = "delete-btn";

      const img = document.createElement("img");
      img.src = "../frontend/img/subject-circle.png";
      img.alt = "subject icon";
      img.className = "subject-icon";

      deleteBtn.addEventListener("click", function () {
        const parentLi = this.parentElement;
        parentLi.remove();

        // 선택된 과목 초기화
        selectedSubject = null;

        // h2 요소를 강제로 제거 시도
        const h2Element = mainContent.querySelector("h2");
        if (h2Element) {
          h2Element.remove(); // h2 요소 제거
        }

        // mainContent 초기화
        mainContent.innerHTML = "";

        console.log("h2 요소 및 mainContent 초기화 완료");

        // 만약 h2가 여전히 남아 있으면 반복적으로 제거 시도
        setTimeout(() => {
          const remainingH2Element = mainContent.querySelector("h2");
          if (remainingH2Element) {
            remainingH2Element.remove();
            console.log("h2 요소가 다시 제거됨");
          }
        }, 100); // 100ms 후에 다시 시도
      });

      const li = input.parentElement;
      li.innerHTML = "";
      li.appendChild(img);
      li.appendChild(div);
      li.appendChild(deleteBtn);

      li.addEventListener("click", function () {
        selectedSubject = li;
        highlightSelectedSubject(selectedSubject);
        loadNotesForSubject(selectedSubject);
      });
    } else {
      alert("과목 이름을 입력하세요.");
    }
  }

  function highlightSelectedSubject(subject) {
    document.querySelectorAll(".subject-item").forEach((item) => {
      item.classList.remove("selected-subject");
    });
    subject.classList.add("selected-subject");
  }

  function loadNotesForSubject(subject) {
    const notes = subject.notes || [];
    mainContent.innerHTML = ""; // 기존 내용 초기화

    const title = document.createElement("h2");
    title.textContent = subject.querySelector(".subject-name").textContent;
    mainContent.appendChild(title);

    const notesContainer = document.createElement("div");
    notesContainer.className = "notes-container"; // 노트들을 담을 컨테이너

    notes.forEach((note, index) => {
      const noteItem = document.createElement("div");
      noteItem.className = "note-item";

      const noteHeading = document.createElement("div");
      noteHeading.className = "note-title";
      noteHeading.textContent = "Chapter " + (index + 1);

      const noteDescription = document.createElement("small");
      noteDescription.textContent = note;

      noteItem.appendChild(noteHeading);
      noteItem.appendChild(noteDescription);

      // 각 note-item에 클릭 이벤트 추가
      noteItem.addEventListener("click", function () {
        window.location.href = "../frontend/notepage.html";
      });

      notesContainer.appendChild(noteItem);
    });

    mainContent.appendChild(notesContainer); // 노트 컨테이너 추가
  }

  function addNoteToSubject(subject) {
    if (!subject.notes) {
      subject.notes = [];
    }

    const newNote = "새로운 노트 " + (subject.notes.length + 1);
    subject.notes.push(newNote);

    loadNotesForSubject(subject); // 노트 추가 후 주차 목록 갱신
  }
});
