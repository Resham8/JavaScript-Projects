const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resultDiv = document.getElementById("result");

searchButton.addEventListener("click", searchWord);
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchWord();
  }
});

async function searchWord() {
  const word = searchInput.value.trim();
  if (word) {
    try {
      resultDiv.innerHTML = "Searching...";
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      console.log("API Response:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Data:", data);

      if (data.length > 0) {
        displayResult(data[0]);
      } else {
        throw new Error("No definitions found");
      }
    } catch (error) {
      console.error("Error:", error);
      resultDiv.innerHTML = `<div class="error">Sorry, we encountered an error: ${error.message}. Please try again.</div>`;
    }
  }
}

function displayResult(data) {
  const audioUrl = data.phonetics.find((p) => p.audio)?.audio || "";
  const definition =
    data.meanings[0]?.definitions[0]?.definition || "No definition available";
  const example = data.meanings[0]?.definitions[0]?.example || "";

  resultDiv.innerHTML = `
                <div class="word">
                    ${data.word}
                    ${
                      audioUrl
                        ? `<button id="audio-button" onclick="playAudio('${audioUrl}')">🔊</button>`
                        : ""
                    }
                </div>
                <div class="phonetic">${data.phonetic || ""}</div>
                <div class="definition">${definition}</div>
                ${example ? `<div class="example">${example}</div>` : ""}
            `;
}

function playAudio(url) {
  new Audio(url).play();
}
