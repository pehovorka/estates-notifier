import axios from "axios";
import {
  FilesUploadResponse,
  MessageAttachment,
  WebClient,
} from "@slack/web-api";

import { Estate } from "./interfaces";

// Read a token from the environment variables
const token = process.env.SLACK_TOKEN;

// Initialize
const web = new WebClient(token);

const CHANNEL = "C03J2LEU3T6";

const send = async (estate: Estate) => {
  const text = `*${estate.name} – ${estate.locality} (${
    estate.sourceProvider
  })*\n
${estate.price} Kč | <${
    estate.sourceUrl
  }|Sreality.cz> | <https://mapy.cz/zakladni?source=coor&id=${
    estate.gps.lon
  }%2C${estate.gps.lat}|Mapy.cz>\n
>${estate.description && estate.description.replace(/(?:\r\n|\r|\n)/g, "\n>")}\n
${estate.details?.map((detail) => `• ${detail}`).join("\n")}\n
_${estate.broker}_`;

  const message = await web.chat.postMessage({
    channel: CHANNEL,
    text: text,
    username: estate.sourceProvider,
  });

  const uploadResults: FilesUploadResponse[] = [];

  if (estate.imageUrls) {
    for (const image of estate.imageUrls) {
      const result = await web.files.upload({
        channels: CHANNEL,
        thread_ts: message.ts,
        file: await downloadImage(image),
        title: `${estate.name} – ${estate.locality}`,
        filename: "image.jpg",
      });
      uploadResults.push(result);
    }
  }

  const attachments: MessageAttachment[] = [
    {
      title: `${estate.name} – ${estate.locality}`,
      image_url: uploadResults[0].file?.permalink,
    },
  ];

  web.chat.update({
    channel: CHANNEL,
    ts: message.ts ?? "1",
    text: message.message?.text,
    attachments: attachments,
  });
};

const downloadImage = async (url: string) => {
  return axios
    .get<Buffer>(url, {
      responseType: "stream",
    })
    .then((res) => res.data);
};

export { send };
