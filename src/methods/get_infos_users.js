/*
const get_infos_users = async (page)=>{
    const user_infos = await page.evaluate(async () => {
        let user = [];
        let elements = document.querySelectorAll('div.entity-result__item');
        for (let element of elements) {
            user.push({
                fullName: element.querySelector("div.ph0 > ul > li > div > div > div > div > div > div > span > span > a > span > span").textContent.trim(),
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
*/
