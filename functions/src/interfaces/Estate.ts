import { SrealityEstatesList } from ".";

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
  gps: {
    lat: number;
    lon: number;
  };
  imageUrl: string;
}

export interface Provider {
  name: ProviderName;
  fetchSource: () => Promise<SrealityEstatesList>;
  transform: (data: SrealityEstatesList) => Estate[];
}
