import styles from '../Item/item.module.css';
// import * as frame from '../../assets/frames';

const Item = (props) => {
	const { number, swap } = props;
	return <img src={require(`../../assets/frames/landscape-${number}.png`)} className={styles.item} key={number} onClick={() => swap(number)} alt={`Frame ${number} of a landscape from Isla Victoria`} />
};

export default Item;
