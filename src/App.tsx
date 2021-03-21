import react, { StrictMode , useState } from 'react'
import { clone, filter, remove } from 'lodash'

import Board from './Components/Board'
import './App.css';

const Game = () => {
   const [ isFirstPlayer, setIsFirstPlayer ] = useState<boolean>(true)
   const [ isGameOver, setIsGameOver ] = useState<boolean>(false)
   const [ winner, setWinner ] = useState<string|null>(null)
   const [ squares, setSquares ] = useState<(string|null)[][]>([
    [ null, null, null, null, null, null, null, null ],
  ])

  const getCurrentPlayer = () => isFirstPlayer ? 'X' : 'O'

  const computeWinner = (squares:(string| null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    if(filter(squares, (e) => e !== null).length !== 0) {
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] &&
            squares[a] === squares[c]) {
          return squares[a];
        }
      }
    } 

    return null
  }

  const getGameState = (squares: (string | null)[]) => {
    const winner = computeWinner(squares)
    return {
      winner: winner,
      isGameOver: winner !== null || squares.filter((value : string | null) => value === null).length === 0
    }
  }

  const navigateToStep = (navigateToStep: number) => {
    const isFirstPlayer = (navigateToStep % 2 === 0)
    remove(squares, (e, i) => (i >= navigateToStep + 1) && i > 0)

    setSquares([...squares])
    setIsFirstPlayer(isFirstPlayer)
    setIsGameOver(false)
    setWinner(null)
  }

  const handleSquarePress = (index: number) => {
    const currentBoardState = squares[squares.length - 1]
    const currentValue = currentBoardState[index]
    
    if(isGameOver) {
      window.alert(`Game is over - Player ${winner} has already won. \n Press reset to play another game.`)
    }
    else if(currentValue) {
      window.alert('Illegal move! Please add your symbol on an empty square.')
    }
    else {
      let updatedBoardState = clone(currentBoardState)
      updatedBoardState[index] = getCurrentPlayer()
      squares.push(updatedBoardState)

      const gameCurrentState = getGameState(updatedBoardState)
      
      setIsFirstPlayer(!isFirstPlayer)
      setIsGameOver(gameCurrentState.isGameOver)
      setWinner(gameCurrentState.winner)
      setSquares([...squares])
    }
  }
  
  return (
    <div className={'game'}>
      <div className="game-board">
        {winner
          ? <div className="status">Player {winner} WON !!</div>
          : <div className="status">Next player: {getCurrentPlayer()}</div>
        }
      </div>
      <div style={{ flexDirection:'row' }}>
        <Board 
          isGameOver={isGameOver}
          squares={squares[squares.length - 1]}
          onSquarePress={(index) => handleSquarePress(index)}
        />
        <div>
          {squares.map((s, i) => 
            <div key={i}>
              <br />
              <button onClick={() => navigateToStep(i)}>
                {i !== 0 ? `GO TO Step ${i}` : `RESET`}
              </button>
            </div>)}
        </div>
      </div>
    </div>
  )
}

export default Game