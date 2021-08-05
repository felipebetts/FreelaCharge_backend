const puppeteer = require('puppeteer')

class PuppeteerService {
    async scrapWorkana(job) {
        const browser = await puppeteer.launch();
        // const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(`https://www.workana.com/freelancers?query=${job}`);

        const averagePrice = await page.evaluate(() => {
            //   essa funcao será executada no browser

            // vamos pegar todos os preços por hora 
            const nodeList = document.querySelectorAll('.monetary-amount')

            // transformar o NodeList recebida em array
            const priceElementsArray = [...nodeList]
            // return priceArray
            if (!priceElementsArray[0]) {
                throw new Error('No match for this job...')
            }

            console.log('priceElementsArray: ', priceElementsArray)

            // transformar os nodes(elementos html) em objetos JS
            const pricesArray = priceElementsArray.map(el => {
                return parseFloat(el.innerHTML)
            })

            const sumAllValues = pricesArray.reduce((acc, curr) => acc + curr)
            // console.log(list)
            console.log('pricesArray: ', pricesArray)
            console.log('sumAllValues: ', sumAllValues)
            const averageValue = sumAllValues / priceElementsArray.length

            return averageValue
        })

        await browser.close();
        return averagePrice
    }
}

module.exports = PuppeteerService