export interface ArtInfo {
  image_url: string;
  texture_url: string;
  description: string;
}

export interface ArtItemType {
  name: string;
  url: string;
  image_url?: string;
  fake_image_url?: string;
  texture_url?: string;
  fake_texture_url?: string;

  has_fake: boolean;

  art_name: string;
  art_type: "Painting" | "Statue";
  author: string;
  year: string;
  art_style: string;
  description?: string;
  authenticity?: string;

  buy: number | string;
  sell: number | string;

  availability: string;

  width: number | string;
  length: number | string;

  real_info?: ArtInfo;
  fake_info?: ArtInfo | null;

  translations?: {
    koKr?: string;
  };
}
