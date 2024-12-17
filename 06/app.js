document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audio");
    const textContainer = document.getElementById("text-container");
  
    const audioFile = "output.wav"; // File âm thanh
    const jsonFile = "output.json"; // File timestamp JSON
  
    let timestamps = [];
    let words = [];
  
    // Load file JSON và audio
    fetch(jsonFile)
      .then((response) => response.json())
      .then((data) => {
        timestamps = data.timestamp;
        words = splitTextIntoWords(data.text, timestamps);
        renderText(words);
        audio.src = audioFile; // Gán file audio
      });
  
    // Tách các từ từ timestamp
    function splitTextIntoWords(text, timestamps) {
      return timestamps.map(([_, __, startIndex, length]) =>
        text.substr(startIndex, length)
      );
    }
  
    // Hiển thị văn bản và chia nhỏ thành từng từ
    function renderText(words) {
      textContainer.innerHTML = words
        .map((word, index) => `<span id="word-${index}">${word} </span>`)
        .join("");
    }
  
    let interval;
    audio.addEventListener("play", () => {
      interval = setInterval(() => {
        const currentTime = audio.currentTime * 1000; // Lấy thời gian của audio (ms)
        highlightWord(currentTime);
      }, 20);
    });
  
    audio.addEventListener("pause", () => clearInterval(interval));
  
    function highlightWord(currentTime) {
      for (let i = 0; i < timestamps.length; i++) {
        const [startTime, duration] = timestamps[i];
        const endTime = startTime + duration;
  
        if (currentTime >= startTime && currentTime <= endTime) {
          clearHighlights();
          const wordElement = document.getElementById(`word-${i}`);
          if (wordElement) wordElement.classList.add("highlight");
          break;
        }
      }
    }
  
    function clearHighlights() {
      const highlighted = document.querySelector(".highlight");
      if (highlighted) highlighted.classList.remove("highlight");
    }
  });
  