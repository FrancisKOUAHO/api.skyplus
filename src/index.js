import express from "express";
const app = express()
import puppeteer from "puppeteer";


import {sleep_for} from "./methods/sleep_for";
import {authenticate} from "./methods/authenticate";
import {search} from "./methods/search";
import {click_button} from "./methods/click_button";
import {get_infos_users} from "./methods/get_infos_users";
import {save_data} from "./methods/save_data";

app.get('/scrappin-data-linkedin', function (req, res) {
    puppeteer.launch().then(async function (browser) {
            const page = await browser.newPage();
            const URL = 'https://www.linkedin.com';
            await page.setViewport({
                width: 1280,
                height: 800,
                deviceScaleFactor: 1
            });
            await page.goto(URL);
            await sleep_for(page, 1000, 2000)

            await authenticate(page)
            console.log('Connection Linkedin OK...')
            await sleep_for(page, 30000, 15000)
            await search(page)
            await click_button(page, 'li.search-reusables__primary-filter')
            console.log('Recherche OK...')

            await sleep_for(page, 500, 1000)

            console.log('recolte de donnees...')

            const DATA_USERS = await get_infos_users(page)
            console.log(DATA_USERS)

            await page.waitFor(2000)

            save_data(DATA_USERS)
            await browser.close()
            console.log("Done!")
            res.send(DATA_USERS);
    });
});


app.listen(7000, function () {
    console.log(`Running on port 7000.`);
});

