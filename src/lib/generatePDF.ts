import puppeteer from 'puppeteer'
import ejs from 'ejs'
import path from 'path'

// const data = {
//     id: '1',
//     nama: 'Bambang Jarwo',
//     jenis: 'PRIBADI',
//     NIKAtauNomorAktaPendirian: '12345678',
//     alamat: 'Jl. Menteng Raya No. 1',
//     nomorTelepon: '',
//     korespondensi: 'Jl. Gajah Mada No. 10',
//     totalTagihan: '300000000',
//     sifatTagihan: 'PREFEREN',
//     namaKuasaHukum: '',
//     emailKuasaHukum: '',
//     nomorTeleponKuasaHukum: '081234567891',
//     alamatKuasaHukum: 'Jl. Cendana No. 5',
//     attachments: [
//         {
//             id: '2',
//             creditorId: '1',
//             nama: 'Fotocopy KTP / Identitas',
//             ready: true,
//             deskripsi:
//                 'Sedang Dalam Proses Pengambilan di Sukabumi, Sedang Dalam Proses Pengambilan di Sukabumi, Sedang Dalam Proses Pengambilan di Sukabumi, Sedang Dalam Proses Pengambilan di Sukabumi, Sedang Dalam Proses Pengambilan di Sukabumi, Sedang Dalam Proses Pengambilan di Sukabumi, ',
//         },
//         {
//             id: '3',
//             creditorId: '1',
//             nama: 'Surat Kuasa (jika dikuasakan)',
//             ready: true,
//             deskripsi: '',
//         },
//         {
//             id: '4',
//             creditorId: '1',
//             nama: 'Fotocopy KTP Penerima Kuasa',
//             ready: false,
//             deskripsi: 'Katanya hilang lah pokoknya',
//         },
//         {
//             id: '5',
//             creditorId: '1',
//             nama: 'Surat Pernah Makan Nasi Goreng',
//             ready: false,
//             deskripsi: 'Tidak ditemukan',
//         },
//         {
//             id: '5',
//             creditorId: '1',
//             nama: 'Surat Pernah Makan Nasi Padang',
//             ready: true,
//             deskripsi: '',
//         },
//     ],
// }

const ejsFilePath = path.join(__dirname, '..', 'views', 'template.ejs')

async function generatePDF(data:any) {
    const {
        totalTagihan,
        id,
        slug,
        namaKuasaHukum,
        emailKuasaHukum,
        nomorTeleponKuasaHukum,
        alamatKuasaHukum,
        nama,
        jenis,
        sifatTagihan,
        ...rest
    } = data

    function formatCurrency(amount: number) {
        const CURRENCY_FORMATTER = new Intl.NumberFormat('id-ID', {
            currency: 'IDR',
            style: 'currency',
            minimumFractionDigits: 0,
        })
        return CURRENCY_FORMATTER.format(amount)
    }

    const html = await ejs.renderFile(ejsFilePath, {
        data: {
            kuasa: {
                namaKuasaHukum,
                emailKuasaHukum,
                nomorTeleponKuasaHukum,
                alamatKuasaHukum,
            },
            nama,
            jenis,
            sifatTagihan,
            totalTagihan: formatCurrency(Number(totalTagihan)),
            ...rest,
        },
    })
    console.log(html)

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    // Set content of the page to the generated HTML
    await page.setContent(html)

    // Get header HTML
    const headerTemplate = `
    <style>#header, #footer { padding: 0 !important; }</style>
    <div 
        class="header" 
        style="padding: 15px !important; margin: 0; -webkit-print-color-adjust: exact; width: 100%; border-bottom: 1px  solid black; display:flex; flex-direction: column; justify-content: center; align-items:center; gap: 8px; text-align: left; font-size: 12px;""
        >
        <h1 style="margin: 0;">CONFIDENTIAL</h1>
        <p style="font-size: 14px; margin: 0;">Detail Kreditor PT Kodomo Sukses Jaya Tbk.</p>
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); opacity: 0.5; font-size: 100px; font-weight: 500; color: #e0e0e0;">CONFIDENTIAL</div>
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
