// src/index.ts
// Простой тест задержки RPC: делает несколько JSON-RPC запросов и считает среднее время.

// Список RPC-эндпоинтов (можешь позже добавить свои):
const targets = [
  { name: 'Ethereum Mainnet (Ankr)', url: 'https://rpc.ankr.com/eth' },
  { name: 'Arbitrum One', url: 'https://arb1.arbitrum.io/rpc' }
];

// Один "пинг": отправляем простой JSON-RPC запрос eth_blockNumber
async function pingOnce(url: string): Promise<number> {
  const t0 = Date.now();
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_blockNumber', params: [] })
  });
  // читаем ответ (нам важно время, содержимое не анализируем)
  await res.text();
  const dt = Date.now() - t0;
  return dt;
}

// Несколько попыток, чтобы посчитать min/max/avg
async function pingStats(url: string, tries = 3) {
  const times: number[] = [];
  for (let i = 0; i < tries; i++) {
    try {
      const t = await pingOnce(url);
      times.push(t);
    } catch (e) {
      // Если запрос упал — вернём ошибку выше
      throw e;
    }
  }
  const sum = times.reduce((a, b) => a + b, 0);
  return {
    avg: Math.round(sum / times.length),
    min: Math.min(...times),
    max: Math.max(...times)
  };
}

// Главная функция: обходим все цели и печатаем таблицу + JSON
(async () => {
  const results: any[] = [];
  for (const t of targets) {
    try {
      const stats = await pingStats(t.url, 3);
      results.push({ name: t.name, ...stats });
    } catch (e) {
      results.push({ name: t.name, error: String(e) });
    }
  }
  console.table(results);
  console.log('\nJSON output:\n', JSON.stringify(results, null, 2));
})();
