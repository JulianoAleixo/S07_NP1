// @ts-ignore
import { textSummary } from "https://jslib.k6.io/k6-summary/0.1.0/index.js";
// @ts-ignore
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function buildSummary(data: any, reportName: string) {
  return {
    [`Performance/reports/${reportName}.html`]: htmlReport(data),
    [`Performance/reports/${reportName}.json`]: JSON.stringify(data, null, 2),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
