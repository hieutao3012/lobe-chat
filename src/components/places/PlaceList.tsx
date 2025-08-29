import { createStyles } from 'antd-style';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { Place } from '@/types/place';
import PlaceCard from './PlaceCard';

const useStyles = createStyles(({ css, responsive }) => ({
  container: css`
    width: 100%;
  `,
  grid: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    width: 100%;

    ${responsive.mobile} {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  `,
}));

interface PlaceListProps {
  places: Place[];
  onPlaceClick?: (place: Place) => void;
}

const PlaceList = memo<PlaceListProps>(({ places, onPlaceClick }) => {
  const { styles } = useStyles();

  return (
    <Flexbox className={styles.container}>
      <div className={styles.grid}>
        {places.map((place) => (
          <PlaceCard key={place.id} onClick={onPlaceClick} place={place} />
        ))}
      </div>
    </Flexbox>
  );
});

PlaceList.displayName = 'PlaceList';

export default PlaceList;