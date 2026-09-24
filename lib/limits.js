// ─── Shared daily limits for /api/chat and /api/tts ───
// Two layers, counted per day (UTC):
//   1. per device  (X-Device-Id header, random ID kept in the browser)
//   2. per IP      (a looser ceiling, so a whole school on one WiFi still works,
//                   but someone faking device IDs can't drain everything)
// In-memory per server instance, resets on cold start: a soft limit.

var maps = {};

function dayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function getIp(request) {
  var fwd = request.headers.get('x-forwarded-for') || '';
  return fwd.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown';
}

export function getDeviceId(request) {
  var id = (request.headers.get('x-device-id') || '').trim();
  // accept only sane-looking IDs
  return /^[A-Za-z0-9-]{8,64}$/.test(id) ? id : '';
}

// Returns true if allowed (and counts it), false if over a limit.
export function checkLimits(bucket, request, perDevice, perIp) {
  var today = dayKey();
  var map = maps[bucket] || (maps[bucket] = new Map());

  // drop yesterday's counters
  map.forEach(function (v, k) {
    if (k.slice(-10) !== today) map.delete(k);
  });

  var ipKey = 'ip:' + getIp(request) + ':' + today;
  var device = getDeviceId(request);
  // no device ID (old cached page, storage blocked) → fall back to the IP as the "device"
  var devKey = 'dev:' + (device || getIp(request)) + ':' + today;

  var ipCount = map.get(ipKey) || 0;
  var devCount = map.get(devKey) || 0;
  if (devCount >= perDevice || ipCount >= perIp) return false;

  map.set(ipKey, ipCount + 1);
  map.set(devKey, devCount + 1);
  return true;
}
