const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/db');

describe('Integration - Users API', () => {
  beforeEach(async () => {
    await db.query('DROP TABLE IF EXISTS users CASCADE;');
    await db.query('CREATE TABLE users (id SERIAL PRIMARY KEY, nom TEXT NOT NULL);');
    await db.query("INSERT INTO users (nom) VALUES ('Alice');");
  });

  afterAll(async () => {
    await db.end();
  });

  test('GET /users/1 retourne 200 pour Alice', async () => {
    const res = await request(app).get('/users/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, nom: 'Alice' });
  });

  test('GET /users/999 retourne 404', async () => {
    const res = await request(app).get('/users/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ erreur: 'introuvable' });
  });

  test('GET /users/abc retourne 400', async () => {
    const res = await request(app).get('/users/abc');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ erreur: 'id invalide' });
  });

  test('Résistance injection SQL', async () => {
    const injection = encodeURIComponent('1; DROP TABLE users;--');
    const res = await request(app).get(`/users/${injection}`);
    expect(res.status).toBe(400);

    const countRes = await db.query('SELECT count(*) FROM users;');
    expect(parseInt(countRes.rows[0].count, 10)).toBe(1);
  });
});
