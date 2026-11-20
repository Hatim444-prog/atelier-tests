const { validerCommande } = require('../../src/commande');
const mailer = require('../../src/mailer');

jest.mock('../../src/mailer');

describe('commande', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('commande valide avec montant 25 et envoi email', async () => {
    const items = [
      { prix: 20, qte: 1 },
      { prix: 5, qte: 1 }
    ];
    const email = 'client@example.com';
    mailer.envoyer.mockResolvedValue();

    const result = await validerCommande(items, email);

    expect(result).toEqual({ montant: 25 });
    expect(mailer.envoyer).toHaveBeenCalledTimes(1);
    expect(mailer.envoyer).toHaveBeenCalledWith(email, expect.stringContaining('25'));
  });

  test('panier vide rejette avec Panier vide sans appel mailer', async () => {
    await expect(validerCommande([], 'client@example.com')).rejects.toThrow('Panier vide');
    expect(mailer.envoyer).not.toHaveBeenCalled();
  });
});
