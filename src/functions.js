// FUNCTION - MIX WORDS
export function mixWords(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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

// FUNCTION - UPDATE SESSION STORAGE
export function updateSessionStorage(user, playerScore) {
  let objStr = JSON.stringify({ name: user, score: playerScore });
  if (sessionStorage.getItem("sessionBestScore")) {
    let best = +JSON.parse(sessionStorage.getItem("sessionBestScore")).score;
    if (playerScore > best) sessionStorage.setItem("sessionBestScore", objStr);
  } else sessionStorage.setItem("sessionBestScore", objStr);
  console.log(sessionStorage);
}

// FUNCTION - SET EXISTING PLAYERS
export function setExistingPlayers(
  times,
  existingPlayers,
  currentPlayer,
  playerTotalScore
) {
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
    if (playerTotalScore > existingPlayers[i].score) {
      existingPlayers[i] = {
        name: currentPlayer,
        score: playerTotalScore,
      };
    }
  }
  console.log("Existing players have been set");
}

// FUNCTION - GET ARRAY OF WORDS ONLY
export function getArrayOfWordsOnly(arr) {
  let newArr = [];
  for (let obj of arr) newArr.push(obj.word1);
  return newArr;
}

// FUNCTION - ADD CLASSES
export function addClasses(main, classes) {
  let className = main;
  if (classes) {
    if (classes.includes(" ")) {
      let arr = classes.split(" ");
      for (let item of arr) {
        className += ` ${item}`;
      }
    } else {
      className += ` ${classes}`;
    }
  }
  return className;
}
