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

function update_board(x: number, y: number, range: number[][], board: number[][]): number[][] {
  const current_color = board[y][x];

  for (const [dx, dy] of range) {
    //上から下の場合
    if (x === dx && y > dy) {
      // eslint-disable-next-line for-direction
      for (let i = y; i >= dy; i--) {
        board[i][x] = current_color;
      }
    } else if (x === dx && y < dy) {
      // 下から上の場合
      // eslint-disable-next-line for-direction
      for (let i = y; i <= dy; i++) {
        board[i][x] = current_color;
      }
    } else if (y === dy && x < dx) {
      //左から右の場合
      // eslint-disable-next-line for-direction
      for (let i = x; i <= dx; i++) {
        board[y][i] = current_color;
      }
    } else if (y === dy && x > dx) {
      //右から左の場合
      // eslint-disable-next-line for-direction
      for (let i = x; i >= dx; i--) {
        board[y][i] = current_color;
      }
    } else if (x < dx && y < dy) {
      //左下から右上の場合
      let j = y;
      // eslint-disable-next-line for-direction
      for (let i = x; i <= dx; i++) {
        board[j][i] = current_color;
        j++;
        if (i === dx || j === dy) break;
      }
    } else if (x > dx && y > dy) {
      //右上から左下の場合
      let j = y;
      // eslint-disable-next-line for-direction
      for (let i = x; i >= dx; i--) {
        board[j][i] = current_color;
        j--;
        if (i === dx || j === dy) break;
      }
    } else if (x > dx && y < dy) {
      //左上から右下の場合
      let j = y;
      // eslint-disable-next-line for-direction
      for (let i = x; i >= dx; i--) {
        board[j][i] = current_color;
        j++;
        if (i === dx || j === dy) break;
      }
    }
    //右下から左上の場合
    else if (x < dx && y > dy) {
      let j = y;
      // eslint-disable-next-line for-direction
      for (let i = x; i <= dx; i++) {
        board[j][i] = current_color;
        j--;
        if (i === dx || j === dy) break;
      }
    }
  }

  return board;
}

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
  board[y][x] = c;
  let canput = true;
  let differentColorIsNext = false;
  const differentColor = c === 1 ? 2 : 1;
  let last = 0;
  // eslint-disable-next-line for-direction
  for (let i: number = x - 1; i >= 0; i--) {
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

function leftBottomToRightUp(
  x: number,
  y: number,
  c: number,
  board: number[][],
): [number, number, boolean] {
  board[y][x] = c;
  let differentColorIsNext = false;
  const differentColor = c === 1 ? 2 : 1;
  let last = 0;
  let j = y - 1;
  // eslint-disable-next-line for-direction
  for (let i: number = x + 1; i < 8; i++) {
    if (i < 0 || j < 0 || 7 < i || 7 < j) return [-1, -1, false];
    const current = board[j][i];
    if (current === differentColor) {
      differentColorIsNext = true;
    } else if (current === c && differentColorIsNext === true) {
      last = i;
      return [last, j, true];
    } else {
      return [-1, -1, false];
    }
    j--;
  }

  return [-1, -1, false];
}

function rightUpToLeftBottom(
  x: number,
  y: number,
  c: number,
  board: number[][],
): [number, number, boolean] {
  board[y][x] = c;
  let differentColorIsNext = false;
  const differentColor = c === 1 ? 2 : 1;
  let last = 0;
  let j = y + 1;
  // eslint-disable-next-line for-direction
  for (let i: number = x - 1; i >= 0; i--) {
    if (i < 0 || j < 0 || 7 < i || 7 < j) return [-1, -1, false];
    const current = board[j][i];
    if (current === differentColor) {
      differentColorIsNext = true;
    } else if (current === c && differentColorIsNext === true) {
      last = i;
      return [last, j, true];
    } else {
      return [-1, -1, false];
    }
    j++;
  }

  return [-1, -1, false];
}

function rightBottomToLeftUp(
  x: number,
  y: number,
  c: number,
  board: number[][],
): [number, number, boolean] {
  board[y][x] = c;
  let differentColorIsNext = false;
  const differentColor = c === 1 ? 2 : 1;
  let last = 0;
  let j = y - 1;
  // eslint-disable-next-line for-direction
  for (let i: number = x - 1; i >= 0; i--) {
    if (i < 0 || j < 0 || 7 < i || 7 < j) return [-1, -1, false];

    const current = board[i][j];
    if (current === differentColor) {
      differentColorIsNext = true;
    } else if (current === c && differentColorIsNext === true) {
      last = i;
      return [last, j, true];
    } else {
      return [-1, -1, false];
    }
    j--;
  }
  return [-1, -1, false];
}

function leftUpToRightBottom(
  x: number,
  y: number,
  c: number,
  board: number[][],
): [number, number, boolean] {
  board[y][x] = c;
  let differentColorIsNext = false;
  const differentColor = c === 1 ? 2 : 1;
  let last = 0;
  let j = y + 1;
  // eslint-disable-next-line for-direction
  for (let i: number = x + 1; i < 8; i++) {
    if (i < 0 || j < 0 || 7 < i || 7 < j) return [-1, -1, false];

    const current = board[j][i];
    if (current === differentColor) {
      differentColorIsNext = true;
    } else if (current === c && differentColorIsNext === true) {
      last = i;
      return [last, j, true];
    } else {
      return [-1, -1, false];
    }
    j++;
  }

  return [-1, -1, false];
}

function canPut(x: number, y: number, c: number, board: number[][]): [boolean, number[][]] {
  let ans = false;
  const result = [];
  const result1 = bottomToUp(x, y, c, structuredClone(board));
  const result2 = upToBottom(x, y, c, structuredClone(board));
  const result3 = leftToRight(x, y, c, structuredClone(board));
  const result4 = rightToLeft(x, y, c, structuredClone(board));
  const result5 = leftBottomToRightUp(x, y, c, structuredClone(board));
  const result6 = rightUpToLeftBottom(x, y, c, structuredClone(board));
  const result7 = rightBottomToLeftUp(x, y, c, structuredClone(board));
  const result8 = leftUpToRightBottom(x, y, c, structuredClone(board));

  if (
    result1[2] ||
    result2[2] ||
    result3[2] ||
    result4[2] ||
    result5[2] ||
    result6[2] ||
    result7[2] ||
    result8[2]
  ) {
    ans = true;
  }
  result.push([result1[0], result1[1]]);
  result.push([result2[0], result2[1]]);
  result.push([result3[0], result3[1]]);
  result.push([result4[0], result4[1]]);
  result.push([result5[0], result5[1]]);
  result.push([result6[0], result6[1]]);
  result.push([result7[0], result7[1]]);
  result.push([result8[0], result8[1]]);

  console.log('1:', result1[2]);
  console.log('2:', result2[2]);
  console.log('3:', result3[2]);
  console.log('4:', result4[2]);
  console.log('5:', result5[2]);
  console.log('6:', result6[2]);
  console.log('7:', result7[2]);
  console.log('8:', result8[2]);

  console.log('done');
  return [ans, result];
}

const Home = () => {
  //othello board
  // 8 x 8
  // 1 is white, 2 is black
  const [board, setBoard] = useState<number[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [player, setPlayer] = useState<number>(1); // 1 is white, 2 is black

  const clickCell = (x: number, y: number) => {
    let board_copy = structuredClone(board);
    console.log('click');
    if (board_copy[y][x] === 0) {
      const can = canPut(x, y, player, structuredClone(board_copy));
      if (can[0]) {
        //copy board
        board_copy[y][x] = player;

        board_copy = update_board(x, y, can[1], board_copy);

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
