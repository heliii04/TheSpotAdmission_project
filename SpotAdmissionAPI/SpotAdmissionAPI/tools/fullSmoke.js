const fetch = global.fetch || require('node-fetch');
const base = 'http://localhost:5000';
(async () => {
  try {
    const email = `smoketest_${Date.now()}@example.com`;
    // Register & login
    await fetch(`${base}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'Smoke Test', email, password: 'Password123' }) });
    let res = await fetch(`${base}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: 'Password123' }) });
    const login = await res.json();
    const token = login.token;
    console.log('Auth token present:', !!token);

    const publicGets = ['/','/podcast','/content','/testimonial','/video','/school','/college'];
    for (const p of publicGets) {
      res = await fetch(base + p);
      console.log('GET', p, res.status);
      await res.text().then(t => console.log(t.slice(0,120)));
    }

    // Form POSTs
    const forms = [
      { path: '/admissionform', body: { name: 'FormTest', email: email } },
      { path: '/counselingform', body: { name: 'CounselTest', email: email } },
      { path: '/careerform', body: { name: 'CareerTest', email: email } },
      { path: '/personalizedcounselingform', body: { name: 'PersTest', email: email } },
      { path: '/preprimaryform', body: { name: 'PPTest', email: email } },
    ];

    for (const f of forms) {
      res = await fetch(base + f.path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f.body) });
      console.log('POST', f.path, res.status);
      console.log(await res.text());
    }

    // Protected admin creates (expect 403)
    const adminCreates = [
      { path: '/school', body: { name: 'Test School' } },
      { path: '/college', body: { name: 'Test College' } },
    ];

    for (const a of adminCreates) {
      res = await fetch(base + a.path, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(a.body) });
      console.log('ADMIN POST', a.path, res.status);
      console.log(await res.text());
    }

    // Admission POST (protected user)
    res = await fetch(base + '/admission', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ name: 'AdmissionSmoke' }) });
    console.log('POST /admission', res.status, await res.text());

  } catch (err) { console.error('ERR', err.message); }
})();
