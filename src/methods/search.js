import {enter_text} from "./enter_text";
import {sleep_for} from "./sleep_for";


const search = async (page) => {
    try {
        await enter_text(page, 'input.search-global-typeahead__input.always-show-placeholder', 'developpeur vuejs/nuxtjs')
        await page.keyboard.type(String.fromCharCode(13));
        await sleep_for(page, 1000, 2000)

        console.log(`Début de la rechercher...`)
    } catch (e) {
        console.log(`Erreur ${e}`)
    }
}

export {
    search
}
