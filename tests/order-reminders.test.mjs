import test from 'node:test';
import assert from 'node:assert/strict';
import { localDateTimeValue, makeCalendarReminder, parseSavedReminder, tomorrowAtNine, REMINDER_MAX_AGE } from '../src/lib/order-reminders.ts';

const now = new Date('2026-10-23T16:00:00Z');
test('reminders are absent by default and malformed/stale browser data is ignored', () => {
  for (const raw of [null, '', '{}', '{', 'null', JSON.stringify({ reference: 'unsafe\r\nUID:inject', createdAt: now.getTime(), remindAt: now.getTime() + 60000 }), JSON.stringify({ reference: 'request-fixture', createdAt: now.getTime() - REMINDER_MAX_AGE - 1, remindAt: now.getTime() + 60000 })]) assert.equal(parseSavedReminder(raw, now.getTime()), null);
});
test('only reference and reminder timestamps survive storage parsing', () => {
  const data = { reference: 'request-fixture', createdAt: now.getTime() - 1000, remindAt: now.getTime() + 60000 };
  assert.deepEqual(parseSavedReminder(JSON.stringify({ ...data, phone: 'PRIVATE', address: 'PRIVATE', email: 'PRIVATE' }), now.getTime()), data);
  assert.equal(parseSavedReminder(JSON.stringify({ ...data, remindAt: data.createdAt - 1 }), now.getTime()), null);
});
test('tomorrow preset uses next local calendar day at 9 am across month/year changes', () => {
  for (const date of [new Date(2026, 9, 31, 23, 59), new Date(2026, 11, 31, 23, 59)]) {
    const tomorrow = tomorrowAtNine(date);
    assert.equal(tomorrow.getHours(), 9);
    assert.equal(tomorrow.getMinutes(), 0);
    assert.equal(tomorrow.getDate(), 1);
  }
  assert.equal(localDateTimeValue(new Date(2026, 9, 24, 9, 0)), '2026-10-24T09:00');
});
test('calendar contains a real scheduled event/alarm with UTC times and no customer contacts', () => {
  const ics = makeCalendarReminder('request-fixture', new Date('2026-10-24T13:00:00Z'), now);
  assert(ics.includes('DTSTART:20261024T130000Z\r\n'));
  assert(ics.includes('DTEND:20261024T131500Z\r\n'));
  assert(ics.includes('BEGIN:VALARM\r\nTRIGGER:PT0S\r\nACTION:DISPLAY'));
  assert(ics.includes('This reminder does not confirm a booking.'));
  assert(!ics.includes('ATTENDEE') && !ics.includes('ORGANIZER') && !ics.includes('LOCATION'));
  assert(ics.split('\r\n').every(line => line.length <= 75));
});
test('calendar refuses past dates, invalid dates and injectable identifiers', () => {
  for (const date of [new Date('invalid'), new Date(now.getTime() - 1000)]) assert.throws(() => makeCalendarReminder('request-fixture', date, now));
  assert.throws(() => makeCalendarReminder('request\r\nSUMMARY:fake', new Date(now.getTime() + 1000), now));
});
