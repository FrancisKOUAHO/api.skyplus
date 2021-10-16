import puppeteer from "puppeteer";
import {sleep_for} from "../methods/sleep_for";
import {authenticate} from "../methods/authenticate";
import {search} from "../methods/search";
import {click_button} from "../methods/click_button";
import {connectProfileMessageLinkedinMethod} from "../methods/connectProfileMessageLinkedin.method";

const connectProfileMessageLinkedinController = async (req, res) => {
    puppeteer.launch({headless: false}).then(async function (browser) {
        try {
            const page = await browser.newPage();
            const URL = 'https://www.linkedin.com';
            await page.setViewport({
                width: 1280,
                height: 800,
                deviceScaleFactor: 1
            });
            await page.goto(URL);
            await sleep_for(page, 1000, 1200)

            await authenticate(page)
            console.log('Connection Linkedin OK...')
            await sleep_for(page, 1000, 1200)
            await search(page)
            await sleep_for(page, 1000, 1200)
            await click_button(page, 'li.search-reusables__primary-filter')
            console.log('Recherche OK...')
            await sleep_for(page, 1000, 1200)

            console.log('Démarrage des invitations linkedIn...')

            await connectProfileMessageLinkedinMethod(page)
            await sleep_for(page, 1000, 1200)

            //await browser.close()
            console.log("Done!")
            return res.status(201).json(
                {
                    success: true,
                    message: `Fin des invitations linkedIn ...`,
                }
            );

        } catch (error) {
            return res.status(500).json(
                {
                    success: false,
                    message: `${error}, erreur sur les invitations sur linkedIn ❌`,
                }
            );
        }
    })
}


export {
    connectProfileMessageLinkedinController
}
