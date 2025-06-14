import classes from './meals-grid.module.css';
import MealItem from "@/components/meals/meal-item";

const MealsGrid = ({meals}) => {
    return <>
        <ul className={classes.meals}>
            {meals.map((meal) => (
                <li key={meal.slug}>
                    <MealItem {...meal} />
                </li>
            ))}

        </ul>
    </>
}

export default MealsGrid;