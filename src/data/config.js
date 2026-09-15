export const DONATION_URL = "https://buymeacoffee.com/cyuen";
export const REPOSITORY_URL = "https://github.com/cyko-design/mindlens";
export const assetUrl = (name) => `${import.meta.env.BASE_URL}assets/${name}`;
export const canonicalUrl = () =>
  new URL(import.meta.env.BASE_URL, window.location.origin).href;
export const CITY_MARKETS = {
  "Kuala Lumpur/Klang Valley": "Malaysia",
  Singapore: "Singapore",
  Bangkok: "Thailand",
  Hanoi: "Vietnam",
  "Ho Chi Minh City": "Vietnam",
  Jakarta: "Indonesia",
  Beijing: "China",
  Shanghai: "China",
  Guangzhou: "China",
  Shenzhen: "China",
  "Hong Kong": "China",
  Taipei: "China",
  Tokyo: "Japan",
  Osaka: "Japan",
  Seoul: "South Korea",
};
