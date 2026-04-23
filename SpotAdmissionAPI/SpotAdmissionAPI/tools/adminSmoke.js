const fetch = global.fetch || require('node-fetch');
const base = 'http://localhost:5000';
(async () => {
  try {
    const email = `admin_${Date.now()}@example.com`;
    // Register admin
    let res = await fetch(`${base}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'Admin User', email, password: 'AdminPass123', role: 'admin' }) });
    console.log('/auth/register (admin)', res.status);
    console.log(await res.text().catch(() => ({})));

    // Login
    res = await fetch(`${base}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: 'AdminPass123' }) });
    console.log('/auth/login', res.status);
    const login = await res.json();
    const token = login.token;
    if (!token) { console.error('No token returned; aborting'); return; }
    console.log('admin token present:', !!token);

    // Create School (admin)
    res = await fetch(base + '/school', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ name: 'Admin Created School', overview: 'Created by smoke test' }) });
    console.log('POST /school', res.status);
    console.log(await res.text().catch(() => ({})));

    // Create College (admin)
    res = await fetch(base + '/college', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ name: 'Admin Created College', overview: 'Created by smoke test' }) });
    console.log('POST /college', res.status);
    console.log(await res.text().catch(() => ({})));

    // Get Admissions (admin-only)
    res = await fetch(base + '/admission', { headers: { Authorization: `Bearer ${token}` } });
    console.log('GET /admission (admin)', res.status);
    console.log(await res.text().catch(() => ({})));

  } catch (err) { console.error('ERR', err.message); }
})();