import Square from './Square'
import '../App.css';

interface Props {
  isGameOver: boolean,
  squares: (string | null)[],
  onSquarePress: (index:number) => void
}

const Board = (props: Props) => {

  const renderSquare = (index: number) => {
    const { isGameOver, squares, onSquarePress } = props
    return <Square  
      index={index}
      isGameOver={isGameOver}
      value={squares[index]}
      onSquarePress={(index) => {
        onSquarePress(index)
      }} />
  }

  return (
    <>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </>)
}

export default Board