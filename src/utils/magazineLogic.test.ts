import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterPublications,
  filterArticles,
  filterProfessionals,
  evaluateAssessment,
  toggleBookmark,
} from './magazineLogic';
import { Publication, Article, Professional } from '../types';

test('filterPublications filters by keyword and category correctly', () => {
  const dummyPubs: Publication[] = [
    {
      id: 'pub-1',
      title: 'मानसिक लवचिकता',
      subtitle: 'संकटात मन कसे शांत ठेवावे',
      editionMonth: 'नोव्हेंबर २०२६',
      year: 2026,
      category: 'मासिक अंक',
      coverImage: '/test.jpg',
      author: 'डॉ. प्रकाश देशमुख',
      authorId: 'auth-1',
      description: 'सविस्तर विश्लेषण',
      pages: 48,
      readTime: '४५ मिनिटे',
      featured: true,
      rating: 4.9,
      reviewsCount: 32,
      publishedDate: '०१ नोव्हेंबर २०२६',
      chaptersCount: 12,
      summaryPoints: ['पॉईंट १'],
    },
    {
      id: 'pub-2',
      title: 'आत्मसंवाद आणि नातेसंबंध',
      subtitle: 'संभाषण कला',
      editionMonth: 'ऑक्टोबर २०२६',
      year: 2026,
      category: 'ई-पुस्तके',
      coverImage: '/test2.jpg',
      author: 'डॉ. अनघा जोशी',
      authorId: 'auth-2',
      description: 'ई-पुस्तक',
      pages: 110,
      readTime: '२ तास',
      featured: false,
      rating: 4.8,
      reviewsCount: 19,
      publishedDate: '१५ ऑक्टोबर २०२६',
      chaptersCount: 8,
      summaryPoints: ['पॉईंट २'],
    },
  ];

  // Search by keyword
  const result1 = filterPublications(dummyPubs, 'लवचिकता', 'सर्व', 'सर्व');
  assert.equal(result1.length, 1);
  assert.equal(result1[0].id, 'pub-1');

  // Filter by category
  const result2 = filterPublications(dummyPubs, '', 'ई-पुस्तके', 'सर्व');
  assert.equal(result2.length, 1);
  assert.equal(result2[0].id, 'pub-2');

  // Filter by year
  const result3 = filterPublications(dummyPubs, '', 'सर्व', '2025');
  assert.equal(result3.length, 0);
});

test('evaluateAssessment calculates correct stress tiers', () => {
  // Low score
  const resLow = evaluateAssessment({ 1: 0, 2: 1, 3: 1, 4: 1, 5: 0 });
  assert.equal(resLow.level, 'संतुलित');
  assert.equal(resLow.score, 3);

  // Moderate score
  const resMed = evaluateAssessment({ 1: 2, 2: 2, 3: 1, 4: 2, 5: 1 });
  assert.equal(resMed.level, 'मध्यम तणाव');
  assert.equal(resMed.score, 8);

  // High score
  const resHigh = evaluateAssessment({ 1: 3, 2: 3, 3: 2, 4: 3, 5: 2 });
  assert.equal(resHigh.level, 'उच्च काळजीपूर्वक लक्ष देण्याची गरज');
  assert.equal(resHigh.score, 13);
});

test('toggleBookmark toggles state immutably', () => {
  const initial = ['pub-1', 'pub-2'];
  const removed = toggleBookmark(initial, 'pub-1');
  assert.deepEqual(removed, ['pub-2']);

  const added = toggleBookmark(removed, 'pub-3');
  assert.deepEqual(added, ['pub-2', 'pub-3']);
});

test('validateRegistration requires all 5 mandatory fields and matching passwords', async () => {
  const { validateRegistration } = await import('./magazineLogic');

  // Missing full name
  const res1 = validateRegistration({
    fullName: '',
    email: 'test@example.com',
    phone: '9822012345',
    password: 'password123',
    confirmPassword: 'password123',
  });
  assert.equal(res1.valid, false);
  assert.ok(res1.error?.includes('नाव'));

  // Invalid email
  const res2 = validateRegistration({
    fullName: 'अनिकेत देशमुख',
    email: 'invalid-email',
    phone: '9822012345',
    password: 'password123',
    confirmPassword: 'password123',
  });
  assert.equal(res2.valid, false);

  // Short phone
  const res3 = validateRegistration({
    fullName: 'अनिकेत देशमुख',
    email: 'test@example.com',
    phone: '98220',
    password: 'password123',
    confirmPassword: 'password123',
  });
  assert.equal(res3.valid, false);

  // Mismatch password
  const res4 = validateRegistration({
    fullName: 'अनिकेत देशमुख',
    email: 'test@example.com',
    phone: '9822012345',
    password: 'password123',
    confirmPassword: 'differentpassword',
  });
  assert.equal(res4.valid, false);

  // Valid registration
  const res5 = validateRegistration({
    fullName: 'अनिकेत देशमुख',
    email: 'test@example.com',
    phone: '9822012345',
    password: 'password123',
    confirmPassword: 'password123',
  });
  assert.equal(res5.valid, true);
  assert.equal(res5.error, undefined);
});

test('validateEmailLogin and validateOtpLogin work correctly', async () => {
  const { validateEmailLogin, validateOtpLogin } = await import('./magazineLogic');

  assert.equal(validateEmailLogin('', 'pass').valid, false);
  assert.equal(validateEmailLogin('user@example.com', '').valid, false);
  assert.equal(validateEmailLogin('user@example.com', 'pass123').valid, true);

  assert.equal(validateOtpLogin('123', '5842').valid, false);
  assert.equal(validateOtpLogin('9822012345', '12').valid, false);
  assert.equal(validateOtpLogin('9822012345', '5842').valid, true);
});
