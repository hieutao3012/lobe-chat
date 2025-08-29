// src/types/place.ts
export interface Address {
  street: string;
  district: string;
  city: string;
}

export interface MenuItem {
  name: string;
  price: string;
  image: string;
}

export interface Review {
  title: string;
  content: string;
  score: string;
  photos: string[];
  username: string;
  time: string;
  device: string;
  options: string[];
  hashtags: string[];
}

export interface PhotoAlbum {
  url: string;
  width: number;
  height: number;
}

export interface Place {
  id: string;
  name: string;
  category_items: string[];
  category_cuisines: string[];
  address: Address;
  price_range: string | null;
  rating: string;
  open_times: string[];
  reviews?: Review[];
  photos?: string[];
  professional_photos?: string[];
  community_photos?: string[];
  videos?: string[];
  menu?: MenuItem[];
  menu_album_images?: string[];
  url: string;
}