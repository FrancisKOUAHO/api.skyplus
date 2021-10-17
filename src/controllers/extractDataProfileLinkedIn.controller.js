import puppeteer from "puppeteer";
import {sleep_for} from "../methods/sleep_for";
import {authenticate} from "../methods/authenticate";
import {search} from "../methods/search";
import {click_button} from "../methods/click_button";
import {extractDataProfileLinkedInMethod} from "../methods/extractDataProfileLinkedIn.method";
import {save_data} from "../methods/save_data";
import {getDataLinkedinController} from "./getDataLinkedin.controller";
import {Client} from "../models/clients";

const extractDataProfileLinkedInController = async (req, res) => {
    puppeteer.launch({headless: true}).then(async function (browser) {
        try {
            const page = await browser.newPage();
            const URL = 'https://www.linkedin.com';
            await page.setViewport({
                width: 1440,
                height: 789,
                deviceScaleFactor: 1
            });
            await page.goto(URL);
            await sleep_for(page, 900, 1000)

            await authenticate(page)
            await sleep_for(page, 1000, 1200)
            await search(page)
            await sleep_for(page, 1000, 1200)
            await click_button(page, 'li.search-reusables__primary-filter')

            await sleep_for(page, 1000, 1200)

            console.log(`Début de la récuperation des données ...`)

            const DATA_USERS = await extractDataProfileLinkedInMethod(page)
            console.log(DATA_USERS)
            await page.waitFor(1000)

            const SAVE_DATA_MONGODB = new Client(DATA_USERS)
            console.log(`++++++++++++++++ ${JSON.stringify(DATA_USERS)}`)
            SAVE_DATA_MONGODB.save().then(()=>{
                console.log('SAVE DATA TO MONGODB ')
            }).catch((err)=>{
                console.log(`DON'T SAVE DATA TO MONGODB ${err}`)
            })

            save_data(DATA_USERS)
            console.log(`Fin de la récuperation des données ...`)
            await browser.close()
            return res.status(201).json(
                {
                    success: true,
                    data: DATA_USERS,
                    message: `Fin de la récuperation des données ...`,
                }
            );
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
    extractDataProfileLinkedInController
}
