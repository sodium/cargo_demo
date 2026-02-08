export interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover: {
    url: string;
    alternativeText: string;
  };
}

export interface BannerContentChild {
  type: string;
  text: string;
}

export interface BannerContentBlock {
  type: string;
  children: BannerContentChild[];
  level: number;
}

export interface Banner {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: {
    url: string;
    alternativeText: string;
  };
  button_text: string;
  button_url: string;
  content: BannerContentBlock[];
}

export interface ArticleResponse {
  data: Article[];
}

export interface BannerResponse {
  data: Banner[];
}

export interface HeaderFooterItem {
  id: number;
  documentId: string;
  name: string;
  english_text: string;
  chinese_text: string;
  english_url: string;
  chinese_url: string;
  slug: string;
  display_as_image: boolean;
  section: string;
  group: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  external_site: boolean;
  image: {
    url: string;
    alternativeText: string;
  };
}

export interface HeaderFooterResponse {
  data: HeaderFooterItem[];
}

