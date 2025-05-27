const tambah = require('../utils/math');

test('tambah 2 + 3 = 5', () => {
  expect(tambah(2, 3)).toBe(5);
});
