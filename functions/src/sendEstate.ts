import axios from "axios";
import {
  FilesCompleteUploadExternalResponse,
  WebAPICallResult,
  WebClient,
} from "@slack/web-api";

import { Estate, ProviderName } from "./interfaces";

type UploadResult = WebAPICallResult & {
  files: FilesCompleteUploadExternalResponse[];
};

// Read a token from the environment variables
const token = process.env.SLACK_TOKEN;

// Initialize
const web = new WebClient(token);

// Dev
// const CHANNEL = "C03J28W1HV4";

// Prod
const CHANNEL = "C03J2LEU3T6";

const downloadImage = async (url: string) => {
  return axios
    .get<Buffer>(url, {
      responseType: "stream",
    })
    .then((res) => res.data);
};

const uploadFiles = async (estate: Estate) => {
  const uploadResults: UploadResult[] = [];

  if (estate.imageUrls) {
    for (const image of estate.imageUrls) {
      const result = (await web.files.uploadV2({
        file: await downloadImage(image),
        title: `${estate.name} – ${estate.locality} (${
          uploadResults.length + 1
        }/${estate.imageUrls.length})`,
        filename: "image.jpg",
      })) as UploadResult;

      uploadResults.push(result);
    }
  }

  return uploadResults;
};

const send = async (estate: Estate) => {
  const text = `*${estate.name} – ${estate.locality} (${
    estate.sourceProvider
  })*\n
${estate.price} Kč | ${
    estate.servicesPrice ? "+ " + estate.servicesPrice + "Kč | " : ""
  }${estate.deposit ? "Kauce " + estate.deposit + "Kč | " : ""}<${
    estate.sourceUrl
  }|${estate.sourceProvider}.cz> | <https://mapy.cz/zakladni?source=coor&id=${
    estate.gps.lon
  }%2C${estate.gps.lat}|Mapy.cz>\n
>${estate.description && estate.description.replace(/(?:\r\n|\r|\n)/g, "\n>")}\n
${estate.details?.map((detail) => `• ${detail}`).join("\n")}\n
${estate.broker ? "_" + estate.broker + "_" : ""}`;

  const files = await uploadFiles(estate);

  const attachmentsString = files
    .map((file) => `<${file.files[0].files?.[0].permalink}| >`)
    .join("");

  await web.chat.postMessage({
    channel: CHANNEL,
    text: text + attachmentsString,
    username: estate.sourceProvider,
    icon_url:
      estate.sourceProvider === ProviderName.sreality
        ? "https://www.sreality.cz/img/sreality-app-logo2.png"
        : estate.sourceProvider === ProviderName.bezrealitky
        ? "https://www.bezrealitky.cz/favicon.png"
        : "",
  });
};

export { send };
