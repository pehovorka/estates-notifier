import axios from "axios";
import {
  Provider,
  ProviderName,
  SrealityEstate,
  SrealityEstatesList,
} from "../interfaces";

const PAGE_SIZE = 5;
const MAX_PRICE = 16000;

const BASE_URL = "https://www.sreality.cz/api";
const PATH = `/cs/v2/estates?category_main_cb=1&category_sub_cb=2%7C3%7C4%7C5&category_type_cb=2&czk_price_summary_order2=0%7C${MAX_PRICE}&per_page=${PAGE_SIZE}&locality_country_id=112&locality_region_id=10`;
const URL = BASE_URL + PATH;

const categorySubCbToUrlString = (categorySubCb: number) => {
  switch (categorySubCb) {
    case 2:
      return "1+kk";
    case 3:
      return "1+1";
    case 4:
      return "2+kk";
    case 5:
      return "2+1";
    default:
      return "1+kk";
  }
};

const composeSourceUrl = (estate: SrealityEstate) => {
  return `https://www.sreality.cz/detail/pronajem/byt/${categorySubCbToUrlString(
    estate.seo.category_sub_cb
  )}/${estate.seo.locality}/${estate._links.self.href.split("/estates/")[1]}`;
};

const sreality: Provider = {
  name: ProviderName.sreality,
  fetchSource: async () => {
    const { data: list } = await axios.get<SrealityEstatesList>(URL);

    const estates: SrealityEstate[] = [];
    for (const estate of list._embedded.estates) {
      const estateUrl = BASE_URL + estate._links.self.href;
      try {
        const { data } = await axios.get<SrealityEstate>(estateUrl);
        estates.push(data);
      } catch (error) {
        console.error(error);
      }
    }
    return estates;
  },
  transform: (data: SrealityEstate[]) => {
    return data.map((estate) => ({
      id: estate._links.self.href.split("/estates/")[1].toString(),
      sourceId: estate._links.self.href.split("/estates/")[1],
      sourceUrl: composeSourceUrl(estate),
      gps: { lat: estate.map.lat, lon: estate.map.lon },
      locality: estate.locality.value,
      name: estate.name.value,
      price: estate.price_czk.value_raw,
      sourceProvider: ProviderName.sreality,
      primaryImageUrl: estate._embedded.images[0]._links.self.href,
      imageUrls: estate._embedded.images.map((image) => image._links.self.href),
      description: estate.text.value,
      details: estate.items.map(
        (item) => `${item.name}: ${item.value} ${item.unit ?? ""}`
      ),
      broker: `${
        estate._embedded.seller?.user_name
      } – ${estate._embedded.seller?.phones
        .map((phone) => `${phone.number}`)
        .join(", ")} | ${estate._embedded.seller?.email}`,
    }));
  },
};

export { sreality };
