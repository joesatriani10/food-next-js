import mysql from 'mysql2/promise';
import { S3 } from '@aws-sdk/client-s3';
import slugify from "slugify";
import xss from "xss";

const s3 = new S3({
    region: 'us-west-1'
});

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
    try {
        const [rows] = await pool.execute('SELECT * FROM meals');
        return rows;
    } catch (error) {
        console.error('Error getting meals:', error);
        throw error;
    }
}

export async function getMeal(slug) {
    const [rows] = await pool.execute('SELECT * FROM meals WHERE slug = ?', [slug]);
    return rows[0];
}

export async function saveMeal(meal){
    meal.slug = slugify(meal.title, {lower: true});
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`; //TODO: check for unique file name

    const bufferedImage = await meal.image.arrayBuffer();

    s3.putObject({
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
        Body: Buffer.from(bufferedImage),
        ContentType: meal.image.type,
    });

    meal.image = fileName;

    try {
        const { title, summary, instructions, creator, creator_email, image, slug } = meal;
        await pool.execute(
            `INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title, summary, instructions, creator, creator_email, image, slug]
        );
    } catch (error) {
        console.error('Error saving meal:', error);
        throw error;
    }

}
