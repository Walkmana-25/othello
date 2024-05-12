'use client';
import styles from './index.module.css';
import { useState } from 'react';

const discColor = (num: number): string => {
  if (num === 1) {
    return 'white';
  } else if (num === 2) {
    return 'black';
  } else {
    return 'transparent';
  }
};

function bottomToUp(x: number, y: number, c: number, board: number[][]): [number, number, boolean] {
  board[y][x] = c;
  let canput = true;
  let differentColorIsNext = false;
  const differentColor = c === 1 ? 2 : 1;
  let last = 0;
  for (let i: number = y - 1; i >= 0; i--) {
    const current = board[i][x];
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
  board[y][x] = c;
  let canput = true;
  let differentColorIsNext = false;
  const differentColor = c === 1 ? 2 : 1;
  let last = 0;
  // eslint-disable-next-line for-direction
  for (let i: number = y + 1; i < 8; i++) {
    const current = board[i][x];
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
  board[y][x] = c;
  let canput = true;
  let differentColorIsNext = false;
  const differentColor = c === 1 ? 2 : 1;
  let last = 0;
  // eslint-disable-next-line for-direction
  for (let i: number = x + 1; i < 8; i++) {
    const current = board[y][i];
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
  const result1 = bottomToUp(x, y, c, structuredClone(board))[2];
  const result2 = upToBottom(x, y, c, structuredClone(board))[2];
  const result3 = leftToRight(x, y, c, structuredClone(board))[2];
  const result4 = rightToLeft(x, y, c, structuredClone(board))[2];
  if (result1 || result2 || result3 || result4) {
    ans = true;
  }
  console.log('1:', result1);
  console.log('2:', result2);
  console.log('3:', result3);
  console.log('4:', result4);
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

  const clickCell = (x: number, y: number) => {
    const board_copy = structuredClone(board);
    console.log('click');
    if (board_copy[y][x] === 0) {
      if (canPut(x, y, player, structuredClone(board_copy))) {
        //copy board
        board_copy[y][x] = player;

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
      <h1>othello</h1>
      <h2>Player: {player === 1 ? 'White' : 'Black'}</h2>
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
