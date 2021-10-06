import {sleep_for} from "./sleep_for";

const enter_text = async function (page, selector, text) {
    const session_key = await page.$(selector);
    session_key.type(text)
    await sleep_for(page, 1000, 2000)
};

export {
    enter_text
}