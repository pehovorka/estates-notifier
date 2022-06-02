import axios from "axios";
import { Provider, ProviderName, SrealityEstatesList } from "../interfaces";

const BASE_URL = "https://www.sreality.cz/api/cs/v2/";
const PAGE_SIZE = 5;
const PATH = `estates?category_main_cb=1&category_sub_cb=2%7C3%7C4%7C5&category_type_cb=2&czk_price_summary_order2=0%7C12500&distance=5&per_page=${PAGE_SIZE}&ready_date=%7C2022-07-04&region=m%C4%9Bstsk%C3%A1+%C4%8D%C3%A1st+Dejvice&region_entity_id=13698&region_entity_type=ward&tms=1654112579260&usable_area=26%7C10000000000`;
const URL = BASE_URL + PATH;

const sreality: Provider = {
  name: ProviderName.sreality,
  fetchSource: async () => {
    const { data } = await axios.get<SrealityEstatesList>(URL);
    return data;
  },
  transform: (data) => {
    return data._embedded.estates.map((estate) => ({
      id: estate.hash_id.toString(),
      sourceId: estate.hash_id,
      sourceUrl: `https://www.sreality.cz/detail/pronajem/byt/_/_/${estate.hash_id}`,
      gps: estate.gps,
      locality: estate.locality,
      name: estate.name,
      price: estate.price_czk.value_raw,
      sourceProvider: ProviderName.sreality,
      imageUrl:
        estate._links.image_middle2[0].href.split("?fl")[0] +
        "?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
    }));
  },
};

export { sreality };
