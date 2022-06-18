import { useEffect, useState } from 'react';
import Item from '../Item';
import styles from '../Table/table.module.css';
import WinnerModal from '../WinnerModal';

const initPuzzle = [...Array(35).keys()];
const finishedPuzzle = [...Array(35).keys(), '-'];

const Table = () => {
  const [puzzle, setPuzzle] = useState([]);
  const [moves, setMoves] = useState([]);
  
	useEffect(() => {
    shuffleValues();
	}, []);

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
  
	const comparePuzzle = (finished, current) => {
		for (let i = 0 ; i < finished.length; i++) {
			if (finished[i] !== current[i]) {
				return false;
			}
		}
		return true;
	};
	
	// Implementation of the shuffle algorithm Fisher-Yates
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

  // Swap values only if they are adjacent to the -
  const swapValues = (item) => {
    if (item !== '-') {
      const emptyPiece = puzzle.indexOf('-');
      const swappedPiece = puzzle.indexOf(item);
      // same row
      if (
        Math.floor(emptyPiece / 6) === Math.floor(swappedPiece / 6) &&
        (emptyPiece + 1 === swappedPiece || emptyPiece - 1 === swappedPiece)
      ) {
        setPuzzle(swapPieces(puzzle, emptyPiece, swappedPiece));
				setMoves([...moves, puzzle]);
      }
      // same column
      if (
        emptyPiece % 6 === swappedPiece % 6 &&
        (emptyPiece + 6 === swappedPiece || emptyPiece - 6 === swappedPiece)
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
