'use server';

import {saveMeal} from "./meals";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

function isInvalidText(text) {
    return !text || text.trim().length === 0;
}

export async function shareMeal(prevState, formData) {
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    }

    const fieldsToCheck = ['title', 'summary', 'instructions', 'image', 'creator', 'creator_email'];
    for (const field of fieldsToCheck) {
        if (isInvalidText(meal[field])) {
            return {message: `Please provide a valid ${field}`};
        }

        if (field === 'creator_email' && !meal[field].includes('@')) {
            return {message: 'Please provide a valid email address'};
        }

        if (!meal.image || meal.image.size === 0) {
            return {
                message: 'Invalid or missing image',
            };
        }

        await saveMeal(meal);
        revalidatePath('/meals'); // Revalidate the meals page
        redirect('/meals');

    }
}