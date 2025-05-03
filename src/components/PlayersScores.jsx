import { useState, useRef } from "react";
import Button from "./Button";

let initSortState = false;

export default function PlayersScores({ user, existingPlayers }) {
  const [isPlayersDisplayed, setIsPlayersDisplayed] = useState(false);
  const [isReversedSort, setIsReversedSort] = useState(initSortState);

  const scoresTable = useRef();

  const currentPlayerIndex = existingPlayers.findIndex((p) => p.name === user);

  function sortColumn(index, reverse, table) {
    let rows, switching, i, x, y, shouldSwitch;
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[index];
        y = rows[i + 1].getElementsByTagName("td")[index];
        if (isNaN(x.innerHTML)) {
          if (!reverse) {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          } else {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
        } else {
          if (!reverse) {
            if (+x.innerHTML > +y.innerHTML) {
              shouldSwitch = true;
              break;
            }
          } else {
            if (+x.innerHTML < +y.innerHTML) {
              shouldSwitch = true;
              break;
            }
          }
        }
      }

      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }

    setIsReversedSort((sort) => !sort);
  }

  function showMoreScores() {
    let rows = Array.from(document.querySelectorAll(".scores__table tbody tr"));
    for (let i = 0; i < 10; i++) {
      rows[i]?.classList.remove("hidden");
    }
    document.querySelector(".scores__table").classList.add("unmargined");
    setIsPlayersDisplayed(true);
    console.log("Top 10 players showed");
  }

  return (
    <div className="scores">
      <h2 className="scores__header">Top Best Scores</h2>
      <table
        ref={scoresTable}
        className={`scores__table${
          existingPlayers.length <= 10 ? " unmargined" : ""
        }`}
      >
        <thead>
          <tr>
            <th
              className="number"
              onClick={() => sortColumn(0, isReversedSort, scoresTable.current)}
            >
              #
            </th>
            <th
              className={
                isReversedSort ? "descending-order" : "ascending-order"
              }
              onClick={() => sortColumn(1, isReversedSort, scoresTable.current)}
            >
              PLAYER
            </th>
            <th
              className={
                isReversedSort ? "descending-order" : "ascending-order"
              }
              onClick={() => sortColumn(2, isReversedSort, scoresTable.current)}
            >
              SCORE
            </th>
          </tr>
        </thead>
        <tbody>
          {existingPlayers.map((player, index) => {
            return (
              <tr
                key={`${player.name}-${index}`}
                // className={index > 4 ? "hidden" : ""}
                className={
                  currentPlayerIndex === index
                    ? "current-player"
                    : index > 4
                    ? "hidden"
                    : ""
                }
              >
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button
        text="Show More Players"
        classes={
          isPlayersDisplayed || existingPlayers.length <= 10
            ? "hidden"
            : "show-more-button"
        }
        onClick={showMoreScores}
      />
    </div>
  );
}
