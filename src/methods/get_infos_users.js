const get_infos_users = async (page)=>{
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
    return user_infos
}

export {
    get_infos_users
}