import {sleep_for} from "./sleep_for";

const click_button = async (page, selector) => {
    await page.click(selector)
    await sleep_for(page, 5000, 8000)
}

export {
    click_button
}