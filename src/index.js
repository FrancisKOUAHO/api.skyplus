import express from "express";
import puppeteer from "puppeteer";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import moment from "moment";

import {sleep_for} from "./methods/sleep_for";
import {authenticate} from "./methods/authenticate";
import {search} from "./methods/search";
import {click_button} from "./methods/click_button";
import {get_infos_users} from "./methods/get_infos_users";
import {save_data} from "./methods/save_data";

import {Client} from "./models/clients";
import xlsx from "xlsx";
import {random_in_from_interval} from "./methods/random_in_from_interval";

const __dirname = path.resolve('public');

const app = express();

mongoose.connect("mongodb+srv://Francis:WAIRECRAFFTERLOUANNE2020@skyplus.e0y0i.mongodb.net/Skyplus?retryWrites=true&w=majority", {
    useNewUrlParser: true
}).then(() => {
    console.log('Mongodb is Connect')

}).catch((e) => {
    console.log(`${e} mongodb is not Connect`)
})

app.use(cors({
    origin: 'http://localhost:3000'
}));


app.get('/scrappin-data-linkedin', function (req, res) {

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

            const DATA_CLIENTS = await new Client(DATA_USERS)
            DATA_CLIENTS.save()


            await page.waitFor(1000)

            save_data(DATA_USERS)
            res.send(DATA_USERS);

            console.log(`Fin de la récuperation des données ...`)

            await browser.close()

        } catch (e) {
            console.log(`Erreur ${e}`)
        }

    });
});


app.get('/get-data-linkedin', async function (req, res) {
    Client.find((error, data) => {
        if (error) {
            return res.status(500).json(
                {
                    success: false,
                    message: `${error} sur la récuperation des données ❌`,
                }
            );
        } else {
            return res.status(201).json(
                {
                    data: data,
                    success: true,
                    message: "Récuperation des données ✅",
                }
            );
        }
    })

})


app.get("/export-data", async function (req, res) {
    Client.find((error, data) => {
        if (error) {
            return res.status(500).json(
                {
                    success: false,
                    message: `${error} Télechargement impossible du fichier excel ❌`,
                }
            );
        } else {
            const startDate = moment().format('YYYY-MM-DD');
            const wb = xlsx.utils.book_new()
            const ws = xlsx.utils.json_to_sheet(data)
            let file_excel = __dirname + `/${startDate}-${random_in_from_interval(0, 1000000000)}.xlsx`
            xlsx.utils.book_append_sheet(wb, ws)
            let file = xlsx.writeFile(wb, file_excel)
            return res.status(201).json(
                {
                    data: file,
                    success: true,
                    message: "Télechargement du fichier excel ✅",
                }
            );
        }
    })

})


app.listen(7000, function () {
    console.log(`Running on port 7000.`);
});

