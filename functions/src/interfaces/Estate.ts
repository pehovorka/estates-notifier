import { BezrealitkyEstatesList } from "./BezrealitkyEstatesList";
import { SrealityEstate } from "./SrealityEstate";

export enum ProviderName {
  sreality = "Sreality",
  bezrealitky = "Bezrealitky",
}

export interface Estate {
  id: string;
  sourceId: string | number;
  sourceUrl: string;
  sourceProvider: ProviderName;
  name: string;
  locality: string;
  price: number;
  servicesPrice?: number;
  deposit?: number;
  gps: {
    lat: number;
    lon: number;
  };
  primaryImageUrl: string;
  imageUrls?: string[];
  description?: string;
  details?: string[];
  broker?: string;
}

export interface Provider {
  name: ProviderName;
  fetchSource: () => Promise<SrealityEstate[] | BezrealitkyEstatesList>;
  transform: (data: any) => Estate[];
}
