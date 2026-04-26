import { createTodo } from './createTodo';

test('createTodo returns a Todo with text, completed:false, and a unique id', () => {
  const a = createTodo('write tests');
  const b = createTodo('write tests');

  expect(a.text).toBe('write tests');
  expect(a.completed).toBe(false);
  expect(typeof a.id).toBe('string');
  expect(a.id.length).toBeGreaterThan(0);
  expect(a.id).not.toBe(b.id);
});
