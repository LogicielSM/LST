import { browser, element, by } from 'protractor';

export class LSTPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('lst-root h1')).getText();
  }
}
