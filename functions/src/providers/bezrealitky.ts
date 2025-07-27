import axios from "axios";
import { Provider, ProviderName, BezrealitkyEstatesList } from "../interfaces";

const BASE_URL = "https://api.bezrealitky.cz/graphql/";
const LIMIT = 5;
const MAX_PRICE = 12750;

const body = {
  operationName: "AdvertList",
  variables: {},
  query: `query AdvertList {\n  listAdverts(offerType: PRONAJEM, estateType: BYT, order: TIMEORDER_DESC, regionOsmId: "R435541", priceTo: ${MAX_PRICE}, limit: ${LIMIT}, roommate: false) {\n    list {\n      id\n      daysActive\n      visitCount\n      deposit\n      fee\n      surface\n      etage\n      description\n      price\n      charges\n      disposition\n      street\n      addressInput\n      address(locale: CS)\n      gps {\n        lat\n        lng\n      }\n      uri\n      mainImage {\n        url(filter: RECORD_MAIN)\n      }\n      publicImages {\n        url(filter: RECORD_MAIN)\n      }\n      formattedParameters(locale: CS) {\n        title\n        value\n      }\n      broker {\n        fullName\n      }\n    }\n  }\n}\n`,
};

const placeholderImageUrl =
  "https://www.bezrealitky.cz/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdefault_foto_small.085b9f78.jpg&w=640&q=75";

const bezrealitky: Provider = {
  name: ProviderName.bezrealitky,
  fetchSource: async () => {
    const { data } = await axios.post<BezrealitkyEstatesList>(BASE_URL, body);

    return data;
  },
  transform: (data: BezrealitkyEstatesList) => {
    return data.data.listAdverts.list.map((estate) => ({
      id: estate.id.toString(),
      sourceId: estate.id,
      sourceUrl: `https://www.bezrealitky.cz/nemovitosti-byty-domy/${estate.uri}`,
      gps: { lat: estate.gps.lat, lon: estate.gps.lng },
      locality: estate.address,
      name: `${formatDisposition(estate.disposition)}`,
      price: estate.price,
      servicesPrice: estate.charges,
      deposit: estate.deposit,
      sourceProvider: ProviderName.bezrealitky,
      primaryImageUrl: estate.mainImage?.url ?? placeholderImageUrl,
      imageUrls: estate.publicImages?.map(
        (image) => image?.url ?? placeholderImageUrl
      ),
      description: estate.description,
      details: estate.formattedParameters.map(
        (item) => `${item.title}: ${item.value}`
      ),
    }));
  },
};

const formatDisposition = (rawDisposition: string) => {
  switch (rawDisposition) {
    case "GARSONIERA":
      return "Garsoniéra";
    case "DISP_1_KK":
      return "1+kk";
    case "DISP_1_1":
      return "1+1";
    case "DISP_2_KK":
      return "2+kk";
    case "DISP_2_1":
      return "2+1";
    default:
      return rawDisposition;
  }
};

export { bezrealitky };
