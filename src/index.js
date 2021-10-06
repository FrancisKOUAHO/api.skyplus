import puppeteer from "puppeteer";
import mongoose from "mongoose";


import {sleep_for} from "./methods/sleep_for";
import {authenticate} from "./methods/authenticate";
import {search} from "./methods/search";
import {click_button} from "./methods/click_button";
import {get_infos_users} from "./methods/get_infos_users";
import {save_data} from "./methods/save_data";

async function main(){
    try {
        mongoose.connect('mongodb+srv://Francis:WAIRECRAFFTERLOUANNE2020@skyplus.e0y0i.mongodb.net/Plumera?retryWrites=true&w=majority')
            .then(()=>(
                console.log('mongoDB is connected')
            )).catch((e)=>{
            console.log(`${e} mongoDB is not connected`)
        })

        const browser = await puppeteer.launch({headless: true});
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
        await sleep_for(page, 5000, 9000)
        await search(page)
        await click_button(page, 'li.search-reusables__primary-filter')

        await sleep_for(page, 500, 1000)

        const GLOBAL_DATA_USERS = await get_infos_users(page)
        console.log(GLOBAL_DATA_USERS)
        await sleep_for(page, 500, 1000)


        await save_data(GLOBAL_DATA_USERS)
        await sleep_for(page, 500, 1000)

        await browser.close()

        console.log("Done!")
    } catch (e) {
        console.log(e)
    }
}

main()
