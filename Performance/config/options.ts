export const loadThresholds = {
  http_req_failed: ["rate<0.01"],
  http_req_duration: ["p(95)<2000"],
};

export const statusBreakdownMetrics = {
  "http_reqs{status:200}": [],
  "http_reqs{status:403}": [],
  "http_reqs{status:429}": [],
  "http_reqs{status:500}": [],
  "http_reqs{status:502}": [],
  "http_reqs{status:503}": [],
  "http_reqs{status:504}": [],
  "http_reqs{status:0}": [],
};
