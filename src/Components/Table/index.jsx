import { useEffect, useState } from 'react';
import Item from '../Item';
import styles from '../Table/table.module.css';
import WinnerModal from '../WinnerModal';

const initPuzzle = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const finishedPuzzle = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '-'];

const swapPieces = (puzzle, mobile, swapped) => {
  let newPuzzle = [];

  for (let i = 0; i < puzzle.length; i++) {
    if (i !== mobile && i !== swapped) {
      newPuzzle = [...newPuzzle, puzzle[i]];
    } else if (i === mobile) {
      newPuzzle = [...newPuzzle, puzzle[swapped]];
    } else {
      newPuzzle = [...newPuzzle, "-"];
    }
  }
  return newPuzzle;
};

const Table = () => {
  const [puzzle, setPuzzle] = useState([]);
  const [moves, setMoves] = useState([]);

	useEffect(() => {
		shuffleValues();
	}, []);

	const comparePuzzle = (finished, current) => {
		for (let i = 0 ; i < finished.length; i++) {
			if (finished[i] !== current[i]) {
				return false;
			}
		}
		return true;
	};
	
	// Implementation of the Shuffle-Yates algorithm
	const shuffleValues = () => {
		const values = [...initPuzzle];
		
		for (let i = values.length ; i > 1; i--) {
			let placeToShuffle = Math.floor(Math.random() * i--);
			let aux = values[placeToShuffle];
			values[placeToShuffle] = values[i];
			values[i] = aux;
		}
		
		setMoves([]);
		setPuzzle([...values, '-']);
	}

  const swapValues = (item) => {
    if (item !== '-') {
      const emptyPiece = puzzle.indexOf('-');
      const swappedPiece = puzzle.indexOf(item);
      // same row
      if (
        Math.floor(emptyPiece / 4) === Math.floor(swappedPiece / 4) &&
        (emptyPiece + 1 === swappedPiece || emptyPiece - 1 === swappedPiece)
      ) {
        setPuzzle(swapPieces(puzzle, emptyPiece, swappedPiece));
				setMoves([...moves, puzzle]);
      }
      // same column
      if (
        emptyPiece % 4 === swappedPiece % 4 &&
        (emptyPiece + 4 === swappedPiece || emptyPiece - 4 === swappedPiece)
      ) {
        setPuzzle(swapPieces(puzzle, emptyPiece, swappedPiece));
				setMoves([...moves, puzzle]);
      }
    }
  };

	const undoSwap = () => {
		if (moves.length > 0) {
			setPuzzle(moves[moves.length-1])
			setMoves(moves.slice(0, moves.length-1))
		}
	};

  return (
    <div>
			{comparePuzzle(finishedPuzzle, puzzle)
				? <WinnerModal onMoves={moves.length} playAgain={shuffleValues} />
				: null}
			
			<h1>Moves: {moves.length}</h1>
      <div className={styles.table}>
        {puzzle.map((item) => (
          <Item number={item} key={`${item}D`} swap={swapValues} />
        ))}
      </div>
			<div className={styles.undoButton} onClick={() => undoSwap()}>UNDO</div>
    </div>
  );
};

export default Table;
