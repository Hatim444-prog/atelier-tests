test('retourne 0 pour un panier vide', () => {
expect(total([])).toBe(0);
});
test('ignore une ligne dont la quantité est 0', () => {
const items = [{ prix: 10, qte: 0 }, { prix: 5, qte: 2 }];
expect(total(items)).toBe(10);
});
const total = (items) =>
items.reduce((s, i) => {
if (i.prix < 0) throw new Error('Prix négatif');
return s + i.prix * i.qte;
}, 0);
module.exports = { total };