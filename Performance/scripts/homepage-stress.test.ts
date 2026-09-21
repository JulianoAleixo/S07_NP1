// @ts-ignore
import http from "k6/http";
// @ts-ignore
import { check, sleep } from "k6";
// @ts-ignore
import type { Options } from "k6/options";
import { TARGET_URL } from "../config/target.ts";
import { statusBreakdownMetrics } from "../config/options.ts";
import { buildSummary } from "../config/report.ts";

export const options: Options = {
  stages: [
    { duration: "30s", target: 20 },
    { duration: "30s", target: 50 },
    { duration: "30s", target: 100 },
    { duration: "30s", target: 150 },
    { duration: "1m", target: 150 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.05"],
    http_req_duration: ["p(95)<5000"],
    ...statusBreakdownMetrics,
  },
};

export default function () {
  const res = http.get(TARGET_URL);

  check(res, {
    "status é 200": (r) => r.status === 200,
  });

  sleep(0.5);
}

export function handleSummary(data: any) {
  return buildSummary(data, "homepage-stress");
}
