import {loaderIngredientsFull} from '../../../componets/app/app';

import mockData from '../../data.json';

describe('Fetch Tests', () => {
  it('should return ingredients data', async () => {
    jest.mock('node-fetch', () => {
      return jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockData),
        }),
      );
    });
    const result = await loaderIngredientsFull();
    expect(result).toEqual(mockData);
  });
});
