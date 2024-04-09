import fs from 'node:fs';
import sql from 'better-sqlite3';
import mysql from 'mysql2/promise';
import slugify from "slugify";
import xss from "xss";

const db = sql('meals.db');

// Create a connection pool with a specific configuration
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


export async function getMeals() {
    const [rows] = await pool.execute('SELECT * FROM meals');
    return rows;
}

export async function getMeal(slug) {
    const [rows] = await pool.execute('SELECT * FROM meals WHERE slug = ?', [slug]);
    return rows[0];
}

//
// export async function getMeals() {
//
//     // throw new Error('Loading meals failed');
//     return db.prepare('SELECT * FROM meals').all();
// }
//
// export function getMeal(slug) {
//     return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
// }

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
