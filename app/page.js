import classes from "./page.module.css";
import Link from "next/link";
import ImageSlideshow from "@/components/images/images-slideshow";

export default function Home() {
    return (
        <>
            <header className={classes.header}>
                <div className={classes.copy}>
                    <p className={classes.eyebrow}>Portfolio demo • Next.js app router</p>
                    <div className={classes.hero}>
                        <h1>NextLevel Food for adventurous home cooks</h1>
                        <p>Taste, share, and celebrate the dishes that make your table feel like home.</p>
                    </div>
                    <div className={classes.cta}>
                        <Link className={classes.primary} href={"/meals"}>Explore Meals</Link>
                        <Link className={classes.secondary} href={"/community"}>Join the Community</Link>
                    </div>
                    <p className={classes.hint}>This is a showcase—data is curated, submissions stay safely disabled.</p>
                </div>
                <div className={classes.slideshow}>
                    <ImageSlideshow/>
                </div>
            </header>
            <main>
                <section className={classes.section}>
                    <h2>How it works</h2>
                    <p>
                        Browse hand-picked recipes from food lovers around the globe, skim the highlights, and dive
                        into detailed steps when you are ready to cook.
                    </p>
                    <p>
                        Every screen is built with intentional motion, warm gradients, and glassy surfaces so the demo
                        looks like a crafted product—not a classroom exercise.
                    </p>
                </section>

                <section className={classes.section}>
                    <h2>Why NextLevel Food?</h2>
                    <p>
                        Opinionated design, swift navigation, and present-but-disabled actions make this portfolio
                        project feel premium while keeping data static.
                    </p>
                    <p>
                        Explore the experience, get inspired, and imagine your own recipes taking center stage here.
                    </p>
                </section>
            </main>
        </>
    );
}
