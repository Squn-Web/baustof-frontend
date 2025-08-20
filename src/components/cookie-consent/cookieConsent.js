class CookieConsentManager {
  constructor() {
    this.STORAGE_KEY = 'baustof_cookie_consent';
    this.CONSENT_VERSION = 1;
    this.categories = {
      necessary: { enabled: true, readOnly: true },
      analytics: { enabled: false, readOnly: false }
    };
    
    this.initializeGoogleConsentMode();
    this.consent = this.loadConsent();
  }

  initializeGoogleConsentMode() {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      window.gtag = gtag;
      
      gtag('consent', 'default', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'functionality_storage': 'denied',
        'personalization_storage': 'denied'
      });
    }
  }

  loadConsent() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.version === this.CONSENT_VERSION) {
          return parsed;
        }
      }
    } catch (error) {
      console.warn('Failed to load cookie consent:', error);
    }
    
    return {
      version: this.CONSENT_VERSION,
      timestamp: null,
      categories: {
        necessary: true,
        analytics: false
      },
      bannerShown: false
    };
  }

  saveConsent() {
    try {
      this.consent.timestamp = new Date().toISOString();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.consent));
    } catch (error) {
      console.warn('Failed to save cookie consent:', error);
    }
  }

  isConsentValid() {
    return this.consent.timestamp !== null;
  }

  shouldShowBanner() {
    return !this.isConsentValid();
  }

  acceptAll() {
    this.consent.categories = {
      necessary: true,
      analytics: true
    };
    this.consent.bannerShown = true;
    this.saveConsent();
    this.updateGoogleConsent();
    this.loadAnalyticsScripts();
    this.hideBanner();
    this.hidePreferences();
    this.dispatchConsentEvent('accept-all');
  }

  rejectAll() {
    this.consent.categories = {
      necessary: true,
      analytics: false
    };
    this.consent.bannerShown = true;
    this.saveConsent();
    this.updateGoogleConsent();
    this.hideBanner();
    this.hidePreferences();
    this.dispatchConsentEvent('reject-all');
  }

  updateGoogleConsent() {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': this.consent.categories.analytics ? 'granted' : 'denied'
      });
    }
  }

  loadAnalyticsScripts() {
    if (this.consent.categories.analytics && typeof window !== 'undefined') {
      if (!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-W4P1DPXYXC';
        document.head.appendChild(script);

        script.onload = () => {
          window.gtag('js', new Date());
          window.gtag('config', 'G-W4P1DPXYXC');
        };
      } else if (window.gtag) {
        window.gtag('js', new Date());
        window.gtag('config', 'G-W4P1DPXYXC');
      }
    }
  }

  showBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.style.display = 'block';
      banner.setAttribute('aria-hidden', 'false');
      
      const acceptButton = banner.querySelector('.cookie-accept-all');
      if (acceptButton) {
        acceptButton.focus();
      }
    }
  }

  hideBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.style.display = 'none';
      banner.setAttribute('aria-hidden', 'true');
    }
  }

  showPreferences() {
    const modal = document.getElementById('cookie-preferences-modal');
    const banner = document.getElementById('cookie-consent-banner');
    
    if (modal) {
      this.previouslyFocusedElement = document.activeElement;
      
      if (banner) {
        banner.style.display = 'none';
        banner.setAttribute('aria-hidden', 'true');
      }
      
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      
      this.updatePreferencesModal();
      
      const firstButton = modal.querySelector('button:not(:disabled)');
      if (firstButton) {
        setTimeout(() => firstButton.focus(), 100);
      }
      
      this.handleKeyDown = (e) => this.onModalKeyDown(e);
      document.addEventListener('keydown', this.handleKeyDown);
    }
  }

  hidePreferences() {
    const modal = document.getElementById('cookie-preferences-modal');
    const banner = document.getElementById('cookie-consent-banner');
    
    if (modal) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      
      if (this.handleKeyDown) {
        document.removeEventListener('keydown', this.handleKeyDown);
        this.handleKeyDown = null;
      }
      
      if (banner && !this.isConsentValid()) {
        banner.style.display = 'block';
        banner.setAttribute('aria-hidden', 'false');
      }
      
      if (this.previouslyFocusedElement) {
        setTimeout(() => {
          this.previouslyFocusedElement.focus();
          this.previouslyFocusedElement = null;
        }, 100);
      }
    }
  }

  updatePreferencesModal() {
    const analyticsToggle = document.getElementById('analytics-toggle');
    if (analyticsToggle) {
      analyticsToggle.checked = this.consent.categories.analytics;
    }
  }

  savePreferences() {
    const analyticsToggle = document.getElementById('analytics-toggle');
    
    if (analyticsToggle) {
      this.consent.categories.analytics = analyticsToggle.checked;
    }
    
    this.consent.bannerShown = true;
    this.saveConsent();
    this.updateGoogleConsent();
    
    if (this.consent.categories.analytics) {
      this.loadAnalyticsScripts();
    }
    
    this.hidePreferences();
    this.dispatchConsentEvent('save-preferences');
  }

  onModalKeyDown(event) {
    const modal = document.getElementById('cookie-preferences-modal');
    if (!modal || modal.getAttribute('aria-hidden') === 'true') return;

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.hidePreferences();
        break;
      case 'Tab':
        this.handleTabKey(event, modal);
        break;
    }
  }

  handleTabKey(event, modal) {
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const focusableArray = Array.from(focusableElements);
    const firstElement = focusableArray[0];
    const lastElement = focusableArray[focusableArray.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  hasConsent(category) {
    return this.consent.categories[category] === true;
  }

  dispatchConsentEvent(action) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookieConsent', {
        detail: {
          action,
          consent: this.consent.categories,
          timestamp: this.consent.timestamp
        }
      }));
    }
  }

  resetConsent() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.consent = {
      version: this.CONSENT_VERSION,
      timestamp: null,
      categories: {
        necessary: true,
        analytics: false
      },
      bannerShown: false
    };
    this.updateGoogleConsent();
  }

  getConsentSummary() {
    return {
      hasValidConsent: this.isConsentValid(),
      categories: this.consent.categories,
      timestamp: this.consent.timestamp,
      version: this.consent.version
    };
  }
}

if (typeof window !== 'undefined') {
  window.cookieConsentManager = new CookieConsentManager();
  
  document.addEventListener('DOMContentLoaded', () => {
    if (window.cookieConsentManager.shouldShowBanner()) {
      window.cookieConsentManager.showBanner();
    } else if (window.cookieConsentManager.hasConsent('analytics')) {
      window.cookieConsentManager.loadAnalyticsScripts();
    }
  });
}

export default CookieConsentManager;