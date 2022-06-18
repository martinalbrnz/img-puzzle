import styles from '../WinnerModal/winnerModal.module.css';

const WinnerModal = (props) => {
	const { onMoves, playAgain } = props;
	return (
		<div className={styles.modalBackground}>
			<div className={styles.modalContainer}>
				<h2 className={styles.modalMessage}>You won on {onMoves} moves!</h2>
				<p className={styles.playAgain} onClick={() => playAgain()}>Play again</p>
			</div>
		</div>
	)
};

export default WinnerModal;
