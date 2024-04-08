import Image from 'next/image';

import mealIcon from '@/assets/icons/meal.png';
import communityIcon from '@/assets/icons/community.png';
import eventsIcon from '@/assets/icons/events.png';
import classes from './page.module.css';

export default function CommunityPage() {
    return (
        <>
            <header className={classes.header}>
                <h1>
                    United by One Shared Passion: <span className={classes.highlight}>Food</span>
                </h1>
                <p>
                    Welcome to our vibrant community of food lovers and culinary enthusiasts! Here, we celebrate the
                    universal language of food and the joy it brings to our lives. Whether you&apos;re a seasoned chef or a
                    home cook, we invite you to share your favorite recipes and join us in our gastronomic journey.
                </p>
            </header>
            <main className={classes.main}>
                <h2>Community Perks</h2>

                <ul className={classes.perks}>
                    <li>
                        <Image src={mealIcon} alt="A delicious meal"/>
                        <p>A Delicious Meal: Share & Discover Recipes</p>
                    </li>
                    <li>
                        <Image src={communityIcon} alt="A crowd of people, cooking" />
                        <p>A Crowd of People, Cooking: Find New Friends & Like-Minded People</p>
                    </li>
                    <li>
                        <Image
                            src={eventsIcon}
                            alt="A crowd of people at a cooking event"
                        />
                        <p>Be part of exclusive cooking events and workshops hosted by our community.</p>
                    </li>
                </ul>
            </main>
        </>
    );
}