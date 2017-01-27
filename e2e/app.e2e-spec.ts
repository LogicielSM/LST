import { LSTPage } from './app.po';

describe('lst App', function() {
  let page: LSTPage;

  beforeEach(() => {
    page = new LSTPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('lst works!');
  });
});
