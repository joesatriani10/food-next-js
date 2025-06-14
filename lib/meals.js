import slugify from 'slugify';
import xss from 'xss';
import {dummyMeals} from './dummy-meals';

export function getMeals() {
  return dummyMeals;
}

export function getMeal(slug) {
  return dummyMeals.find((meal) => meal.slug === slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  meal.image = `${meal.slug}.${extension}`;

  dummyMeals.push(meal);
}
