// FUNCTION - LAUNCH APP
export function launchApp() {
  startBtn.addEventListener("click", function () {
    startGame(userName.value, level.value);
  });
}

// FUNCTION - START / RESTART GAME
export function startGame(userName, level) {
  console.log("Game started");
  userName = userName.trim();
  level = +level;
  if (!userName) return;
  showHideBlocks();
  createGame(userName, level);
}

// FUNCTION - SHOW HIDE BLOCKS
export function showHideBlocks() {
  description.classList.toggle("hidden");
  game.classList.toggle("hidden");
}

// FUNCTION - CHANGE PLAYER
export function changePlayer() {
  clearGame();
  showHideBlocks();
}

// FUNCTION - MIX WORDS
export function mixWords(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// FUNCTION - CLEAR GAME
export function clearGame() {
  if (game.innerHTML) {
    game.classList.remove("danger");
    game.innerHTML = "";
    review.innerHTML = "";
  }
}

// FUNCTION - GET DATE
export function getDate() {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) month = "0" + month;
  let day = date.getDate();
  if (day < 10) day = "0" + day;
  let hour = date.getHours();
  if (hour < 10) hour = "0" + hour;
  let minute = date.getMinutes();
  if (minute < 10) minute = "0" + minute;
  let text = `${year}.${month}.${day} ${hour}:${minute}`;
  return text;
}

// FUNCTION - SET EXISTING PLAYERS
export function setExistingPlayers(times, currentPlayer, playerTotalScore) {
  if (times == 0) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      existingPlayers.push({
        name: key,
        score: JSON.parse(value).score,
      });
    }
  } else if (times == 1) {
    let i = existingPlayers.findIndex((p) => p.name == currentPlayer);
    console.log(i);
    existingPlayers[i] = {
      name: currentPlayer,
      score: playerTotalScore,
    };
  }

  console.log("Existing players have been set");
  console.log(existingPlayers);
}

// FUNCTION - UPDATE SESSION STORAGE
export function updateSessionStorage(user, playerScore) {
  let objStr = JSON.stringify({ name: user, score: playerScore });
  if (sessionStorage.getItem("sessionBestScore")) {
    let best = +JSON.parse(sessionStorage.getItem("sessionBestScore")).score;
    if (playerScore > best) sessionStorage.setItem("sessionBestScore", objStr);
  } else sessionStorage.setItem("sessionBestScore", objStr);
}

// FUNCTION - CREATE WARNING TEXT
export function createWarningText(block, text) {
  const infoText = document.createElement("p");
  infoText.className = "special-text failure-text";
  infoText.innerText = text;
  block.append(infoText);
}

// FUNCTION - UPDATE BEST RESULTS
export function updateBestResults(isNew, user, currentScore, userDataObj) {
  console.log(user, "is", isNew ? "a New Player" : "an Existing Player");

  if (isNew) {
    const newUserDataObj = {
      name: user,
      score: currentScore,
      dictionary: [],
    };
    localStorage.setItem(user, JSON.stringify(newUserDataObj));
    existingPlayers.push({ name: user, score: currentScore });
  } else {
    const previousScore = userDataObj.score;
    if (currentScore > previousScore) {
      userDataObj.score = currentScore;
      localStorage.setItem(user, JSON.stringify(userDataObj));
      setExistingPlayers(1, user, currentScore);
    }
  }
}

// FUNCTION - GET ARRAY OF WORDS ONLY
export function getArrayOfWordsOnly(arr) {
  let newArr = [];
  for (let obj of arr) newArr.push(obj.word1);
  return newArr;
}

// FUNCTION - ADD CLASSES
export function addClasses(classes) {
  let className = "button";
  if (classes) {
    if (classes.includes(" ")) {
      let arr = classes.split("");
      for (let item of arr) {
        className += ` ${item}`;
      }
    } else {
      className += ` ${classes}`;
    }
  }
  return className;
}
