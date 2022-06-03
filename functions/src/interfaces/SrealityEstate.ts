/* eslint-disable @typescript-eslint/no-empty-interface */
interface Text {
  name: string;
  value: string;
}

interface Value {
  distance: number;
  rating: number;
  description: string;
  index: number;
  url: string;
  lines: any[];
  lon: number;
  source: string;
  source_id: number;
  lat: number;
  review_count: number;
  photo_url: string;
  imgUrl: string;
  name: string;
}

interface PoiDoctors {
  url: string;
  values: Value[];
  name: string;
}

interface Poi {
  distance: number;
  rating: number;
  description: string;
  index: number;
  url: string;
  lines: any[];
  lon: number;
  source: string;
  source_id: number;
  lat: number;
  review_count: number;
  photo_url: string;
  imgUrl: string;
  name: string;
}

interface Seo {
  category_main_cb: number;
  category_sub_cb: number;
  category_type_cb: number;
  locality: string;
}

interface CodeItems {
  ownership: number;
  building_type_search: number;
}

interface Self {
  href: string;
}

interface Links {
  self: Self;
}

interface Favourite {
  is_favourite: boolean;
  _links: Links;
}

interface Category {
  category_main_cb: number;
  num: number;
}

interface Type {
  num: number;
  category_type_cb: number;
}

interface Specialization {
  category: Category[];
  type: Type[];
}

interface BrokerVideo {}

interface Phone {
  code: string;
  type: string;
  number: string;
}

interface Self2 {
  profile: string;
  href: string;
}

interface Links2 {
  self: Self2;
}

interface Phone2 {
  code: string;
  type: string;
  number: string;
}

interface Locality {
  lat: number;
  lon: number;
}

interface Self3 {
  profile: string;
  href: string;
}

interface Links3 {
  self: Self3;
}

interface Phone3 {
  role: string;
  number: string;
  country_code: string;
}

interface Email {
  role: string;
  email: string;
}

interface Ask {
  addr_city: string;
  description: string;
  firmy_review_url: string;
  phones: Phone3[];
  is_paid: boolean;
  emails: Email[];
  email: string;
  addr_zip: string;
  address: string;
  addr_street: string;
  addr_house_num: string;
}

interface Premise {
  www: string;
  phones: Phone2[];
  poi_logo: string;
  logo: string;
  company_subject_id: number;
  id: number;
  ico: number;
  locality: Locality;
  company_id: number;
  allow_calculator: number;
  logo_small: string;
  seznam_naplno: number;
  _links: Links3;
  retargeting_id: number;
  email: string;
  description: string;
  address: string;
  ask: Ask;
  name: string;
  url: string;
  ask_id: number;
  company_paid_firmy: number;
  www_visible: string;
}

interface Embedded2 {
  premise: Premise;
}

interface Ask2 {}

interface Seller {
  specialization_string: string;
  user_id: number;
  specialization: Specialization;
  broker_video: BrokerVideo;
  phones: Phone[];
  image: string;
  broker_ico: number;
  image_dynamic: string;
  active: boolean;
  offers: any[];
  _links: Links2;
  user_name: string;
  certificates: any[];
  broker_tip_description: string;
  _embedded: Embedded2;
  in_banner_seller: boolean;
  email: string;
  ask: Ask2;
}

interface Self4 {
  href: string;
}

interface Links4 {
  self: Self4;
}

interface Note {
  note: string;
  _links: Links4;
  has_note: boolean;
}

interface DynamicDown {
  href: string;
}

interface Gallery {
  href: string;
}

interface Self5 {
  href: string;
  title: string;
}

interface DynamicUp {
  href: string;
}

interface View {
  href: string;
}

interface Links5 {
  dynamicDown: DynamicDown;
  gallery: Gallery;
  self: Self5;
  dynamicUp: DynamicUp;
  view: View;
}

interface Image {
  kind: number;
  _links: Links5;
  id: number;
  order: number;
}

interface Embedded {
  favourite: Favourite;
  calculator?: any;
  seller?: Seller;
  note: Note;
  images: Image[];
  matterport_url: string;
}

interface Locality2 {
  name: string;
  value: string;
  accuracy: string;
}

interface Value2 {
  distance: number;
  rating: number;
  description: string;
  index: number;
  url: string;
  lines: any[];
  lon: number;
  source: string;
  source_id: number;
  lat: number;
  review_count: number;
  photo_url: string;
  imgUrl: string;
  name: string;
}

interface PoiLeisureTime {
  url: string;
  values: Value2[];
  name: string;
}

interface SimilarAdverts {
  href: string;
  title: string;
}

interface Self6 {
  profile: string;
  href: string;
  title: string;
}

interface LocalSearch {
  href: string;
  title: string;
}

interface BroaderSearch {
  href: string;
  title: string;
}

interface Links6 {
  similar_adverts: SimilarAdverts;
  self: Self6;
  local_search: LocalSearch;
  broader_search: BroaderSearch;
}

interface Value3 {
  distance: number;
  rating: number;
  description: string;
  index: number;
  url: string;
  lines: any[];
  lon: number;
  source: string;
  source_id: number;
  lat: number;
  review_count: number;
  photo_url: string;
  imgUrl: string;
  name: string;
}

interface PoiSchoolKindergarten {
  url: string;
  values: Value3[];
  name: string;
}

interface Map {
  lat: number;
  type: string;
  lon: number;
  zoom: number;
}

interface Value4 {
  distance: number;
  rating: number;
  description: string;
  index: number;
  url: string;
  lines: any[];
  lon: number;
  source: string;
  source_id: number;
  lat: number;
  review_count: number;
  photo_url: string;
  imgUrl: string;
  name: string;
}

interface PoiTransport {
  url: string;
  values: Value4[];
  name: string;
}

interface PriceCzk {
  unit: string;
  name: string;
  value: string;
  value_raw: number;
}

interface Name {
  name: string;
  value: string;
}

interface Value5 {
  distance: number;
  rating: number;
  description: string;
  index: number;
  url: string;
  lines: any[];
  lon: number;
  source: string;
  source_id: number;
  lat: number;
  review_count: number;
  photo_url: string;
  imgUrl: string;
  name: string;
}

interface PoiGrocery {
  url: string;
  values: Value5[];
  name: string;
}

interface Value6 {
  distance: number;
  rating: number;
  description: string;
  index: number;
  url: string;
  lines: any[];
  lon: number;
  source: string;
  source_id: number;
  lat: number;
  review_count: number;
  photo_url: string;
  imgUrl: string;
  name: string;
}

export interface PoiRestaurant {
  url: string;
  values: Value6[];
  name: string;
}

interface Item {
  negotiation: boolean;
  name: string;
  notes: any[];
  value: any;
  currency: string;
  type: string;
  unit: string;
  topped?: boolean;
  value_type: string;
}

export interface SrealityEstate {
  text: Text;
  poi_doctors: PoiDoctors;
  poi: Poi[];
  seo: Seo;
  codeItems: CodeItems;
  meta_description: string;
  _embedded: Embedded;
  locality: Locality2;
  panorama: number;
  poi_leisure_time: PoiLeisureTime;
  _links: Links6;
  poi_school_kindergarten: PoiSchoolKindergarten;
  logged_in: boolean;
  is_topped_today: boolean;
  map: Map;
  poi_transport: PoiTransport;
  price_czk: PriceCzk;
  rus: boolean;
  name: Name;
  poi_grocery: PoiGrocery;
  poi_restaurant: PoiRestaurant;
  items: Item[];
  is_topped: boolean;
  locality_district_id: number;
}
