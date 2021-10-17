const connectProfileMessageLinkedinMethod = async (page) => {

    const data = await page.evaluate(async (page) => {
        await page.waitForSelector('#main > div > div > div > ul > li > div > div > div.entity-result__actions.entity-result__divider > div > button')
        await page.click("#main > div > div > div > ul > li > div > div > div.entity-result__actions.entity-result__divider > div > button")

        await page.waitForSelector('div > div.artdeco-modal > div > button')
        await page.click('div > div.artdeco-modal > div > button')


        await page.waitForSelector('textarea#custom-message')
        const session_key = await page.$('textarea#custom-message');
        session_key.type(`Bonjour, Un grand merci à vous de m'avoir accepté dans votre réseau professionnel.Très belle journée ☀.`)
        await page.waitFor(2000)

        await page.waitForSelector('div > div.artdeco-modal__actionbar > button.ml1')
        await page.click('div > div.artdeco-modal__actionbar > button.ml1')
    })

}

export {
    connectProfileMessageLinkedinMethod
}
