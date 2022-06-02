interface Seo {
  category_main_cb: number;
  category_sub_cb: number;
  category_type_cb: number;
  locality: string;
}

interface Self {
  profile: string;
  href: string;
  title: string;
}

interface Links {
  self: Self;
}

interface Favourite {
  is_favourite: boolean;
  _links: Links;
}

interface Self2 {
  profile: string;
  href: string;
  title: string;
}

interface Links2 {
  self: Self2;
}

interface Note {
  note: string;
  _links: Links2;
  has_note: boolean;
}

interface Company {
  url: string;
  id: number;
  name: string;
  logo_small: string;
}

interface Embedded2 {
  favourite: Favourite;
  note: Note;
  company: Company;
}

interface PriceCzk {
  value_raw: number;
  unit: string;
  name: string;
}

interface DynamicDown {
  href: string;
}

interface DynamicUp {
  href: string;
}

interface SrealityIterator {
  href: string;
}

interface Self3 {
  href: string;
}

interface Image {
  href: string;
}

interface ImageMiddle2 {
  href: string;
}

interface Links3 {
  dynamicDown: DynamicDown[];
  dynamicUp: DynamicUp[];
  iterator: SrealityIterator;
  self: Self3;
  images: Image[];
  image_middle2: ImageMiddle2[];
}

interface Gps {
  lat: number;
  lon: number;
}

interface Estate {
  labelsReleased: string[][];
  has_panorama: number;
  labels: string[];
  is_auction: boolean;
  labelsAll: string[][];
  seo: Seo;
  exclusively_at_rk: number;
  category: number;
  has_floor_plan: number;
  _embedded: Embedded2;
  paid_logo: number;
  locality: string;
  has_video: boolean;
  advert_images_count: number;
  new: boolean;
  auctionPrice: number;
  type: number;
  hash_id: any;
  attractive_offer: number;
  price: number;
  price_czk: PriceCzk;
  _links: Links3;
  rus: boolean;
  name: string;
  region_tip: number;
  gps: Gps;
  has_matterport_url: boolean;
}

interface Self4 {
  href: string;
}

interface Links4 {
  self: Self4;
}

interface IsSaved {
  email_notification: boolean;
  notification_advert_count: number;
  stack_id: number;
  push_notification: boolean;
  _links: Links4;
  removed: boolean;
  saved: boolean;
}

interface Self5 {
  profile: string;
  href: string;
  title: string;
}

interface Links5 {
  self: Self5;
}

interface NotPreciseLocationCount {
  result_size_auction: number;
  result_size: number;
  _links: Links5;
}

interface Embedded {
  estates: Estate[];
  is_saved: IsSaved;
  not_precise_location_count: NotPreciseLocationCount;
}

interface Filter {
  category_main_cb: string;
  distance: string;
  region_entity_id: number;
  category_sub_cb: string;
  usable_area: string;
  suggested_regionId: number;
  ready_date: string;
  czk_price_summary_order2: string;
  region_entity_type: string;
  suggested_districtId: number;
  region: string;
  category_type_cb: string;
}

interface Self6 {
  href: string;
}

interface ClustersWithBoundingBoxOfFirst10 {
  href: string;
}

interface Rss {
  href: string;
}

interface Links6 {
  self: Self6;
  clusters_with_bounding_box_of_first_10: ClustersWithBoundingBoxOfFirst10;
  rss: Rss;
}

interface FilterLabels2 {
  something_more3_3310: string;
  something_more1_3120: string;
  something_more1_3100: string;
  furnished_1: string;
  furnished_2: string;
  furnished_3: string;
  building_condition_9: string;
  something_more2_3150: string;
  something_more2_3130: string;
  ownership_1: string;
  ownership_3: string;
  ownership_2: string;
  something_more3_1820: string;
  energy_efficiency_rating_search_7: string;
  energy_efficiency_rating_search_6: string;
  energy_efficiency_rating_search_5: string;
  energy_efficiency_rating_search_4: string;
  energy_efficiency_rating_search_3: string;
  energy_efficiency_rating_search_2: string;
  energy_efficiency_rating_search_1: string;
  something_more1_3110: string;
  building_condition_6: string;
  something_more1_3090: string;
  building_condition_4: string;
  building_type_search_3: string;
  something_more2_3120: string;
  building_type_search_1: string;
  something_more2_3140: string;
  something_more1_200222: string;
  building_type_search_2: string;
}

export interface SrealityEstatesList {
  meta_description: string;
  result_size: number;
  _embedded: Embedded;
  filterLabels: any[];
  title: string;
  filter: Filter;
  _links: Links6;
  locality: string;
  locality_dativ: string;
  logged_in: boolean;
  per_page: number;
  category_instrumental: string;
  page: number;
  filterLabels2: FilterLabels2;
}
