async function fetchData() {
  const response = await fetch('http://localhost:2221/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'admin',
      password: 'Admin123',
    }),
  });

  if (!response.ok) {
    console.error(`HTTP Error: ${response.status}`);
    const text = await response.text();
    console.error('Response:', text);
    return;
  }

  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    const text = await response.text();
    console.error('Response:', text);
  }
}

fetchData();
