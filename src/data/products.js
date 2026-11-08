import motorbikes, { categories, brands } from './motorbikes';

export const products = motorbikes.map(bike => ({
  ...bike,
  price: bike.pricePerDay
}));

export { motorbikes, categories, brands };
export default products;
