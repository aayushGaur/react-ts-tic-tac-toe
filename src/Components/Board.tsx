import { Component } from 'react'

import Square from './Square'
import '../App.css';

interface Props {
  isGameOver: boolean,
  squares: (string | null)[],
  onSquarePress: (index:number) => void
}

export default class Board extends Component<Props> {
  renderSquare = (index: number) => {
    const { isGameOver, squares, onSquarePress } = this.props
    return <Square  
      index={index}
      isGameOver={isGameOver}
      value={squares[index]}
      onSquarePress={(index) => {
        onSquarePress(index)
      }} />
  }

  render() {
    return (
      <>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </>
    );
  }
}
