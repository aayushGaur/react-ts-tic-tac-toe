import '../App.css';

interface Props {
  index: number,
  isGameOver: boolean,
  value: string | null,
  onSquarePress: (index: number) => void
}

const Square = (props: Props) => {

  const { index, isGameOver, value, onSquarePress} = props

  return (
    <button className={`square ${isGameOver ? 'square-game-over' :'square-game-active'}`} 
      onClick={() => onSquarePress(index) }>
      {value}
    </button>
  );
}

export default Square