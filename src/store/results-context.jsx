import { createContext, useState } from "react";
import { setExistingPlayers } from "../functions";

export const ResultsContext = createContext({
  letters: [],
  user: undefined,
  userDataObj: {},
  totalScore: 0,
  correctNum: 0,
  incorrectNum: 0,
  maxCombo: 0,
  existingPlayers: [],
  gameWords: [],
  incorrectWords: [],
  wordsNum: 0,
  handleChangePlayer: () => {},
  handleRestartGame: () => {},
});
