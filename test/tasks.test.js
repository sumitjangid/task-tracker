const request = require('supertest');
const app = require('../src/app');
const store = require('../src/store');

beforeEach(() => {
  store.reset();
});

describe('health check', () => {
  it('responds ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('task lifecycle', () => {
  it('creates a task', async () => {
    const res = await request(app).post('/tasks').send({ title: 'Write README' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Write README');
    expect(res.body.completed).toBe(false);
  });

  it('rejects a task with no title', async () => {
    const res = await request(app).post('/tasks').send({});
    expect(res.status).toBe(400);
  });

  it('lists tasks', async () => {
    await request(app).post('/tasks').send({ title: 'A' });
    await request(app).post('/tasks').send({ title: 'B' });
    const res = await request(app).get('/tasks');
    expect(res.body.length).toBe(2);
  });

  it('marks a task complete', async () => {
    const created = await request(app).post('/tasks').send({ title: 'A' });
    const res = await request(app).patch(`/tasks/${created.body.id}/complete`);
    expect(res.body.completed).toBe(true);
  });

  it('deletes a task', async () => {
    const created = await request(app).post('/tasks').send({ title: 'A' });
    const res = await request(app).delete(`/tasks/${created.body.id}`);
    expect(res.status).toBe(204);
    const check = await request(app).get(`/tasks/${created.body.id}`);
    expect(check.status).toBe(404);
  });
});
