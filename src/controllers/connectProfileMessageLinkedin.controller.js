import puppeteer from "puppeteer";
import {sleep_for} from "../methods/sleep_for";
import {authenticate} from "../methods/authenticate";
import dotenv from "dotenv";
import {search} from "../methods/search";
import {click_button} from "../methods/click_button";
import {connectProfileMessageLinkedinMethod} from "../methods/connectProfileMessageLinkedin.method";
import {setCookie} from "../methods/setCookie";
import mongoose from "mongoose";
import {Follows} from "../models/follow";

dotenv.config();

const connectProfileMessageLinkedinController = async (req, res) => {
    puppeteer.launch({headless: false}).then(async function (browser) {
        try {
            const page = await browser.newPage();
            await setCookie(page, process.env.LI_AT, process.env.VALEUR, process.env.DOMAIN)
            const URL = 'https://www.linkedin.com/feed/';
            await page.setViewport({
                width: 1280,
                height: 800,
                deviceScaleFactor: 1
            });
            await page.goto(URL);
            await sleep_for(page, 1000, 1200)
            await search(page)
            await sleep_for(page, 1000, 1200)
            await click_button(page, 'li.search-reusables__primary-filter')
            console.log('Recherche OK...')
            await sleep_for(page, 1000, 1200)

            console.log('Démarrage des invitations linkedIn...')

            let cacheTime;
            let data;
            if (cacheTime && cacheTime > Date.now() - (1000 * 10)) {
                return res.status(201).json(
                    {
                        success: true,
                        data: data,
                        message: `Fin des invitations linkedIn ...`,
                    }
                );
            }
            data = await connectProfileMessageLinkedinMethod(page)
            cacheTime = Date.now()

            const Suivi = new Follows(data)
            Suivi.save()



            //await browser.close()
            return res.status(201).json(
                {
                    success: true,
                    data: data,
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
