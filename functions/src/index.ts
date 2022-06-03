import * as functions from "firebase-functions";
import { sreality, bezrealitky } from "./providers";
import { send } from "./sendEstate";
import { store } from "./storeEstates";

const providers = [sreality, bezrealitky];

export const checkEstates = functions
  .region("europe-west3")
  .runWith({ timeoutSeconds: 240 })
  .pubsub.schedule("every 5 minutes")
  .timeZone("Europe/Prague")
  .onRun(async () => {
    for (const provider of providers) {
      const res = await provider.fetchSource();
      const transformed = provider.transform(res);
      const newOffers = await store(transformed);

      for (const offer of newOffers) {
        await send(offer);
      }
    }
  });
