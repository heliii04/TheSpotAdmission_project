const fetch = global.fetch || require("node-fetch");
const base = "http://localhost:5000";

(async () => {
  try {
    const email = `testuser_${Date.now()}@example.com`;
    // Register
    let res = await fetch(`${base}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email,
        password: "Password123",
      }),
    });
    console.log("/auth/register", res.status);
    const reg = await res.json().catch(() => ({}));

    // Login
    res = await fetch(`${base}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: "Password123" }),
    });
    console.log("/auth/login", res.status);
    const login = await res.json();
    const token = login.token;
    console.log("token?", !!token);

    // Profile
    res = await fetch(`${base}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("/auth/profile", res.status);
    console.log(await res.json().catch(() => ({})));

    // POST /admission (protected)
    const admissionPayload = {
      name: "Test Admission",
      description: "Auto test",
    };
    res = await fetch(`${base}/admission`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(admissionPayload),
    });
    console.log("/admission POST", res.status);
    console.log(await res.json().catch(() => ({})));

    // GET /admission (admin only)
    res = await fetch(`${base}/admission`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("/admission GET", res.status);
    console.log(await res.text());
  } catch (err) {
    console.error("ERROR", err.message);
  }
})();
