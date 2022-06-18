import styles from '../Item/item.module.css';

const Item = (props) => {
	const { number, swap } = props;
	return <div className={styles.item} key={number} onClick={() => swap(number)}>
		{number}
	</div>
};

export default Item;
