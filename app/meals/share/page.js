'use client';
import {useFormState} from 'react-dom';
import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import MealsFormSubmit from '@/components/meals/meals-form-submit';
import {shareMeal} from "@/lib/actions";


export default function ShareMealPage() {
    const [state, formAction] = useFormState(shareMeal, {message: null});

    return (
        <>
            <header className={classes.header}>
                <h1>
                    Share Your <span className={classes.highlight}>Culinary Masterpiece</span> with the World
                </h1>
                <p>
                    Have you ever created a dish so delicious, so unforgettable that you felt it deserved more than just
                    the applause of your dinner guests? Perhaps you&apos;ve stumbled upon a family recipe that&apos;s been passed
                    down for generations and you think it&apos;s high time it had a wider audience. Or maybe you&apos;ve just
                    whipped up a weeknight dinner that turned out to be a surprising hit. Whatever your story, whatever
                    your dish, we want to hear about it. Don&apos;t keep that culinary brilliance to yourself - share it with
                    our community and let us all enjoy your cooking prowess!
                </p>
            </header>
            <main className={classes.main}>
                <form className={classes.form} action={formAction}>
                    <div className={classes.row}>
                        <p>
                            <label htmlFor="name">Your name</label>
                            <input type="text" id="name" name="name" required/>
                        </p>
                        <p>
                            <label htmlFor="email">Your email</label>
                            <input type="email" id="email" name="email" required/>
                        </p>
                    </div>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" required/>
                    </p>
                    <p>
                        <label htmlFor="summary">Short Summary</label>
                        <input type="text" id="summary" name="summary" required/>
                    </p>
                    <p>
                        <label htmlFor="instructions">Instructions</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            rows="10"
                            required
                        ></textarea>
                    </p>
                    <ImagePicker label="Your image" name="image"/>
                    {state.message && <p>{state.message}</p>}
                    <p className={classes.actions}>
                        <MealsFormSubmit/>
                    </p>
                </form>
            </main>
        </>
    );
}