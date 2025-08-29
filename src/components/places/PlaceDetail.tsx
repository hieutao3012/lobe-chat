import { Button, Modal } from 'antd';
import { createStyles } from 'antd-style';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { Place } from '@/types/place';

const useStyles = createStyles(({ css, token }) => ({
  modal: css`
    .ant-modal-content {
      border-radius: ${token.borderRadiusLG}px;
    }
  `,
  header: css`
    position: relative;
    overflow: hidden;
    border-radius: ${token.borderRadiusLG}px ${token.borderRadiusLG}px 0 0;
  `,
  image: css`
    width: 100%;
    height: 300px;
    object-fit: cover;
  `,
  imageOverlay: css`
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7));
  `,
  closeButton: css`
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 2;
  `,
  title: css`
    position: absolute;
    bottom: 16px;
    left: 16px;
    z-index: 2;
    color: white;
    font-size: 24px;
    font-weight: 600;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  `,
  content: css`
    padding: 24px;
  `,
  section: css`
    margin-bottom: 24px;
  `,
  sectionTitle: css`
    margin-bottom: 12px;
    font-size: 18px;
    font-weight: 600;
    color: ${token.colorText};
  `,
  infoRow: css`
    display: flex;
    margin-bottom: 8px;
  `,
  infoLabel: css`
    width: 120px;
    font-weight: 500;
    color: ${token.colorTextSecondary};
  `,
  infoValue: css`
    flex: 1;
    color: ${token.colorText};
  `,
  rating: css`
    font-size: 20px;
    font-weight: 600;
    color: ${token.colorSuccess};
  `,
  priceRange: css`
    font-size: 16px;
    font-weight: 500;
    color: ${token.colorText};
  `,
  categories: css`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  `,
  category: css`
    padding: 4px 12px;
    font-size: 14px;
    color: ${token.colorPrimary};
    background: ${token.colorPrimaryBg};
    border-radius: ${token.borderRadiusSM}px;
  `,
  openTimes: css`
    font-size: 14px;
    color: ${token.colorText};
  `,
  actionButton: css`
    width: 100%;
    margin-top: 16px;
  `,
}));

interface PlaceDetailProps {
  open: boolean;
  place?: Place;
  onClose: () => void;
  onAddToItinerary?: (place: Place) => void;
}

const PlaceDetail = memo<PlaceDetailProps>(
  ({ open, place, onClose, onAddToItinerary }) => {
    const { styles } = useStyles();

    if (!place) return null;

    // Get the first photo if available, otherwise use a placeholder
    const imageUrl = place.photos?.[0] || '/placeholder-place.jpg';

    // Format rating display
    const ratingDisplay = place.rating ? `${place.rating}/10` : 'Chưa có đánh giá';

    // Format price range display
    const priceRangeDisplay = place.price_range || 'Giá không xác định';

    return (
      <Modal
        className={styles.modal}
        footer={null}
        open={open}
        styles={{
          body: { padding: 0 },
        }}
        width={800}
        onCancel={onClose}
      >
        <Flexbox>
          <Flexbox className={styles.header}>
            <img alt={place.name} className={styles.image} src={imageUrl} />
            <Flexbox className={styles.imageOverlay} />
            <div className={styles.title}>{place.name}</div>
          </Flexbox>
          
          <Flexbox className={styles.content}>
            <Flexbox className={styles.section}>
              <Flexbox horizontal justify={'space-between'}>
                <div className={styles.rating}>{ratingDisplay}</div>
                <div className={styles.priceRange}>{priceRangeDisplay}</div>
              </Flexbox>
              
              <div className={styles.categories}>
                {place.category_items.map((category, index) => (
                  <div className={styles.category} key={index}>
                    {category}
                  </div>
                ))}
              </div>
            </Flexbox>
            
            <Flexbox className={styles.section}>
              <div className={styles.sectionTitle}>Thông tin địa điểm</div>
              <div className={styles.infoRow}>
                <div className={styles.infoLabel}>Địa chỉ:</div>
                <div className={styles.infoValue}>
                  {place.address.street}, {place.address.district}, {place.address.city}
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoLabel}>Loại hình:</div>
                <div className={styles.infoValue}>
                  {place.category_cuisines.join(', ')}
                </div>
              </div>
            </Flexbox>
            
            <Flexbox className={styles.section}>
              <div className={styles.sectionTitle}>Giờ mở cửa</div>
              <div className={styles.openTimes}>
                {place.open_times.map((time, index) => (
                  <div key={index}>{time}</div>
                ))}
              </div>
            </Flexbox>
            
            <Button
              className={styles.actionButton}
              onClick={() => onAddToItinerary?.(place)}
              type="primary"
            >
              Thêm vào lịch trình
            </Button>
          </Flexbox>
        </Flexbox>
      </Modal>
    );
  },
);

PlaceDetail.displayName = 'PlaceDetail';

export default PlaceDetail;
