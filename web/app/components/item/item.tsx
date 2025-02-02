import Image from 'next/image';

import styles from './style.module.scss';

type ItemProps = {
  name: string;
  quantity: number;
  outlineColor?: string;
  style?: React.CSSProperties;
};

const WIKI_IMAGE_BASE_URL: string = 'https://oldschool.runescape.wiki/images';

// A common case is items which have different sprites for each quantity from
// 1 to 5. A lot of range ammo falls into this category. This regex attempts to
// match as many of these items as possible.
const ONE_TO_FIVE_REGEX =
  /(arrow(\(p\+*\)|tips|heads)?|bolts( ?\((unf|e|p\+*)\))?)$/;

function is1to5Item(name: string): boolean {
  return name.match(ONE_TO_FIVE_REGEX) !== null;
}

/**
 * Converts an in-game item name to the filename of its image on the wiki.
 * Handles special cases like items whose sprites change based on quantity.
 *
 * @param name The full name of the item, as appears in game.
 * @param quantity Quantity of the item.
 * @returns The file stem of the item's image, without the `.png` extension.
 */
function normalize(name: string, quantity: number): string {
  // Treat locked items as their unlocked counterparts.
  name = name.replace(/\(l\)/, '');

  // The basic format of wiki image filenames takes the item name as it appears
  // in game (preserving case), and replaces spaces with underscores.
  const stem = name.trim().replaceAll(' ', '_');

  if (is1to5Item(name)) {
    // Items using a different sprite from 1-5 are suffixed with their quantity
    // on the wiki.
    const qty = Math.min(quantity, 5);
    return `${stem}_${qty}`;
  }

  return stem;
}

export default function Item(props: ItemProps) {
  const imageUrl = `${WIKI_IMAGE_BASE_URL}/${normalize(
    props.name,
    props.quantity,
  )}.png`;

  const quantityColor = 'yellow';

  let imageStyle: React.CSSProperties = { objectFit: 'contain' };
  if (props.outlineColor) {
    imageStyle.filter =
      `drop-shadow(1px 2px 0 ${props.outlineColor})` +
      ` drop-shadow(-1px -1px 0 ${props.outlineColor})`;
  }

  return (
    <div className={styles.image} style={props.style}>
      <Image src={imageUrl} alt={props.name} fill style={imageStyle} />
      {props.quantity > 1 && (
        <div className={styles.quantity} style={{ color: quantityColor }}>
          {props.quantity}
        </div>
      )}
    </div>
  );
}
