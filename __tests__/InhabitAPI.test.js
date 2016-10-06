import InhabitAPI from '../src/InhabitAPI';
import Analytics from '../src/lib/Analytics';

test('Inhabit API', () => {
  expect(InhabitAPI).toBeTruthy();
  expect(new InhabitAPI).toBeInstanceOf(InhabitAPI);
  expect(InhabitAPI.create()).toBeInstanceOf(InhabitAPI);
  expect(InhabitAPI.create().getAnalytics()).toBeInstanceOf(Analytics);
});
