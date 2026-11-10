import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatWhatsAppMessage,
  createWhatsAppUrl,
  createServiceEnquiryMessage,
} from './enquiry.ts';

test('formatWhatsAppMessage formats all fields properly', () => {
  const result = formatWhatsAppMessage({
    name: 'Durgesh Tate',
    business: 'Artisan Bakery',
    phone: '+91 9876543210',
    email: 'info@bakery.com',
    industry: 'Bakeries',
    service: 'HACCP & FSMS Documentation',
    message: 'Need assistance setting up HACCP records.',
  });

  assert.ok(result.includes('Name: Durgesh Tate'));
  assert.ok(result.includes('Business name: Artisan Bakery'));
  assert.ok(result.includes('Industry: Bakeries'));
  assert.ok(result.includes('Service required: HACCP & FSMS Documentation'));
  assert.ok(result.includes('Message: Need assistance setting up HACCP records.'));
});

test('createWhatsAppUrl creates valid wa.me link with encoded text', () => {
  const url = createWhatsAppUrl('919137639148', 'Hello Food Circle');
  assert.equal(url, 'https://wa.me/919137639148?text=Hello%20Food%20Circle');
});

test('createServiceEnquiryMessage includes service name in exact format', () => {
  const msg = createServiceEnquiryMessage('FSSAI Licensing & Registration Assistance');
  assert.equal(
    msg,
    'Hello Food Circle, I would like to enquire about your FSSAI Licensing & Registration Assistance service. Please share more details.'
  );
});
