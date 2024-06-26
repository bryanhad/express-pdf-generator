import ejs from 'ejs'
import path from 'path'
import process from 'process'
import puppeteer, { Browser } from 'puppeteer'
import { CreditorValues } from '../validation'

const ejsFilePath = path.join(process.cwd(), 'src', 'views', 'template.ejs')

function formatCurrency(amount: number) {
    const CURRENCY_FORMATTER = new Intl.NumberFormat('id-ID', {
        currency: 'IDR',
        style: 'currency',
        minimumFractionDigits: 0,
    })
    return CURRENCY_FORMATTER.format(amount)
}

async function generatePDF(data: CreditorValues) {
    const {
        tagihanPokok,
        NIKAtauNomorAktaPendirian,
        dendaTagihan,
        bungaTagihan,
        namaKuasaHukum,
        emailKuasaHukum,
        nomorTeleponKuasaHukum,
        alamat,
        alamatKorespondensi,
        nama,
        jenis,
        sifatTagihan,
        attachments,
    } = data

    const html = await ejs.renderFile(ejsFilePath, {
        data: {
            // kuasa: {
            //     namaKuasaHukum,
            //     emailKuasaHukum,
            //     nomorTeleponKuasaHukum,
            //     alamatKorespondensi,
            // },
            nama,
            NIKAtauNomorAktaPendirian,
            "Alamat Kreditor": alamat,
            "Kuasa atau Kuasa Hukum": namaKuasaHukum,
            "Alamat Korespondensi": alamatKorespondensi,
            "Contact Person": nomorTeleponKuasaHukum,
            "Email Kuasa / Kuasa Hukum": emailKuasaHukum,
            "Total Tagihan": formatCurrency(tagihanPokok + (dendaTagihan || 0) + (bungaTagihan || 0)),
            "Tagihan Pokok": formatCurrency(tagihanPokok),
            "Bunga": formatCurrency(bungaTagihan || 0),
            "Denda": formatCurrency(dendaTagihan || 0),
            attachments,
        },
    })

    let browser: Browser
    if (process.env.NODE_ENV === 'development') {
        browser = await puppeteer.launch()
    } else {
        browser = await puppeteer.launch({
            executablePath: '/usr/bin/google-chrome',
            args: ['--no-sandbox'],
        })
    }
    const page = await browser.newPage()

    // Set content of the page to the generated HTML
    await page.setContent(html)

    // Get header HTML
    const headerTemplate = `
    <style>#header, #footer { padding: 0 !important; }</style>
    <div class="header" 
    style="padding-top: 45px;margin-right: 50px; margin-left: 75px; margin-bottom: 2px; -webkit-print-color-adjust: exact; width: 100%; border-bottom: 4px solid black; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; font-size: 12px;">
        <h1 style="margin: 0; font-weight: 900; font-size: 16px;">TIM PENGURUS PT TFORCE INDONESIA JAYA (dalam PKPU)</h1>
        <p style="font-size: 16px; margin: 0; padding-bottom:4px">Arifudin & Susanto Partnership (ASP Law Firm), The H Tower, 15th Floor, Unit 15-F<br/>Jln. H.R. Rasuna Said Kav. 20, Karet Kuningan, Setiabudi, Jakarta Selatan 12940<br/>
            <span style="color: rgb(0, 98, 255);">Telp. (021) 29533324</span>, E-mail: <span style="text-decoration: underline; color: rgb(0, 98, 255);">pkpu.tij@gmail.com</span>
        </p>
    </div>
    `
    const footerTemplate = `
    <div style="font-size: 12px;  width: 100%; height: 25px; background-color: red; color:black; margin: 0px 25px 10px 25px;">
        &copy; Bryan Hadinata - Confidential & Proprietary
    </div>
    `

    const pages = await page.pdf({
        format: 'A4',
        displayHeaderFooter: true,
        headerTemplate,
        footerTemplate,
    })
    // Close the browser
    await browser.close()

    return pages
}

export default generatePDF
