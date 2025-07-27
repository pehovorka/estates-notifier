import { scheduler } from "firebase-functions";
import { sreality, bezrealitky } from "./providers";
import { send } from "./sendEstate";
import { store } from "./storeEstates";

const providers = [sreality, bezrealitky];

export const checkEstates = scheduler.onSchedule(
  {
    schedule: "every 5 minutes",
    timeZone: "Europe/Prague",
    timeoutSeconds: 240,
    region: "europe-west3",
  },
  async () => {
    for (const provider of providers) {
      const res = await provider.fetchSource();
      const transformed = provider.transform(res);
      const newOffers = await store(transformed);

      for (const offer of newOffers) {
        await send(offer);
      }
    }
  }
);
