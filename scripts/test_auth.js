(async () => {
  try {
    const loginRes = await fetch('http://localhost:4000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-tenant-id': 'demo-hospital'
      },
      body: JSON.stringify({ email: 'admin@demo-hms.com', password: 'Admin@123' })
    });

    const login = await loginRes.json();
    console.log('LOGIN ->', login);

    if (!login.accessToken) {
      console.error('No accessToken returned');
      process.exit(1);
    }

    const meRes = await fetch('http://localhost:4000/api/v1/auth/me', {
      headers: {
        'Authorization': `Bearer ${login.accessToken}`,
        'x-tenant-id': 'demo-hospital'
      }
    });
    const me = await meRes.json();
    console.log('ME ->', me);
  } catch (err) {
    console.error('ERROR', err);
    process.exit(1);
  }
})();