//PT-003
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
    { duration: "10s", target: 200 },
    { duration: "30s", target: 200 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.1"],
    http_req_duration: ["p(95)<5000"],
    ...statusBreakdownMetrics,
  },
};

export default function () {
  const res = http.get(TARGET_URL);

  check(res, {
    "status é 200": (r) => r.status === 200,
  });

  sleep(0.3);
}

export function handleSummary(data: any) {
  return buildSummary(data, "homepage-spike");
}
