// Click時のやることを減らす
// 候補地の計算は別の場所で行う。
// 再描写のタイミングを考えながら、、、、
// 候補地を、ユーザーのインプットと混同しない。
// 状態の中の情報を減らす。今0,1,2,3 -> 0,1,2
// Directions 方向を一つのところにまとめて、掛け算にて判定するようにする

'use client';
import { useState } from 'react';

const discColor = (num: number): string => {
  switch (num) {
    case 1:
      return 'white';
    case 2:
      return 'black';
    case 3:
      return 'gray';
    default:
      return 'transparent';
  }
};

function canPutWithPlace(
  x: number,
  y: number,
  c: number,
  board: number[][],
): [boolean, number[][]] {
  let ans = false;
  const directions: number[][] = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  const changeBoard: number[][] = [];
  const boardCopy: number[][] = structuredClone(board);
  for (const direction of directions) {
    const changeBoardTemp: number[][] = [[x, y]];
    const dx = direction[0];
    const dy = direction[1];
    const reverseColour: number[] = [0, 2, 1];

    let differentColorIsNext = false;
    for (let i: number = 1; i < 8; i++) {
      const cx: number = x + dx * i;
      const cy: number = y + dy * i;
      if (cx < 0 || cy < 0 || cx >= 8 || cy >= 8) continue;
      const current: number = boardCopy[cy][cx];

      if (current === 0) {
        break;
      } else if (current === reverseColour[c]) {
        changeBoardTemp.push([cx, cy]);
        differentColorIsNext = true;
      } else if (differentColorIsNext && current === c) {
        changeBoardTemp.push([cx, cy]);
        changeBoard.push(...changeBoardTemp);
        ans = true;
        console.log('true', dx, dy, x, y);
        break;
      } else if (current === c) {
        break;
      }
    }
  }

  return [ans, changeBoard];
}

const Home = () => {
  //othello board
  // 8 x 8
  // 1 is white, 2 is black
  const [board, setBoard] = useState<number[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [player, setPlayer] = useState<number>(2); // 1 is white, 2 is black

  const [status, setStatus] = useState<string>('Playing'); //Playing, pass and Game Set

  const boardWithNextDirection = (
    board: number[][],
    player: number,
    gameStatus: string,
  ): number[][] => {
    let board_copy = structuredClone(board);
    let userCanPut = false;

    for (let line: number = 0; line < 8; line++) {
      for (let cell: number = 0; cell < 8; cell++) {
        const resultCanPut = canPutWithPlace(line, cell, player, structuredClone(board));
        if (resultCanPut[0] === true && board_copy[cell][line] === 0) {
          board_copy[cell][line] = 3;
          userCanPut = true;
        }
      }
    }

    if (userCanPut === false && gameStatus === 'Playing') {
      {
        setStatus('Pass');
        setPlayer(player === 1 ? 2 : 1);
        board_copy = boardWithNextDirection(board_copy, player === 1 ? 2 : 1, 'pass');
      }
    } else if (userCanPut === false && gameStatus === 'pass') {
      setStatus('Game Set');

      //delete Next Direction
      board_copy = board_copy.map((line) => {
        line.map((disc) => {
          if (disc === 3) {
            return 0;
          } else {
            return disc;
          }
        });
        return line;
      });
    }

    return board_copy;
  };

  const clickCell = (x: number, y: number, p: number, s: string, board: number[][]) => {
    console.log('click');
    const board_copy = structuredClone(board);

    const current = structuredClone(board_copy[y][x]);

    if (current === 0) {
      const can = canPutWithPlace(x, y, p, structuredClone(board_copy));
      if (can[0] && (s === 'Playing' || s === 'Pass')) {
        if (s === 'Pass') {
          setStatus('Playing');
        }
        //copy board
        board_copy[y][x] = p;

        can[1].map((place) => {
          board_copy[place[1]][place[0]] = p;
        });

        //change turn
        if (current === 0) {
          if (p === 1) {
            setPlayer(2);
          } else {
            setPlayer(1);
          }
        }
      }
    }
    setBoard(board_copy);
  };

  const countDisc = (): [number, number] => {
    let white = 0;
    let black = 0;

    board.map((line) => {
      line.map((disc) => {
        if (disc === 1) {
          white++;
        } else if (disc === 2) {
          black++;
        }
      });
    });

    return [white, black];
  };

  const winner = (): string => {
    const count = countDisc();
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
    <div className="bg-slate-200 md:flex h-screen justify-center">
      <div className="md:flex md:flex-col justify-center m-8">
        <h1 className="m-4 text-6xl text-green-700 text-center font-semibold">Othello Game</h1>
        <div className="justify-between py-8 px-8 w-full max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
          <h2>Player: {player === 1 ? 'White' : 'Black'}</h2>
          <h3>
            Score
            <br />
            White: {countDisc()[0]} Black: {countDisc()[1]}
            <br />
            {winner()}
          </h3>
          <p>Status: {status}</p>
        </div>
        <button
          onClick={() => {
            window.location.reload();
          }}
          className="justify-center m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Reload
        </button>
      </div>
      <div className="flex justify-center items-center m-5 aspect-square">
        <div className="bg-green-800 grid grid-cols-8 aspect-square w-full">
          {boardWithNextDirection(board, player, status).map((row, i) =>
            row.map((cell, k) => (
              <div
                key={`${i}-${k}`}
                className="border border-black aspect-square"
                onClick={() => clickCell(k, i, player, status, structuredClone(board))}
              >
                {cell !== 0 && (
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
  );
};

export default Home;
