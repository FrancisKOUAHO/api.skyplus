import puppeteer from "puppeteer";


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
        await page.waitFor( 2000)

        const username_inputs = await page.$x('//input[@name="session_key"]')
        if (username_inputs.length > 0){
            await username_inputs[0].focus();
            await page.keyboard.type('kouahofrancis@gmail.com')
        }

        const password_inputs = await page.$x('//input[@name="session_password"]')
        if (password_inputs.length > 0){
            await password_inputs[0].focus();
            await page.keyboard.type('WAIRECRAFFTERLOUANNE2020')
        }

        await page.waitFor(2000)

        await page.click('button.sign-in-form__submit-button')
        await page.waitFor( 30000)

        const session_key = await page.$('input.search-global-typeahead__input.always-show-placeholder');
        await session_key.type('developpeur vuejs/nuxtjs')
        await page.waitFor( 1000)
        await page.keyboard.type(String.fromCharCode(13));
        await page.waitFor(2000)


        await page.click('li.search-reusables__primary-filter')
        await page.waitFor( 2000)


        const user_infos = await page.evaluate(() => {
            let user = [];
            let elements = document.querySelectorAll('div.entity-result__item');
            for (let element of elements) {
                user.push({
                    fullName: element.querySelector("#main > div > div > div.ph0.pv2.artdeco-card.mb2 > ul > li > div > div > div.entity-result__content.entity-result__divider.pt3.pb3.t-12.t-black--light > div.mb1 > div.t-roman.t-sans > div > span.entity-result__title-line.flex-shrink-1.entity-result__title-text--black > span > a > span").innerText.trim(),
                    job: element.querySelector('div.entity-result__primary-subtitle.t-14.t-black.t-normal').textContent.trim(),
                    localisations: element.querySelector('div.entity-result__secondary-subtitle.t-14.t-normal').textContent.trim(),
                    company: element.querySelector('p.entity-result__summary.entity-result__summary--2-lines.t-12.t-black--light.mb1').textContent.trim(),
                    image: element.querySelector('img.ivm-view-attr__img--centered.EntityPhoto-circle-3.lazy-image.ember-view').src
                })
            }
            return user
        })
        console.log(user_infos)

        await page.waitFor( 2000)

        //await browser.close();
    } catch (e) {
        console.log(e)
    }
})();
