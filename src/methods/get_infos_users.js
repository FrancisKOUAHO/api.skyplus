const get_infos_users = async (page) => {
    const GLOBAL_DATA_USERS = [];
    for (let k = 1; k <= 1; k++) {
        const clients = await page.evaluate(() => {
            let items = document.querySelectorAll('div.entity-result__item');
            const user_infos = Array.from(items).map((item) => {
                let FullName = item.querySelector("div.ph0 > ul > li > div > div > div > div > div > div > span > span > a > span > span")?.textContent.trim();
                const Job = item.querySelector('div.entity-result__primary-subtitle.t-14.t-black.t-normal')?.textContent.trim();
                const Localisations = item.querySelector('div.entity-result__secondary-subtitle.t-14.t-normal')?.textContent.trim();
                const Company = item.querySelector('p.entity-result__summary.entity-result__summary--2-lines.t-12.t-black--light.mb1')?.textContent.trim();
                const Image = item.querySelector('img.ivm-view-attr__img--centered')?.src

                let First_name;
                let Last_name;
                let tab = FullName.split(" ");
                for (let i = 0; i < tab.length; i++) {
                    First_name = tab[0]
                    Last_name = tab[1]
                }


                return {
                    First_name,
                    Last_name,
                    FullName,
                    Job,
                    Localisations,
                    Company,
                    Image
                }

            })
            return user_infos
        })
        GLOBAL_DATA_USERS.push(...clients);

        await page.waitFor(1000);

        for (let j = 1; j <= 4; j++) {
            await page.keyboard.press('Space');
        }
        await page.waitFor('button[aria-label="Suivant"]');
        await page.click('button[aria-label="Suivant"]');

        console.log(`Page n° ${k}`)

        await page.waitFor(1000);

    }
    console.log(GLOBAL_DATA_USERS)
    return GLOBAL_DATA_USERS
}

export {
    get_infos_users
}
