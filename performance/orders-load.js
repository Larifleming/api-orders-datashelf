import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 5,
  duration: '10s',
};

export default function () {
  const payload = JSON.stringify({
    orderId: `PERF-${Date.now()}`,
    customer: 'LoadTest',
    total: 100
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post('http://localhost:3000/orders', payload, params);

  check(res, {
    'status é 201': (r) => r.status === 201,
  });

  sleep(1);
}
