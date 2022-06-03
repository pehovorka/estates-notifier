interface Gps {
  lat: number;
  lng: number;
}

interface MainImage {
  url: string;
}

interface PublicImage {
  url: string;
}

interface FormattedParameter {
  title: string;
  value: string;
}

interface List {
  id: string;
  daysActive: string;
  visitCount: number;
  deposit: number;
  fee: number;
  surface: number;
  etage: number;
  description: string;
  price: number;
  charges: number;
  disposition: string;
  street: string;
  addressInput: string;
  address: string;
  gps: Gps;
  uri: string;
  mainImage: MainImage;
  publicImages: PublicImage[];
  formattedParameters: FormattedParameter[];
  broker?: any;
}

interface ListAdverts {
  list: List[];
}

interface Data {
  listAdverts: ListAdverts;
}

export interface BezrealitkyEstatesList {
  data: Data;
}
