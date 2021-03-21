import { PureComponent } from 'react'
import '../App.css';

interface Props {
  index: number,
  isGameOver: boolean,
  value: string | null,
  onSquarePress: (index: number) => void
}

export default class Square extends PureComponent<Props> {
  render() {
    const { index, isGameOver, value, onSquarePress } = this.props
    return (
      <button className={`square ${isGameOver ? 'square-game-over' :'square-game-active'}`} 
        onClick={() => onSquarePress(index) }>
        {value}
      </button>
    );
  }
}