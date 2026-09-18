import { describe, it, expect, beforeEach } from 'vitest';
import {
  STORAGE_KEY,
  ADMIN_FEEDBACK_EMAIL,
  CATEGORY_LABELS,
  getStoredFeedbacks,
  saveFeedbackToInbox,
  updateFeedbackItem,
  deleteFeedbackItem,
  markAllFeedbacksRead,
  clearAllFeedbacks,
  getNewFeedbackCount,
  formatFeedbackEmailBody,
  buildFeedbackMailtoUrl,
  buildFeedbackGmailUrl
} from '../src/utils/feedbackStorage.js';

describe('Feedback Storage & Admin Inbox Utility Suite', () => {
  let store = {};

  beforeEach(() => {
    store = {};
    globalThis.localStorage = {
      getItem: (key) => store[key] || null,
      setItem: (key, val) => { store[key] = String(val); },
      removeItem: (key) => { delete store[key]; },
      clear: () => { store = {}; }
    };
    globalThis.window = {
      dispatchEvent: () => true
    };
    globalThis.CustomEvent = class CustomEvent {
      constructor(type, eventInitDict) {
        this.type = type;
        this.detail = eventInitDict?.detail;
      }
    };
  });

  describe('saveFeedbackToInbox() & getStoredFeedbacks()', () => {
    it('should return an empty array when no feedbacks are stored', () => {
      expect(getStoredFeedbacks()).toEqual([]);
    });

    it('should successfully save a feedback and prepend to inbox list', () => {
      const feedback1 = {
        companyId: 'bsc',
        companyName: 'BSC',
        category: 'trading_fee',
        content: 'Biểu phí giao dịch mới 0.08%',
        sourceUrl: 'https://bsc.com.vn',
        senderContact: 'user@example.com'
      };

      const saved = saveFeedbackToInbox(feedback1);
      expect(saved.id).toBeDefined();
      expect(saved.createdAt).toBeDefined();
      expect(saved.status).toBe('new');
      expect(saved.categoryLabel).toBe('Phí Giao Dịch');

      const all = getStoredFeedbacks();
      expect(all.length).toBe(1);
      expect(all[0].content).toBe('Biểu phí giao dịch mới 0.08%');

      // Add a second feedback and ensure it appears first (LIFO)
      const feedback2 = {
        companyId: 'tcbs',
        companyName: 'TCBS',
        category: 'margin',
        content: 'Lãi vay Margin 9.5%',
        sourceUrl: '',
        senderContact: ''
      };
      saveFeedbackToInbox(feedback2);

      const allAfterTwo = getStoredFeedbacks();
      expect(allAfterTwo.length).toBe(2);
      expect(allAfterTwo[0].companyName).toBe('TCBS');
      expect(allAfterTwo[1].companyName).toBe('BSC');
    });

    it('should gracefully handle malformed JSON in localStorage', () => {
      localStorage.setItem(STORAGE_KEY, 'invalid-json{{{');
      expect(getStoredFeedbacks()).toEqual([]);
    });
  });

  describe('updateFeedbackItem() & deleteFeedbackItem()', () => {
    it('should update feedback status correctly', () => {
      const saved = saveFeedbackToInbox({
        companyId: 'dnse',
        companyName: 'DNSE',
        category: 'promo',
        content: 'Ưu đãi miễn phí giao dịch'
      });

      expect(getNewFeedbackCount()).toBe(1);

      updateFeedbackItem(saved.id, { status: 'resolved' });
      const list = getStoredFeedbacks();
      expect(list[0].status).toBe('resolved');
      expect(getNewFeedbackCount()).toBe(0);
    });

    it('should delete a feedback item by id', () => {
      const item1 = saveFeedbackToInbox({ content: 'Item 1' });
      const item2 = saveFeedbackToInbox({ content: 'Item 2' });

      expect(getStoredFeedbacks().length).toBe(2);
      deleteFeedbackItem(item1.id);

      const remaining = getStoredFeedbacks();
      expect(remaining.length).toBe(1);
      expect(remaining[0].id).toBe(item2.id);
    });

    it('should mark all feedbacks as read/resolved', () => {
      saveFeedbackToInbox({ content: 'Feedback 1' });
      saveFeedbackToInbox({ content: 'Feedback 2' });
      expect(getNewFeedbackCount()).toBe(2);

      markAllFeedbacksRead();
      expect(getNewFeedbackCount()).toBe(0);
      const all = getStoredFeedbacks();
      expect(all.every(item => item.status === 'resolved')).toBe(true);
    });

    it('should clear all feedbacks', () => {
      saveFeedbackToInbox({ content: 'F1' });
      saveFeedbackToInbox({ content: 'F2' });
      expect(getStoredFeedbacks().length).toBe(2);

      clearAllFeedbacks();
      expect(getStoredFeedbacks()).toEqual([]);
    });
  });

  describe('Email Helper URLs and Formatting', () => {
    it('should format email body text correctly with all fields', () => {
      const body = formatFeedbackEmailBody({
        companyName: 'BSC',
        categoryLabel: 'Phí Giao Dịch',
        content: 'Cập nhật phí 0.08%',
        sourceUrl: 'https://example.com',
        senderContact: 'tester@gmail.com'
      });

      expect(body).toContain('CTCK: BSC');
      expect(body).toContain('Mục: Phí Giao Dịch');
      expect(body).toContain('Chi tiết nội dung: Cập nhật phí 0.08%');
      expect(body).toContain('Link dẫn chứng: https://example.com');
      expect(body).toContain('Người gửi: tester@gmail.com');
    });

    it('should build valid mailto URL containing admin email and encoded parameters', () => {
      const mailto = buildFeedbackMailtoUrl({
        companyName: 'TCBS',
        categoryLabel: 'Lãi Suất Margin',
        content: 'Margin ưu đãi 9.9%'
      });

      expect(mailto.startsWith(`mailto:${ADMIN_FEEDBACK_EMAIL}`)).toBe(true);
      expect(mailto).toContain('subject=');
      expect(mailto).toContain('body=');
      expect(mailto).toContain(encodeURIComponent('TCBS'));
    });

    it('should build valid Gmail compose URL', () => {
      const gmailUrl = buildFeedbackGmailUrl({
        companyName: 'DNSE',
        categoryLabel: 'Ưu Đãi Mở Mới',
        content: 'Miễn phí giao dịch trọn đời'
      });

      expect(gmailUrl.startsWith('https://mail.google.com/mail/')).toBe(true);
      expect(gmailUrl).toContain(encodeURIComponent(ADMIN_FEEDBACK_EMAIL));
      expect(gmailUrl).toContain('DNSE');
    });
  });
});
