import {sleep_for} from "./sleep_for";
import {click_button} from "./click_button";
import {password, username} from "../config/secrets";

const authenticate = async function (page) {
    try {
        const username_inputs = await page.$x('//input[@name="session_key"]')
        if (username_inputs.length > 0){
            await username_inputs[0].focus();
            await page.keyboard.type(username)
        }

        const password_inputs = await page.$x('//input[@name="session_password"]')
        if (password_inputs.length > 0){
            await password_inputs[0].focus();
            await page.keyboard.type(password)
        }

        await sleep_for(page, 1000, 2000)

        await click_button(page, 'button.sign-in-form__submit-button')


    }catch (e){
        console.log(`Error in Auth ${e}`)
    }
};

 export {
     authenticate
 }