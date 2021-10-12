import {random_in_from_interval} from "./random_in_from_interval";



const sleep_for = async (page, min, max) => {
    let sleep_duration = random_in_from_interval(min, max);
    console.log('waiting for', sleep_duration / 100, 'second')
    await page.waitFor(sleep_duration)
}


export {
    sleep_for
}
