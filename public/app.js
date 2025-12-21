document.getElementById('loadClients').onclick = async () => {
  const res = await fetch('/api/clients');
  const text = await res.text();
  try {
    const data = JSON.parse(text);
    const list = document.getElementById('clientsList');
    list.innerHTML = '';
    data.forEach((c) => {
      const li = document.createElement('li');
      li.textContent = `${c.client_id}: ${c.full_name} (${c.phone})`;
      list.appendChild(li);
    });
  } catch (e) {
    alert(text);
  }
};

document.getElementById('loadSessions').onclick = async () => {
  const res = await fetch('/api/sessions');
  const text = await res.text();
  try {
    const data = JSON.parse(text);
    const list = document.getElementById('sessionsList');
    list.innerHTML = '';
    data.forEach((s) => {
      const li = document.createElement('li');
      li.textContent = `${s.session_id}: ${s.service_name} ${s.start_ts} зал: ${s.hall_name}`;
      list.appendChild(li);
    });
  } catch (e) {
    alert(text);
  }
};

document.getElementById('bookingForm').onsubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const body = {
    client_id: parseInt(form.client_id.value),
    session_id: parseInt(form.session_id.value),
  };
  const res = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  document.getElementById('bookingResult').textContent = text;
};
