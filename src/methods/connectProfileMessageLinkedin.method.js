import {sleep_for} from "./sleep_for";

const connectProfileMessageLinkedinMethod = async (page) => {
    for (let k = 1; k <= 2; k++) {
        const get_invitations = await page.evaluate(() => {
            let items = document.querySelectorAll('div.entity-result__item');
            const invitations = Array.from(items).map(async (item) => {
                await page.waitFor('#main > div > div > div.ph0.pv2.artdeco-card.mb2 > ul > li > div > div > div.entity-result__content.entity-result__divider.pt3.pb3.t-12.t-black--light > div.mb1 > div.t-roman.t-sans > div > span.entity-result__title-line.flex-shrink-1.entity-result__title-text--black > span > a')
                await page.click('#main > div > div > div.ph0.pv2.artdeco-card.mb2 > ul > li > div > div > div.entity-result__content.entity-result__divider.pt3.pb3.t-12.t-black--light > div.mb1 > div.t-roman.t-sans > div > span.entity-result__title-line.flex-shrink-1.entity-result__title-text--black > span > a')
                await page.waitFor(1000)

                await page.waitForSelector('button.pvs-profile-actions__action.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view');
                await page.click('button.pvs-profile-actions__action.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view')
                await page.waitFor(1000)

                await page.waitForSelector('button.mr1.artdeco-button.artdeco-button--muted.artdeco-button--3.artdeco-button--secondary.ember-view');
                await page.click('button.mr1.artdeco-button.artdeco-button--muted.artdeco-button--3.artdeco-button--secondary.ember-view')
                await page.waitFor(1000)


                await page.waitForSelector('textarea.ember-text-area.ember-view.connect-button-send-invite__custom-message.mb3');
                await page.click('textarea.ember-text-area.ember-view.connect-button-send-invite__custom-message.mb3')
                await page.waitFor(1000)


                const session_key = await page.$('textarea.ember-text-area.ember-view.connect-button-send-invite__custom-message.mb3');
                session_key.type('Bonjour')
                sleep_for(page, 1000, 2000)


                await page.waitForSelector('button.ml1.artdeco-button.artdeco-button--3.artdeco-button--primary.ember-view');
                await page.click('button.ml1.artdeco-button.artdeco-button--3.artdeco-button--primary.ember-view')
                await page.waitFor(1000)
            })
            return invitations

        })
        await page.waitFor(10000);

        for(let j = 0; j <=4; j++){
            await page.keyboard.press('Space');
        }
        await page.waitFor('button[aria-label="Suivant"]');
        await page.click('button[aria-label="Suivant"]');

        console.log('Page Suivante...')

        await page.waitFor(2000)
    }

}

export {
    connectProfileMessageLinkedinMethod
}
