const connectProfileMessageLinkedinMethod = async (page) => {

    const data = await page.evaluate(() => {
        let data = [];
        const elements = document.querySelectorAll('div.entity-result__item');
        for (const element of elements) {
            let FullName = element.querySelector("div.ph0 > ul > li > div > div > div > div > div > div > span > span > a > span > span")?.textContent.trim();
            let First_name;
            let Last_name;
            let tab = FullName.split(" ");
            for (let i = 0; i < tab.length; i++) {
                First_name = tab[0]
                Last_name = tab[1]
            }

            /*if (page.waitForSelector('#main > div > div > div > ul > li > div > div > div.entity-result__actions.entity-result__divider > div > button')){

            }*/

            page.waitForSelector('#main > div > div > div > ul > li > div > div > div.entity-result__actions.entity-result__divider > div > button')
            page.click("#main > div > div > div > ul > li > div > div > div.entity-result__actions.entity-result__divider > div > button")

            page.waitFor(10000)

            page.waitForSelector('div > div.artdeco-modal > div > button')
            page.click('div > div.artdeco-modal > div > button')

            page.waitFor(10000)


            page.waitForSelector('textarea#custom-message')
            const session_key = page.$('textarea#custom-message');
            session_key.type(`Bonjour, Un grand merci à vous de m'avoir accepté dans votre réseau professionnel. Très belle journée ☀.`)

            page.waitFor(10000)

            page.waitForSelector('div > div.artdeco-modal__actionbar > button.ml1')
            page.click('div > div.artdeco-modal__actionbar > button.ml1')

            page.waitFor(10000)

            data.push({
                FullName,
                First_name,
                Last_name,
            });
        }
        console.log(data)
        return data;
    });
    console.log(data)
    return data;

    /*    await page.waitForSelector('#main > div > div > div > ul > li > div > div > div.entity-result__actions.entity-result__divider > div > button')
        await page.click("#main > div > div > div > ul > li > div > div > div.entity-result__actions.entity-result__divider > div > button")

        await page.waitForSelector('div > div.artdeco-modal > div > button')
        await page.click('div > div.artdeco-modal > div > button')


        await page.waitForSelector('textarea#custom-message')
        const session_key = await page.$('textarea#custom-message');
        session_key.type(`Bonjour, Un grand merci à vous de m'avoir accepté dans votre réseau professionnel.Très belle journée ☀.`)
        await page.waitFor(2000)

        await page.waitForSelector('div > div.artdeco-modal__actionbar > button.ml1')
        await page.click('div > div.artdeco-modal__actionbar > button.ml1')*/

}

export {
    connectProfileMessageLinkedinMethod
}
