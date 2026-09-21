// @ts-ignore
import http from "k6/http";
// @ts-ignore
import { check, sleep } from "k6";
// @ts-ignore
import type { Options } from "k6/options";
import { TARGET_URL } from "../config/target.ts";
import { loadThresholds } from "../config/options.ts";
import { buildSummary } from "../config/report.ts";

export const options: Options = {
  stages: [
    { duration: "30s", target: 20 },
    { duration: "1m", target: 20 },
    { duration: "20s", target: 0 },
  ],
  thresholds: loadThresholds,
};

export default function () {
  const res = http.get(TARGET_URL);

  check(res, {
    "status é 200": (r) => r.status === 200,
    "corpo contém o título da página": (r) =>
      typeof r.body === "string" && r.body.includes("Juliano Aleixo"),
  });

  sleep(1);
}

export function handleSummary(data: any) {
  return buildSummary(data, "homepage-load");
}
