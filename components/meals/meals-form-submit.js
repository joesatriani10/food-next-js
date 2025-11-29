'use client';

import { useFormStatus } from 'react-dom';
import classes from './meals-form-submit.module.css';

export default function MealsFormSubmit() {
    const { pending } = useFormStatus();

    return (
        <div className={classes.wrapper} aria-live="polite">
            <button className={classes.button} disabled={true}>
                <span className={classes.label}>{pending ? 'Submitting...' : 'Share Meal'}</span>
                <span className={classes.lock}>Locked</span>
            </button>
            <p className={classes.note}>Portfolio demo — submissions are intentionally disabled.</p>
        </div>
    );
}
