import sql from 'better-sqlite3';
import {error} from "next/dist/build/output/log";

const db = sql('meals.db');

const getMeals = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return db.prepare('SELECT * FROM meals').all();
}
export const getMeal = (slug) => {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export default getMeals;