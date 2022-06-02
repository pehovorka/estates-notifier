import * as functions from "firebase-functions";
import { sreality as srealityProvider } from "./providers";
import { send } from "./sendEstate";
import { store } from "./storeEstates";

export const sreality = functions
  .region("europe-west3")
  .runWith({ timeoutSeconds: 180 })
  .pubsub.schedule("every 5 minutes")
  .timeZone("Europe/Prague")
  .onRun(async () => {
    const res = await srealityProvider.fetchSource();
    const transformed = srealityProvider.transform(res);
    const newOffers = await store(transformed);

    for (const offer of newOffers) {
      await send(offer);
    }
  });
