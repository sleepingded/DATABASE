// queries.js
// CLIENT
const getClients        = 'select * from sport.client order by client_id';
const getClientById     = 'select * from sport.client where client_id = $1';
const addClient         = 'insert into sport.client(full_name, phone, birth_date) values ($1,$2,$3)';
const updateClient      = 'update sport.client set full_name = $1, phone = $2, birth_date = $3 where client_id = $4';
const removeClient      = 'delete from sport.client where client_id = $1';

// SESSION
const getSessions       = 'select * from sport.vw_schedule_public order by start_ts';
const getSessionById    = 'select * from sport.session where session_id = $1';
const addSessionViaView =
  'insert into sport.vw_schedule_public(service_name, trainer_name, hall_name, start_ts, end_ts, price, status) values ($1,$2,$3,$4,$5,$6,$7)';
const updateSessionStatus =
  'update sport.session set status = $1 where session_id = $2';
const removeSession     = 'delete from sport.session where session_id = $1';

// BOOKING
const getBookings       = 'select * from sport.vw_bookings_detailed order by booking_ts desc';
const getBookingById    = 'select * from sport.vw_bookings_detailed where booking_id = $1';
const updateBookingStatus =
  'update sport.booking set status = $1 where booking_id = $2';
const removeBooking     = 'delete from sport.booking where booking_id = $1';

// PROCEDURE
const procCreateBooking = 'call sport.proc_create_booking($1,$2)';
const procCancelSession = 'call sport.proc_cancel_session($1)';

// FUNCTION
const fnTrainerLoad =
  'select * from sport.fn_trainer_load($1,$2,$3)';
const fnScheduleInRange =
  'select * from sport.fn_schedule_in_range($1,$2)';

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
