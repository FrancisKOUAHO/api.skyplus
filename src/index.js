import puppeteer from "puppeteer";
import xlsx from "xlsx"
import {sleep_for} from "./methods/sleep_for";
import {authenticate} from "./methods/authenticate";
import {search} from "./methods/search";
import {click_button} from "./methods/click_button";


async function main() {
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
        await sleep_for(page, 50000, 60000)
        await search(page)
        await click_button(page, 'li.search-reusables__primary-filter')

        await sleep_for(page, 500, 1000)


        const DATA_USERS = [];

        for (let i = 0; i < 5; i++) {
            const get_infos_users = await page.evaluate(() => {
                let elements = document.querySelectorAll('div.entity-result__item');
                const div_items = Array.from(elements).map(async (element) => {
                    const fullName = element.querySelector("div.ph0 > ul > li > div > div > div > div > div > div > span > span > a > span > span").innerText.trim();
                    const job = element.querySelector('div.entity-result__primary-subtitle.t-14.t-black.t-normal').textContent.trim();
                    const localisations = element.querySelector('div.entity-result__secondary-subtitle.t-14.t-normal').textContent.trim();
                    const company = element.querySelector('p.entity-result__summary.entity-result__summary--2-lines.t-12.t-black--light.mb1').textContent.trim();
                    const image = element.querySelector('img.ivm-view-attr__img--centered.EntityPhoto-circle-3.lazy-image.ember-view').src

                    return {
                        fullName,
                        job,
                        localisations,
                        company,
                        image
                    }

                })
                return div_items;
            })
            DATA_USERS.push(...get_infos_users);



            // pagination part
            await page.waitFor(2000)
            await page.click('button[aria-label="Suivant"]')
            await page.waitFor(2000)

            console.log("user", DATA_USERS);
            return DATA_USERS;
        }

        await page.waitFor(2000)

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(DATA_USERS)
        xlsx.utils.book_append_sheet(wb, ws)
        xlsx.writeFile(wb, 'data_linkedin.xlsx')

        await sleep_for(page, 500, 1000)
        await browser.close()

        console.log("Done!")
    } catch (e) {
        console.log(e)
    }
}

main()
