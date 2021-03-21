import React, { StrictMode } from 'react'
import { clone, filter, remove } from 'lodash'

import Board from './Components/Board'
import './App.css';

interface State {
  isFirstPlayer: boolean,
  isGameOver: boolean,
  winner: string | null,
  squares: (null | string)[][]
}


const initialState: State = {
  isFirstPlayer: true,
  isGameOver: false,
  winner: null,
  squares: [
    [ null, null, null, null, null, null, null, null ],
  ],
}

export default class Game extends React.Component<{},State> {
   state: State = initialState
  
  handleSquarePress = (index: number) => {
    const { isFirstPlayer, isGameOver, squares, winner } = this.state
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
      updatedBoardState[index] = this.getCurrentPlayer()
      squares.push(updatedBoardState)

      const gameCurrentState = this.getGameState(updatedBoardState)
      
      this.setState({
        isFirstPlayer: !isFirstPlayer,
        isGameOver: gameCurrentState.isGameOver,
        squares: squares,
        winner: gameCurrentState.winner,
      })
    }
  }

  handleResetPress = () => this.setState(initialState)
  

  render() {
    const { isGameOver, squares, winner } = this.state
    const currentPlayer = this.getCurrentPlayer()

    return (
      <StrictMode>
        <div className={'game'}>
          <div className="game-board">
            {winner
              ? <div className="status">Player {winner} WON !!</div>
              : <div className="status">Next player: {currentPlayer}</div>
            }
          </div>
          <div style={{ flexDirection:'row' }}>
            <Board 
              isGameOver={isGameOver}
              squares={squares[squares.length - 1]}
              onSquarePress={(index) => this.handleSquarePress(index)}
            />
            <div>
              {squares.map((s, i) => 
                <div key={i}>
                  <br />
                  <button onClick={() => this.navigateToStep(i)}>
                    {i !== 0 ? `GO TO Step ${i}` : `RESET`}
                  </button>
                </div>)}
            </div>
          </div>
        </div>
      </StrictMode>
    )
  }

  getCurrentPlayer = () => this.state.isFirstPlayer ? 'X' : 'O'

  getGameState = (squares: (string | null)[]) => {
    const winner = this.computeWinner(squares)
    return {
      winner: winner,
      isGameOver: winner !== null || squares.filter((value : string | null) => value === null).length === 0
    }
  }

  navigateToStep = (navigateToStep: number) => {
    const { squares } = this.state
    const isFirstPlay = (navigateToStep % 2 === 0)
    remove(squares, (e, i) => (i >= navigateToStep + 1) && i > 0)

    this.setState({ 
      squares: squares, 
      isFirstPlayer: isFirstPlay,
      winner: null,
      isGameOver: false,
    })
  }

  computeWinner = (squares:(string| null)[]) => {
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
}
