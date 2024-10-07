import {getRandom} from '../burger-ingredients-choice/helper';
import styles from './styles.module.scss';

interface Props {
  _id: string;
  image: string;
}

export default function ingredientsImagesMap(ingredientsPictures: Props[]) {
  let imagesMap = [];

  if (ingredientsPictures.length < 6 && ingredientsPictures) {
    imagesMap = ingredientsPictures.map((image, index) => {
      return (
        <li
          key={image._id + index}
          className={styles.card__iconbox}
          style={{zIndex: 6 - index}}
        >
          <img className={styles.card__icon} src={image.image} alt={''} />
        </li>
      );
    });
  } else {
    imagesMap = ingredientsPictures.slice(0, 5).map((image, index) => {
      return (
        <li
          key={image._id + index}
          className={styles.card__iconbox}
          style={{zIndex: 6 - index}}
        >
          <img className={styles.card__icon} src={image.image} alt={''} />
        </li>
      );
    });
    imagesMap.push(
      <li
        className={styles.card__iconbox}
        style={{zIndex: 0, position: 'relative'}}
      >
        <img
          className={styles.card__icon}
          src={ingredientsPictures[5].image}
          alt=""
        />
        <div
          className={`${styles.card__icon_over} text text_type_digits-default`}
          style={{zIndex: 1}}
        >
          {`+${ingredientsPictures.length - 5}`}
        </div>
      </li>,
    );
  }
  return imagesMap;
}
