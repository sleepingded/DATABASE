// public/app.js
let currentUser = null;

const showError = (msg) => {
  document.querySelectorAll('#bookingResult, #statusResult').forEach(el => {
    el.textContent = `❌ ${msg}`;
    el.style.color = 'red';
  });
};

const showSuccess = (msg) => {
  document.querySelectorAll('#bookingResult, #statusResult').forEach(el => {
    el.textContent = `✅ ${msg}`;
    el.style.color = 'green';
  });
};

// Проверка авторизации и ролей
const checkAuth = async () => {
  try {
    const res = await fetch('/user/profile');
    if (!res.ok) throw new Error('Unauthorized');
    
    currentUser = await res.json();
    document.getElementById('userInfo').innerHTML = 
      `Пользователь: <strong>${currentUser.username}</strong> (роль: <strong>${currentUser.role}</strong>)`;
    
    // Показываем/скрываем по ролям
    if (currentUser.role === 'admin') {
      document.getElementById('adminSection').style.display = 'block';
    }
    
    document.getElementById('logoutBtn').style.display = 'inline-block';
  } catch (e) {
    document.getElementById('userInfo').innerHTML = 
      '❌ Не авторизован. <a href="/login">Войти</a>';
    window.location.href = '/login';
  }
};

document.getElementById('loadClients').onclick = async () => {
  try {
    const res = await fetch('/api/clients');
    const data = await res.json();
    const list = document.getElementById('clientsList');
    list.innerHTML = data.map(c => 
      `<li>${c.client_id}: ${c.full_name} (${c.phone})</li>`
    ).join('');
  } catch (e) {
    showError(e.message);
  }
};

document.getElementById('loadSessions').onclick = async () => {
  try {
    const res = await fetch('/api/sessions');
    const data = await res.json();
    const list = document.getElementById('sessionsList');
    list.innerHTML = data.map(s => 
      `<li>${s.session_id}: ${s.service_name} (${s.hall_name}) ${s.start_ts} → ${s.end_ts} [${s.status}]</li>`
    ).join('');
  } catch (e) {
    showError(e.message);
  }
};

document.getElementById('loadBookings').onclick = async () => {
  try {
    const res = await fetch('/api/bookings');
    const data = await res.json();
    const list = document.getElementById('bookingsList');
    list.innerHTML = data.map(b => 
      `<li>${b.booking_id}: ${b.client_name} → ${b.service_name} (${b.hall_name}) [${b.booking_status}]</li>`
    ).join('');
  } catch (e) {
    showError(e.message);
  }
};

document.getElementById('bookingForm').onsubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const body = {
    client_id: parseInt(form.client_id.value),
    session_id: parseInt(form.session_id.value),
  };
  
  try {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    if (res.ok) {
      showSuccess(text);
      document.getElementById('loadBookings').click(); // обновить список
    } else {
      showError(text);
    }
  } catch (e) {
    showError(e.message);
  }
};

document.getElementById('changeStatusForm').onsubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  
  try {
    const res = await fetch(`/api/bookings/${form.booking_id.value}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: form.status.value }),
    });
    const text = await res.text();
    if (res.ok) {
      showSuccess(text);
      document.getElementById('loadBookings').click(); // обновить список
    } else {
      showError(text);
    }
  } catch (e) {
    showError(e.message);
  }
};

document.getElementById('logoutBtn').onclick = () => {
  document.cookie = 'token=; Max-Age=0';
  document.cookie = 'role=; Max-Age=0';
  window.location.href = '/login';
};

// Автозагрузка при старте
window.onload = () => {
  checkAuth();
};
