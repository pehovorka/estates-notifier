import axios from "axios";
import {
  Provider,
  ProviderName,
  SrealityEstate,
  SrealityEstatesList,
} from "../interfaces";

const PAGE_SIZE = 5;
const MAX_PRICE = 12750;

const BASE_URL = "https://www.sreality.cz/api";
const PATH = `/cs/v2/estates?category_main_cb=1&category_sub_cb=2%7C3%7C4%7C5&category_type_cb=2&czk_price_summary_order2=0%7C${MAX_PRICE}&distance=5&per_page=${PAGE_SIZE}&ready_date=%7C2022-07-04&region=m%C4%9Bstsk%C3%A1+%C4%8D%C3%A1st+Dejvice&region_entity_id=13698&region_entity_type=ward&tms=1654112579260&usable_area=26%7C10000000000`;
const URL = BASE_URL + PATH;

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
      sourceUrl: `https://www.sreality.cz/detail/pronajem/byt/_/_/${
        estate._links.self.href.split("/estates/")[1]
      }`,
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
