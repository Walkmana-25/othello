import styles from './index.module.css';
import { useState } from 'react';

function discColor(num: number): string {
  if (num === 1) {
    return 'white';
  } else if (num === 2) {
    return 'black';
  } else {
    return 'transparent';
  }
}

const Home = () => {
  //othello board
  // 8 x 8
  // 1 is white, 2 is black
  const [board, setBoard] = useState<number[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [player, setPlayer] = useState<number>(1); // 1 is white, 2 is black

  return (
    <>
      <h1>hello</h1>
      <h2>Player Code: {player}</h2>
      <h2 className={styles.test}>world</h2>
      <div className={styles.board}>
        {board.map((row, i) =>
          row.map((cell, k) => (
            <div
              key={i}
              className={styles.cell}
              onClick={() => {
                if (board[i][k] === 0) {
                  //copy board
                  const board_copy = board.slice();
                  board_copy[i][k] = player;

                  setBoard(board_copy);
                  // run if click
                  if (player === 1) {
                    setPlayer(2);
                  } else {
                    setPlayer(1);
                  }
                }
              }}
            >
              {cell !== 0 && (
                <div className={styles.disc} style={{ backgroundColor: discColor(cell) }} />
              )}
            </div>
          )),
        )}
      </div>
    </>
  );
};

export default Home;
