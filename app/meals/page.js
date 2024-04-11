import Link from "next/link";
import classes from './page.module.css';
import MealsGrid from "@/components/meals/meals-grid";
import {getMeals} from "@/lib/meals";
import {Suspense} from "react";

export const metadata = {
    title: 'All Meals',
    description: 'Explore a wide variety of meals shared by our community.',
};

const Meals = async () => {
    const meals = await getMeals();
    return <MealsGrid meals={meals}/>
}
const MealsPage = () => {
    return (
        <>
            <header className={classes.header}>

                <h1>Savour the Joy of Cooking with{' '}
                    <span className={classes.highlight}>Your Own Creations</span>
                </h1>
                <p>
                    Unleash your inner chef and dive into the delightful process of cooking. Select your preferred recipe from our diverse collection and embark on a culinary adventure right in your own kitchen.
                </p>
                <p className={classes.cta}>
                    <Link href={"/meals/share"}>Share Your Favorite Recipe</Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
                    <Meals/>
                </Suspense>
            </main>
        </>

    );
}

export default MealsPage;