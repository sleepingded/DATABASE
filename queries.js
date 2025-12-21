// queries.js
// CLIENT
const getClients        = 'select * from client order by client_id';
const getClientById     = 'select * from client where client_id = $1';
const addClient         = 'insert into client(full_name, phone, birth_date) values ($1,$2,$3)';
const updateClient      = 'update client set full_name = $1, phone = $2, birth_date = $3 where client_id = $4';
const removeClient      = 'delete from client where client_id = $1';

// SESSION
const getSessions       = 'select * from vw_schedule_public order by start_ts';
const getSessionById    = 'select * from session where session_id = $1';
const addSessionViaView =
  'insert into vw_schedule_public(service_name, trainer_name, hall_name, start_ts, end_ts, price, status) values ($1,$2,$3,$4,$5,$6,$7)';
const updateSessionStatus =
  'update session set status = $1 where session_id = $2';
const removeSession     = 'delete from session where session_id = $1';

// BOOKING
const getBookings       = 'select * from vw_bookings_detailed order by booking_ts desc';
const getBookingById    = 'select * from vw_bookings_detailed where booking_id = $1';
const updateBookingStatus =
  'update booking set status = $1 where booking_id = $2';
const removeBooking     = 'delete from booking where booking_id = $1';

// PROCEDURE
const procCreateBooking = 'call proc_create_booking($1,$2)';
const procCancelSession = 'call proc_cancel_session($1)';

// FUNCTION
const fnTrainerLoad =
  'select * from fn_trainer_load($1,$2,$3)';
const fnScheduleInRange =
  'select * from fn_schedule_in_range($1,$2)';

module.exports = {
  getClients,
  getClientById,
  addClient,
  updateClient,
  removeClient,
  getSessions,
  getSessionById,
  addSessionViaView,
  updateSessionStatus,
  removeSession,
  getBookings,
  getBookingById,
  updateBookingStatus,
  removeBooking,
  procCreateBooking,
  procCancelSession,
  fnTrainerLoad,
  fnScheduleInRange,
};
