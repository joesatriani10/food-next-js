import classes from "./page.module.css";
import Image from "next/image";
import {getMeal} from "@/lib/meals"
import {notFound} from "next/navigation";

const MealPost = ({params}) => {
    const meal = getMeal(params.mealSlug);

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
                        src={`https://angelnextjsdemo.s3.us-west-1.amazonaws.com/${meal.image}`}
                        alt={meal.title}
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