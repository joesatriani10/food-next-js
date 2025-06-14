import classes from "./page.module.css";
import Image from "next/image";
import {getMeal} from "@/lib/meals"
import {notFound} from "next/navigation";

export async function generateMetadata({ params }) {
    const { mealSlug } = await params;
    const meal = await getMeal(mealSlug);

    if (!meal) {
        notFound();
    }

    return {
        title: meal.title,
        description: meal.summary,
    }
}
const MealPost = async ({ params }) => {
    const { mealSlug } = await params;
    const meal = await getMeal(mealSlug);

    if (!meal) {
        notFound();
    }
    if (meal && meal.instructions) {
        meal.instructions = meal.instructions.replace(/\n/g, '<br/>');
    }
    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image
                        src={`/assets/${meal.image}`}
                        alt={meal.title}
                        sizes="(max-width: 480px) 100vw, 320px"
                        fill
                    />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto: ${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p className={classes.instructions} dangerouslySetInnerHTML={{
                    __html: meal.instructions ? meal.instructions : '',
                }}></p>
            </main>
        </>
    );
}

export default MealPost;