import puppeteer from "puppeteer"
import ejs from "ejs"
import path from "path"

const data = {
    id: "1",
    nama: "Bambang Jarwo",
    slug: "bambang-jarwo-1",
    jenis: "PRIBADI",
    NIKAtauNomorAktaPendirian: "12345678",
    alamat: "Jl. Menteng Raya No. 1",
    email: "bambangJarwo_njay@gmail.com",
    nomorTelepon: "081234567890",
    korespondensi: "Jl. Gajah Mada No. 10",
    totalTagihan: "300000000",
    sifatTagihan: "PREFEREN",
    namaKuasaHukum: "Andi",
    emailKuasaHukum: "andi_ganteng@gmail.com",
    nomorTeleponKuasaHukum: "081234567891",
    alamatKuasaHukum: "Jl. Cendana No. 5",
    attachments: [
        {
            id: "2",
            creditorId: "1",
            nama: "Fotocopy KTP / Identitas",
            ready: false,
            deskripsi: "",
        },
        {
            id: "3",
            creditorId: "1",
            nama: "Surat Kuasa (jika dikuasakan)",
            ready: false,
            deskripsi: "",
        },
        {
            id: "4",
            creditorId: "1",
            nama: "Fotocopy KTP Penerima Kuasa",
            ready: false,
            deskripsi: "",
        },
        {
            id: "5",
            creditorId: "1",
            nama: "Surat Pernah Makan Nasi Goreng",
            ready: false,
            deskripsi: "",
        },
        {
            id: "2",
            creditorId: "1",
            nama: "Fotocopy KTP / Identitas",
            ready: false,
            deskripsi: "",
        },
        {
            id: "3",
            creditorId: "1",
            nama: "Surat Kuasa (jika dikuasakan)",
            ready: false,
            deskripsi: "",
        },
        {
            id: "4",
            creditorId: "1",
            nama: "Fotocopy KTP Penerima Kuasa",
            ready: false,
            deskripsi: "",
        },
        {
            id: "5",
            creditorId: "1",
            nama: "Surat Pernah Makan Nasi Goreng",
            ready: false,
            deskripsi: "",
        },
        {
            id: "2",
            creditorId: "1",
            nama: "Fotocopy KTP / Identitas",
            ready: false,
            deskripsi: "",
        },
        {
            id: "3",
            creditorId: "1",
            nama: "Surat Kuasa (jika dikuasakan)",
            ready: false,
            deskripsi: "",
        },
        {
            id: "4",
            creditorId: "1",
            nama: "Fotocopy KTP Penerima Kuasa",
            ready: false,
            deskripsi: "",
        },
        {
            id: "5",
            creditorId: "1",
            nama: "Surat Pernah Makan Nasi Goreng",
            ready: false,
            deskripsi: "",
        },
        {
            id: "2",
            creditorId: "1",
            nama: "Fotocopy KTP / Identitas",
            ready: false,
            deskripsi: "",
        },
        {
            id: "3",
            creditorId: "1",
            nama: "Surat Kuasa (jika dikuasakan)",
            ready: false,
            deskripsi: "",
        },
        {
            id: "4",
            creditorId: "1",
            nama: "Fotocopy KTP Penerima Kuasa",
            ready: false,
            deskripsi: "",
        },
        {
            id: "5",
            creditorId: "1",
            nama: "Surat Pernah Makan Nasi Goreng",
            ready: false,
            deskripsi: "",
        },
        {
            id: "2",
            creditorId: "1",
            nama: "Fotocopy KTP / Identitas",
            ready: false,
            deskripsi: "",
        },
        {
            id: "3",
            creditorId: "1",
            nama: "Surat Kuasa (jika dikuasakan)",
            ready: false,
            deskripsi: "",
        },
        {
            id: "4",
            creditorId: "1",
            nama: "Fotocopy KTP Penerima Kuasa",
            ready: false,
            deskripsi: "",
        },
        {
            id: "5",
            creditorId: "1",
            nama: "Surat Pernah Makan Nasi Goreng",
            ready: false,
            deskripsi: "",
        },
        {
            id: "2",
            creditorId: "1",
            nama: "Fotocopy KTP / Identitas",
            ready: false,
            deskripsi: "",
        },
        {
            id: "3",
            creditorId: "1",
            nama: "Surat Kuasa (jika dikuasakan)",
            ready: false,
            deskripsi: "",
        },
        {
            id: "4",
            creditorId: "1",
            nama: "Fotocopy KTP Penerima Kuasa",
            ready: false,
            deskripsi: "",
        },
        {
            id: "5",
            creditorId: "1",
            nama: "Surat Pernah Makan Nasi Goreng",
            ready: false,
            deskripsi: "",
        },
        {
            id: "2",
            creditorId: "1",
            nama: "Fotocopy KTP / Identitas",
            ready: false,
            deskripsi: "",
        },
        {
            id: "3",
            creditorId: "1",
            nama: "Surat Kuasa (jika dikuasakan)",
            ready: false,
            deskripsi: "",
        },
        {
            id: "4",
            creditorId: "1",
            nama: "Fotocopy KTP Penerima Kuasa",
            ready: false,
            deskripsi: "",
        },
        {
            id: "5",
            creditorId: "1",
            nama: "Surat Pernah Makan Nasi Goreng",
            ready: false,
            deskripsi: "",
        },
        {
            id: "2",
            creditorId: "1",
            nama: "Fotocopy KTP / Identitas",
            ready: false,
            deskripsi: "",
        },
        {
            id: "3",
            creditorId: "1",
            nama: "Surat Kuasa (jika dikuasakan)",
            ready: false,
            deskripsi: "",
        },
        {
            id: "4",
            creditorId: "1",
            nama: "Fotocopy KTP Penerima Kuasa",
            ready: false,
            deskripsi: "",
        },
        {
            id: "5",
            creditorId: "1",
            nama: "Surat Pernah Makan Nasi Goreng",
            ready: false,
            deskripsi: "",
        },
        {
            id: "2",
            creditorId: "1",
            nama: "Fotocopy KTP / Identitas",
            ready: false,
            deskripsi: "",
        },
        {
            id: "3",
            creditorId: "1",
            nama: "Surat Kuasa (jika dikuasakan)",
            ready: false,
            deskripsi: "",
        },
        {
            id: "4",
            creditorId: "1",
            nama: "Fotocopy KTP Penerima Kuasa",
            ready: false,
            deskripsi: "",
        },
        {
            id: "5",
            creditorId: "1",
            nama: "Surat Pernah Makan Nasi Goreng",
            ready: false,
            deskripsi: "",
        },
        {
            id: "2",
            creditorId: "1",
            nama: "Fotocopy KTP / Identitas",
            ready: false,
            deskripsi: "",
        },
        {
            id: "3",
            creditorId: "1",
            nama: "Surat Kuasa (jika dikuasakan)",
            ready: false,
            deskripsi: "",
        },
        {
            id: "4",
            creditorId: "1",
            nama: "Fotocopy KTP Penerima Kuasa",
            ready: false,
            deskripsi: "",
        },
        {
            id: "5",
            creditorId: "1",
            nama: "Surat Pernah Makan Nasi Goreng",
            ready: false,
            deskripsi: "",
        },
        {
            id: "2",
            creditorId: "1",
            nama: "Fotocopy KTP / Identitas",
            ready: false,
            deskripsi: "",
        },
        {
            id: "3",
            creditorId: "1",
            nama: "Surat Kuasa (jika dikuasakan)",
            ready: false,
            deskripsi: "",
        },
        {
            id: "4",
            creditorId: "1",
            nama: "Fotocopy KTP Penerima Kuasa",
            ready: false,
            deskripsi: "",
        },
        {
            id: "5",
            creditorId: "1",
            nama: "Surat Pernah Makan Nasi Goreng",
            ready: false,
            deskripsi: "",
        },
        {
            id: "2",
            creditorId: "1",
            nama: "Fotocopy KTP / Identitas",
            ready: false,
            deskripsi: "",
        },
        {
            id: "3",
            creditorId: "1",
            nama: "Surat Kuasa (jika dikuasakan)",
            ready: false,
            deskripsi: "",
        },
        {
            id: "4",
            creditorId: "1",
            nama: "Fotocopy KTP Penerima Kuasa",
            ready: false,
            deskripsi: "",
        },
        {
            id: "5",
            creditorId: "1",
            nama: "Surat Pernah Makan Nasi Goreng",
            ready: false,
            deskripsi: "",
        },
        {
            id: "2",
            creditorId: "1",
            nama: "Fotocopy KTP / Identitas",
            ready: false,
            deskripsi: "",
        },
        {
            id: "3",
            creditorId: "1",
            nama: "Surat Kuasa (jika dikuasakan)",
            ready: false,
            deskripsi: "",
        },
        {
            id: "4",
            creditorId: "1",
            nama: "Fotocopy KTP Penerima Kuasa",
            ready: false,
            deskripsi: "",
        },
        {
            id: "5",
            creditorId: "1",
            nama: "Surat Pernah Makan Nasi Goreng",
            ready: false,
            deskripsi: "",
        },
        {
            id: "2",
            creditorId: "1",
            nama: "Fotocopy KTP / Identitas",
            ready: false,
            deskripsi: "",
        },
        {
            id: "3",
            creditorId: "1",
            nama: "Surat Kuasa (jika dikuasakan)",
            ready: false,
            deskripsi: "",
        },
        {
            id: "4",
            creditorId: "1",
            nama: "Fotocopy KTP Penerima Kuasa",
            ready: false,
            deskripsi: "",
        },
        {
            id: "5",
            creditorId: "1",
            nama: "Surat Pernah Makan Nasi Goreng",
            ready: false,
            deskripsi: "",
        },
        {
            id: "2",
            creditorId: "1",
            nama: "Fotocopy KTP / Identitas",
            ready: false,
            deskripsi: "",
        },
        {
            id: "3",
            creditorId: "1",
            nama: "Surat Kuasa (jika dikuasakan)",
            ready: false,
            deskripsi: "",
        },
        {
            id: "4",
            creditorId: "1",
            nama: "Fotocopy KTP Penerima Kuasa",
            ready: false,
            deskripsi: "",
        },
        {
            id: "5",
            creditorId: "1",
            nama: "Surat Pernah Makan Nasi Goreng",
            ready: false,
            deskripsi: "",
        },
        {
            id: "2",
            creditorId: "1",
            nama: "Fotocopy KTP / Identitas",
            ready: false,
            deskripsi: "",
        },
        {
            id: "3",
            creditorId: "1",
            nama: "Surat Kuasa (jika dikuasakan)",
            ready: false,
            deskripsi: "",
        },
        {
            id: "4",
            creditorId: "1",
            nama: "Fotocopy KTP Penerima Kuasa",
            ready: false,
            deskripsi: "",
        },
        {
            id: "5",
            creditorId: "1",
            nama: "Surat Pernah Makan Nasi Goreng",
            ready: false,
            deskripsi: "",
        },
        {
            id: "2",
            creditorId: "1",
            nama: "Fotocopy KTP / Identitas",
            ready: false,
            deskripsi: "",
        },
        {
            id: "3",
            creditorId: "1",
            nama: "Surat Kuasa (jika dikuasakan)",
            ready: false,
            deskripsi: "",
        },
        {
            id: "4",
            creditorId: "1",
            nama: "Fotocopy KTP Penerima Kuasa",
            ready: false,
            deskripsi: "",
        },
        {
            id: "5",
            creditorId: "1",
            nama: "Surat Pernah Makan Nasi Goreng",
            ready: false,
            deskripsi: "",
        },
        {
            id: "2",
            creditorId: "1",
            nama: "Fotocopy KTP / Identitas",
            ready: false,
            deskripsi: "",
        },
        {
            id: "3",
            creditorId: "1",
            nama: "Surat Kuasa (jika dikuasakan)",
            ready: false,
            deskripsi: "",
        },
        {
            id: "4",
            creditorId: "1",
            nama: "Fotocopy KTP Penerima Kuasa",
            ready: false,
            deskripsi: "",
        },
        {
            id: "5",
            creditorId: "1",
            nama: "Surat Pernah Makan Nasi Goreng",
            ready: false,
            deskripsi: "",
        },
        {
            id: "2",
            creditorId: "1",
            nama: "Fotocopy KTP / Identitas",
            ready: false,
            deskripsi: "",
        },
        {
            id: "3",
            creditorId: "1",
            nama: "Surat Kuasa (jika dikuasakan)",
            ready: false,
            deskripsi: "",
        },
        {
            id: "4",
            creditorId: "1",
            nama: "Fotocopy KTP Penerima Kuasa",
            ready: false,
            deskripsi: "",
        },
        {
            id: "5",
            creditorId: "1",
            nama: "Surat Pernah Makan Nasi Goreng",
            ready: false,
            deskripsi: "",
        },
        {
            id: "2",
            creditorId: "1",
            nama: "Fotocopy KTP / Identitas",
            ready: false,
            deskripsi: "",
        },
        {
            id: "3",
            creditorId: "1",
            nama: "Surat Kuasa (jika dikuasakan)",
            ready: false,
            deskripsi: "",
        },
        {
            id: "4",
            creditorId: "1",
            nama: "Fotocopy KTP Penerima Kuasa",
            ready: false,
            deskripsi: "",
        },
        {
            id: "5",
            creditorId: "1",
            nama: "Surat Pernah Makan Nasi Goreng",
            ready: false,
            deskripsi: "",
        },
        {
            id: "2",
            creditorId: "1",
            nama: "Fotocopy KTP / Identitas",
            ready: false,
            deskripsi: "",
        },
        {
            id: "3",
            creditorId: "1",
            nama: "Surat Kuasa (jika dikuasakan)",
            ready: false,
            deskripsi: "",
        },
        {
            id: "4",
            creditorId: "1",
            nama: "Fotocopy KTP Penerima Kuasa",
            ready: false,
            deskripsi: "",
        },
        {
            id: "5",
            creditorId: "1",
            nama: "Surat Pernah Makan Nasi Goreng",
            ready: false,
            deskripsi: "",
        },
    ],
}

const ejsFilePath = path.join(__dirname, '..', 'views', 'template.ejs');


async function generatePDF() {
    const html = await ejs.renderFile(ejsFilePath, {data})

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    // Set content of the page to the generated HTML
    await page.setContent(html)

    const pdfBuffer = await page.pdf()
    // Close the browser
    await browser.close()

    return pdfBuffer
}

export default generatePDF
