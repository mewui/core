import { generateBindingId } from '../../src/utilities/index';

describe('ID Generator', () => {
  it('Should start generating IDs from 1', () => {
    const id = generateBindingId();

    expect(id).toBe(1);
  });
});
