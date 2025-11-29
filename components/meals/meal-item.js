import Link from 'next/link';
import Image from 'next/image';

import classes from './meal-item.module.css';

export default function MealItem({title, slug, image, summary, creator}) {
    return (
        <article className={classes.meal}>
            <div className={classes.image}>
                <Image
                    src={`/assets/${image}`}
                    alt={title}
                    fill
                    sizes="(max-width: 430px) 100vw, 320px"
                />
            </div>
            <div className={classes.content}>
                <div className={classes.meta}>
                    <span className={classes.badge}>Community recipe</span>
                    <span className={classes.creator}>by {creator}</span>
                </div>
                <h2>{title}</h2>
                <p className={classes.summary}>{summary}</p>
                <div className={classes.actions}>
                    <Link href={`/meals/${slug}`}>View details</Link>
                </div>
            </div>
        </article>
    );
}
