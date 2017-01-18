import { Angular2HPage } from './app.po';

describe('angular2-h App', function() {
  let page: Angular2HPage;

  beforeEach(() => {
    page = new Angular2HPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
