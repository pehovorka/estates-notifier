import axios from "axios";
import { WebClient } from "@slack/web-api";

import { Estate } from "./interfaces";

// Read a token from the environment variables
const token = process.env.SLACK_TOKEN;

// Initialize
const web = new WebClient(token);

const send = async (estate: Estate) => {
  await web.files.upload({
    initial_comment: `*${estate.name} – ${estate.locality} (${estate.sourceProvider})*\n
    - Cena: ${estate.price} Kč\n
    - <${estate.sourceUrl}|Sreality.cz>, <https://mapy.cz/zakladni?source=coor&id=${estate.gps.lon}%2C${estate.gps.lat}|Mapy.cz>`,
    channels: "C03JBR418KT",
    file: await downloadImage(estate.imageUrl),
    title: `${estate.name} – ${estate.locality}`,
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
