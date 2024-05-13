'use client';
import styles from './index.module.css';
import { useState } from 'react';

const discColor = (num: number): string => {
  if (num === 1) {
    return 'white';
  } else if (num === 2) {
    return 'black';
  } else if (num === 3) {
    return 'gray';
  } else {
    return 'transparent';
  }
};

function update_board(x: number, y: number, range: number[][], board: number[][]): number[][] {
  const current_color = board[y][x];

  for (const [dx, dy] of range) {
    if (dx === -1 || dy === -1) continue;
    //上から下の場合
    else if (x === dx && y > dy) {
      console.log('上から下の場合');
      // eslint-disable-next-line for-direction
      for (let i = y; i >= dy; i--) {
        board[i][x] = current_color;
      }
    } else if (x === dx && y < dy) {
      // 下から上の場合
      console.log('下から上の場合');
      // eslint-disable-next-line for-direction
      for (let i = y; i <= dy; i++) {
        board[i][x] = current_color;
      }
    } else if (y === dy && x < dx) {
      //左から右の場合
      console.log('左から右の場合');
      // eslint-disable-next-line for-direction
      for (let i = x; i <= dx; i++) {
        board[y][i] = current_color;
      }
    } else if (y === dy && x > dx) {
      //右から左の場合
      console.log('右から左の場合');
      // eslint-disable-next-line for-direction
      for (let i = x; i >= dx; i--) {
        board[y][i] = current_color;
      }
    } else if (x < dx && y < dy) {
      //左下から右上の場合
      console.log('左下から右上の場合');
      let j = y;
      // eslint-disable-next-line for-direction
      for (let i = x; i <= dx; i++) {
        board[j][i] = current_color;
        j++;
        if (i === dx || j === dy) break;
      }
    } else if (x > dx && y > dy) {
      //右上から左下の場合
      console.log('右上から左下の場合');
      let j = y;
      // eslint-disable-next-line for-direction
      for (let i = x; i >= dx; i--) {
        board[j][i] = current_color;
        j--;
        if (i === dx || j === dy) break;
      }
    } else if (x > dx && y < dy) {
      //左上から右下の場合
      console.log('左上から右下の場合');
      let j = y;
      // eslint-disable-next-line for-direction
      for (let i = x; i >= dx; i--) {
        board[j][i] = current_color;
        j++;
        if (i === dx || j === dy) break;
      }
    } else if (x < dx && y > dy) {
      //右下から左上の場合
      console.log('右下から左上の場合');
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
  let differentColorIsNext = false;
  const differentColor = c === 1 ? 2 : 1;
  let last = 0;
  for (let i: number = y - 1; i >= 0; i--) {
    const current = board[i][x];
    if (current === 3 || current === 0) {
      return [-1, -1, false];
    }
    if (current === differentColor) {
      differentColorIsNext = true;
    } else if (current === c && differentColorIsNext === true) {
      last = i;
      return [last, i, true];
    } else {
      return [-1, -1, false];
    }
  }

  return [-1, -1, false];
}

function upToBottom(x: number, y: number, c: number, board: number[][]): [number, number, boolean] {
  board[y][x] = c;
  let differentColorIsNext = false;
  const differentColor = c === 1 ? 2 : 1;
  let last = 0;
  // eslint-disable-next-line for-direction
  for (let i: number = y + 1; i < 8; i++) {
    const current = board[i][x];
    if (current === 3 || current === 0) {
      return [-1, -1, false];
    }
    if (current === differentColor) {
      differentColorIsNext = true;
    } else if (current === c && differentColorIsNext === true) {
      last = i;
      return [x, last, true];
    } else {
      return [-1, -1, false];
    }
  }

  return [-1, -1, false];
}
function leftToRight(
  x: number,
  y: number,
  c: number,
  board: number[][],
): [number, number, boolean] {
  board[y][x] = c;
  let differentColorIsNext = false;
  const differentColor = c === 1 ? 2 : 1;
  let last = 0;
  // eslint-disable-next-line for-direction
  for (let i: number = x + 1; i < 8; i++) {
    const current = board[y][i];
    if (current === 3 || current === 0) {
      return [-1, -1, false];
    }
    if (current === differentColor) {
      differentColorIsNext = true;
    } else if (current === c && differentColorIsNext === true) {
      last = i;
      return [last, y, true];
    } else {
      return [-1, -1, false];
    }
  }

  return [-1, -1, false];
}

function rightToLeft(
  x: number,
  y: number,
  c: number,
  board: number[][],
): [number, number, boolean] {
  board[y][x] = c;
  let differentColorIsNext = false;
  const differentColor = c === 1 ? 2 : 1;
  let last = 0;
  // eslint-disable-next-line for-direction
  for (let i: number = x - 1; i >= 0; i--) {
    const current = board[y][i];
    if (current === 3 || current === 0) {
      return [-1, -1, false];
    }
    if (current === differentColor) {
      differentColorIsNext = true;
    } else if (current === c && differentColorIsNext === true) {
      last = i;
      return [last, y, true];
    } else {
      return [-1, -1, false];
    }
  }

  return [-1, -1, false];
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
    if (current === 3 || current === 0) {
      return [-1, -1, false];
    }
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
    if (current === 3 || current === 0) {
      return [-1, -1, false];
    }
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

    const current = board[j][i];
    if (current === 3 || current === 0) {
      return [-1, -1, false];
    }
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
    if (current === 3 || current === 0) {
      return [-1, -1, false];
    }

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
    [0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 3, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 3, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [player, setPlayer] = useState<number>(2); // 1 is white, 2 is black

  const [status, setStatus] = useState<string>('Playing');

  const clickCell = (x: number, y: number, p: number, s: string, board_copy: number[][]) => {
    console.log('click');
    if (s === 'Game Set') {
      return;
    }
    const current = structuredClone(board_copy[y][x]);

    if (current === 3) {
      const can = canPut(x, y, p, structuredClone(board_copy));
      if (can[0] && (s === 'Playing' || s === 'Pass')) {
        //copy board
        board_copy[y][x] = p;

        // eslint-disable-next-line no-param-reassign
        board_copy = update_board(x, y, can[1], board_copy);
      }
    }
    // run if click
    if (current === 3 || s === 'progress') {
      if (p === 1) {
        setPlayer(2);
        // eslint-disable-next-line no-param-reassign
        p = 2;
      } else {
        setPlayer(1);
        // eslint-disable-next-line no-param-reassign
        p = 1;
      }
    }

    // set recommend location
    let next_can_put = false;

    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        // reset recommend
        if (board_copy[y][x] === 3) {
          board_copy[y][x] = 0;
        }

        // set new recommend
        const can = canPut(x, y, p, structuredClone(board_copy));
        if (can[0] === true && board_copy[y][x] === 0) {
          board_copy[y][x] = 3;
          next_can_put = true;
        }
      }
    }
    setBoard(board_copy);

    if (next_can_put === false) {
      if (s === 'progress') {
        setStatus('Game Set');
        return;
      }
      setStatus('Pass');
      clickCell(x, y, p, 'progress', structuredClone(board_copy));
    }
  };
  const count_disc = (): [number, number] => {
    let white = 0;
    let black = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (board[i][j] === 1) {
          white++;
        } else if (board[i][j] === 2) {
          black++;
        }
      }
    }
    return [white, black];
  };

  const winner = (): string => {
    const count = count_disc();
    if (status === 'Game Set') {
      if (count[0] > count[1]) {
        return 'White Win!!';
      } else if (count[0] < count[1]) {
        return 'Black Win!!';
      } else {
        return 'Draw';
      }
    }
    return '';
  };

  return (
    <>
      <title>Othello</title>
      <div className="bg-slate-200 md:flex h-screen justify-center">
        <div className="md:flex md:flex-col justify-center m-8">
          <h1 className="m-4 text-6xl text-green-700 text-center font-semibold">Othello Game</h1>
          <div className="justify-between py-8 px-8 w-full max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
            <h2>Player: {player === 1 ? 'White' : 'Black'}</h2>
            <h3>
              Score
              <br />
              White: {count_disc()[0]} Black: {count_disc()[1]}
              <br />
              {winner()}
            </h3>
            <p>Status: {status}</p>
          </div>
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Reload
          </button>
        </div>
        <div className="flex justify-center items-center m-5 aspect-square">
          <div className="bg-green-800 grid grid-cols-8 aspect-square w-full">
            {board.map((row, i) =>
              row.map((cell, k) => (
                <div
                  key={`${i}-${k}`}
                  //className={styles.cell}
                  className="border border-black aspect-square"
                  onClick={() => clickCell(k, i, player, status, structuredClone(board))}
                >
                  {cell !== 0 && (
                    //<div className={styles.disc} style={{ backgroundColor: discColor(cell) }} />
                    <div
                      className="rounded-full flex justify-center items-center m-2 h-3/4 w-3/4 aspect-square"
                      style={{ backgroundColor: discColor(cell) }}
                    />
                  )}
                </div>
              )),
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
