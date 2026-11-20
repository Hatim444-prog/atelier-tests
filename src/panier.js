function total(items) {
  return items.reduce((acc, i) => {
    if (i.prix < 0) {
      throw new Error('Prix négatif');
    }
    return acc + i.prix * i.qte;
  }, 0);
}

module.exports = { total };
