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
function bottomToUp(x: number, y: number, c: number, board: number[][]): [number, number, boolean] {
  board[x][y] = c;
  let canput = true;
  let differentColorIsNext = false;
  const differentColor = c === 1 ? 2 : 1;
  let last = 0;
  for (let i: number = y - 1; i >= 0; i--) {
    const current = board[x][i];
    if (current === differentColor) {
      differentColorIsNext = true;
    } else if (current === c) {
      last = i;
      break;
    } else {
      canput = false;
    }
  }

  if (canput === true && differentColorIsNext === true) {
    return [x, last, true];
  } else {
    return [-1, -1, false];
  }
}

function upToBottom(x: number, y: number, c: number, board: number[][]): [number, number, boolean] {
  board[x][y] = c;
  let canput = true;
  let differentColorIsNext = false;
  const differentColor = c === 1 ? 2 : 1;
  let last = 0;
  // eslint-disable-next-line for-direction
  for (let i: number = y; i < 8; i++) {
    const current = board[x][i];
    if (current === differentColor) {
      differentColorIsNext = true;
    } else if (current === c) {
      last = i;
      break;
    } else {
      canput = false;
    }
  }

  if (canput === true && differentColorIsNext === true) {
    return [x, last, true];
  } else {
    return [-1, -1, false];
  }
}
function leftToRight(
  x: number,
  y: number,
  c: number,
  board: number[][],
): [number, number, boolean] {
  board[x][y] = c;
  let canput = true;
  let differentColorIsNext = false;
  const differentColor = c === 1 ? 2 : 1;
  let last = 0;
  // eslint-disable-next-line for-direction
  for (let i: number = x; i < 8; i++) {
    const current = board[i][y];
    if (current === differentColor) {
      differentColorIsNext = true;
    } else if (current === c) {
      last = i;
      break;
    } else {
      canput = false;
    }
  }

  if (canput === true && differentColorIsNext === true) {
    return [last, y, true];
  } else {
    return [-1, -1, false];
  }
}

function rightToLeft(
  x: number,
  y: number,
  c: number,
  board: number[][],
): [number, number, boolean] {
  board[x][y] = c;
  let canput = true;
  let differentColorIsNext = false;
  const differentColor = c === 1 ? 2 : 1;
  let last = 0;
  // eslint-disable-next-line for-direction
  for (let i: number = x; i >= 0; i--) {
    const current = board[i][y];
    if (current === differentColor) {
      differentColorIsNext = true;
    } else if (current === c) {
      last = i;
      break;
    } else {
      canput = false;
    }
  }

  if (canput === true && differentColorIsNext === true) {
    return [last, y, true];
  } else {
    return [-1, -1, false];
  }
}

function canPut(x: number, y: number, c: number, board: number[][]): boolean {
  let ans = false;
  if (
    bottomToUp(x, y, c, board)[2] ||
    upToBottom(x, y, c, board)[2] ||
    leftToRight(x, y, c, board)[2] ||
    rightToLeft(x, y, c, board)[2]
  ) {
    ans = true;
  }
  console.log('done');
  return ans;
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

  const clickCell = (k: number, i: number) => {
    const board_copy = structuredClone(board);
    console.log('click');
    if (board_copy[i][k] === 0) {
      if (canPut(i, k, player, board_copy)) {
        //copy board
        board_copy[i][k] = player;

        setBoard(board_copy);
        // run if click
        if (player === 1) {
          setPlayer(2);
        } else {
          setPlayer(1);
        }
      } else {
        return;
      }
    }
  };

  return (
    <>
      <h1>hello</h1>
      <h2>Player: {player === 1 ? 'White' : 'Black'}</h2>
      <h2 className={styles.test}>world</h2>
      <div className={styles.board}>
        {board.map((row, i) =>
          row.map((cell, k) => (
            <div key={`${i}-${k}`} className={styles.cell} onClick={() => clickCell(k, i)}>
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
