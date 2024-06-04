import { useState } from 'react';
import './App.css'

interface SquareProps {
  value: string,
  onSquareClick: any
}

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [isXNext, setisXNext] = useState<boolean>(true);
  const [squares, setSquares] = useState<Array<string>>(Array<string>(9).fill(''));

  const winner = calculateWinner(squares);
  let status: string;
  if(winner)
    status = 'Winner: ' + winner;
  else
    status = "Next player: " + (isXNext? 'X':'O');

  function handleClick(i: number) {
    const nextSquares = squares.slice();

    if(squares[i] || winner)
      return
    
    if(isXNext)
      nextSquares[i] = "X";
    else
      nextSquares[i] = "O";
    
    setSquares(nextSquares);
    setisXNext(!isXNext);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}

function calculateWinner(squares: Array<string>): string {
  const lines: Array<Array<number>> = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c])
      return squares[a];
  }

  return '';
}