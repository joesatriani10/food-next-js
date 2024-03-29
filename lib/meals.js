import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from "slugify";
import xss from "xss";

const db = sql('meals.db');

export async function getMeals() {

    // throw new Error('Loading meals failed');
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal){
    meal.slug = slugify(meal.title, {lower: true});
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`; //TODO: check for unique file name

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if(error) {
            //console.error(error);
            throw new Error('Image upload failed');
        }
    });

    meal.image = `/images/${fileName}`;

    db.prepare(`
        INSERT INTO meals 
            (title, summary, instructions, creator, creator_email, image, slug)
        VALUES 
            (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `).run(meal);

}
