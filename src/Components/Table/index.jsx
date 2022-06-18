import { useEffect, useState } from 'react';
import Item from '../Item';
import styles from '../Table/table.module.css';
import WinnerModal from '../WinnerModal';
const initPuzzle = [...Array(35).keys()];
const finishedPuzzle = [...Array(35).keys(), 'void'];

const Table = () => {
  const [puzzle, setPuzzle] = useState([]);
  const [moves, setMoves] = useState([]);
  const [showLandscape, setShowLandscape] = useState(false);
  
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
        newPuzzle = [...newPuzzle, "void"];
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
		setPuzzle([...values, 'void']);
	}

  // Swap values only if they are adjacent to the void
  const swapValues = (item) => {
    if (item !== 'void') {
      const emptyPiece = puzzle.indexOf('void');
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

  // Show landscape as a hint
  const toggleShowLandscape = () => {
    setShowLandscape(!showLandscape);
  };

	const undoSwap = () => {
		if (moves.length > 0) {
			setPuzzle(moves[moves.length-1])
			setMoves(moves.slice(0, moves.length-1))
		}
	};

  return (
    <div className={styles.puzzleContainer}>
			{comparePuzzle(finishedPuzzle, puzzle)
				? <WinnerModal onMoves={moves.length} playAgain={shuffleValues} />
				: null
      }
			<h1 className={styles.puzzleTitle}>Moves: {moves.length}</h1>
      { showLandscape
      ? <img 
        src={require('../../assets/frames/landscape-full.png')}
        alt="Full landscape of Isla victoria"
        className={styles.landscape}
      />
      : <div className={styles.table}>
        {puzzle.map((item) => (
          <Item number={item} key={`${item}D`} swap={swapValues} />
        ))}
      </div>}
      <div className={styles.buttonsContainer}>
        <div className={styles.undoButton} onClick={() => undoSwap()}>UNDO</div>
        <div 
          className={styles.showButton}
          onClick={() => toggleShowLandscape()}
        >
          {showLandscape ? 'HIDE' : 'SHOW'} LANDSCAPE
        </div>
      </div>
    </div>
  );
};

export default Table;
