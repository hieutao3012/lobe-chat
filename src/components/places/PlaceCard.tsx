import { createStyles } from 'antd-style';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { Place } from '@/types/place';

const useStyles = createStyles(({ css, token }) => ({
  card: css`
    position: relative;
    overflow: hidden;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: ${token.borderRadiusLG}px;
    background: ${token.colorBgContainer};
    transition: box-shadow 0.3s ease;
    cursor: pointer;

    &:hover {
      box-shadow: ${token.boxShadow};
    }
  `,
  image: css`
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-bottom: 1px solid ${token.colorBorderSecondary};
  `,
  content: css`
    padding: 16px;
  `,
  title: css`
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.4;
  `,
  rating: css`
    margin-bottom: 8px;
    font-size: 14px;
    color: ${token.colorSuccess};
  `,
  priceRange: css`
    margin-bottom: 8px;
    font-size: 14px;
    color: ${token.colorTextSecondary};
  `,
  category: css`
    display: inline-block;
    padding: 4px 8px;
    font-size: 12px;
    color: ${token.colorPrimary};
    background: ${token.colorPrimaryBg};
    border-radius: ${token.borderRadiusSM}px;
  `,
  address: css`
    margin-top: 8px;
    font-size: 13px;
    color: ${token.colorTextTertiary};
  `,
}));

interface PlaceCardProps {
  place: Place;
  onClick?: (place: Place) => void;
}

const PlaceCard = memo<PlaceCardProps>(({ place, onClick }) => {
  const { styles } = useStyles();

  // Get the first photo if available, otherwise use a placeholder
  const imageUrl = place.photos?.[0] || '/placeholder-place.jpg';

  // Format rating display
  const ratingDisplay = place.rating ? `${place.rating}/10` : 'Chưa có đánh giá';

  // Format price range display
  const priceRangeDisplay = place.price_range || 'Giá không xác định';

  return (
    <Flexbox className={styles.card} onClick={() => onClick?.(place)}>
      <img alt={place.name} className={styles.image} src={imageUrl} />
      <Flexbox className={styles.content}>
        <div className={styles.title}>{place.name}</div>
        <div className={styles.rating}>{ratingDisplay}</div>
        <div className={styles.priceRange}>{priceRangeDisplay}</div>
        {place.category_items && place.category_items.length > 0 && (
          <div className={styles.category}>{place.category_items[0]}</div>
        )}
        <div className={styles.address}>
          {place.address.district}, {place.address.city}
        </div>
      </Flexbox>
    </Flexbox>
  );
});

PlaceCard.displayName = 'PlaceCard';

export default PlaceCard;