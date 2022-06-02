import * as functions from "firebase-functions";
import { sreality as srealityProvider } from "./providers";
import { send } from "./sendEstate";
import { store } from "./storeEstates";

export const sreality = functions
  .region("europe-west3")
  .https.onRequest(async (request, response) => {
    const res = await srealityProvider.fetchSource();
    const transformed = srealityProvider.transform(res);
    const newOffers = await store(transformed);
    await send(newOffers[0]);
    response.send(newOffers);
  });
