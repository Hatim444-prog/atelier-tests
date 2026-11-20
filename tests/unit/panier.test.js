const { total } = require('../../src/panier');

describe('panier', () => {
  test('calcul du montant total normal (25)', () => {
    const items = [
      { prix: 10, qte: 2 },
      { prix: 5, qte: 1 }
    ];
    expect(total(items)).toBe(25);
  });

  test('panier vide donne 0', () => {
    expect(total([])).toBe(0);
  });

  test('ignore les articles avec qte: 0', () => {
    const items = [
      { prix: 10, qte: 0 },
      { prix: 5, qte: 2 }
    ];
    expect(total(items)).toBe(10);
  });

  test('lance une exception Prix négatif', () => {
    const items = [
      { prix: -5, qte: 1 }
    ];
    expect(() => total(items)).toThrow('Prix négatif');
  });
});
