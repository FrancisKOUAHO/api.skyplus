import puppeteer from "puppeteer";
import {sleep_for} from "../methods/sleep_for";
import {authenticate} from "../methods/authenticate";
import {search} from "../methods/search";
import {click_button} from "../methods/click_button";
import {get_infos_users} from "../methods/get_infos_users";
import {Client} from "../models/clients";
import {save_data} from "../methods/save_data";
import {getDataLinkedinController} from "./getDataLinkedin.controller";

const scrapingController = async (req, res) => {
    puppeteer.launch().then(async function (browser) {
        try {
            const page = await browser.newPage();
            const URL = 'https://www.linkedin.com';
            await page.setViewport({
                width: 1280,
                height: 800,
                deviceScaleFactor: 1
            });
            await page.goto(URL);
            await sleep_for(page, 900, 1000)

            await authenticate(page)
            await sleep_for(page, 1000, 1200)
            await search(page)
            await click_button(page, 'li.search-reusables__primary-filter')

            await sleep_for(page, 1000, 1200)

            console.log(`Début de la récuperation des données ...`)

            const DATA_USERS = await get_infos_users(page)
            console.log(DATA_USERS)

            await page.waitFor(1000)

            save_data(DATA_USERS)
            console.log(`Fin de la récuperation des données ...`)
            return res.status(201).json(
                {
                    success: true,
                    data: DATA_USERS,
                    message: `Fin de la récuperation des données ...`,
                }
            );
            await browser.close()
        } catch (error) {
            return res.status(500).json(
                {
                    success: false,
                    message: `${error} sur la récuperation des données ❌`,
                }
            );
        }

    });
};


export {
    scrapingController
}
