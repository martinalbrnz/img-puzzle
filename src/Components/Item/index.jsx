import styles from '../Item/item.module.css';

const Item = (props) => {
	const { showNumbers, number, swap } = props;
	return (
		<div
			className={styles.imgContainer}
			onClick={() => swap(number)}
		>
			<img
				key={number}
				src={require(`../../assets/frames/landscape-${number}.png`)}
				alt={`Frame ${number} of a landscape from Isla Victoria`} 
				className={styles.item}
			/>

			{showNumbers
				? <p className={styles.cardNumber}>{number !== 'void' ? number : ''}</p>
				: null
			}
		</div>)
};

export default Item;
