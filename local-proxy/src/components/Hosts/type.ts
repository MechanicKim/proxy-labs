export interface Target {
  protocol: "http" | "https";
  host: "localhost" | "www.kurly.com" | "now.kurly.com" | "event.kurly.com";
  port: 3000 | 3001 | 3002 | 443;
  desc: string;
};
