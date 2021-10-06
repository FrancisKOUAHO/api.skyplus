import puppeteer from "puppeteer";
import xlsx from "xlsx"
import {sleep_for} from "./methods/sleep_for";
import {authenticate} from "./methods/authenticate";
import {search} from "./methods/search";
import {click_button} from "./methods/click_button";
import {get_infos_users} from "./methods/get_infos_users";


(async () => {
    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        const URL = 'https://www.linkedin.com';
        await page.setViewport({
            width: 1280,
            height: 800,
            deviceScaleFactor: 1
        });
        await page.goto(URL, {waitUntil: 'networkidle2'});
        await sleep_for(page, 1000, 2000)

        await authenticate(page)
        await sleep_for(page, 10000, 20000)
        await search(page)
        await click_button(page, 'li.search-reusables__primary-filter')

        await sleep_for(page, 500, 1000)

        const DATA_USERS = await get_infos_users(page)
        console.log(DATA_USERS)
        await sleep_for(page, 500, 1000)

        const DATA_GET_USERS = DATA_USERS.map(user => [user])


        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.aoa_to_sheet(DATA_GET_USERS)
        xlsx.utils.book_append_sheet(wb, ws)
        xlsx.writeFile(wb, 'data_linkedin.xlsx')

    } catch (e) {
        console.log(e)
    }
})();
