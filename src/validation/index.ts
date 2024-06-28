import { ClaimType, CreditorType } from '../types'
import { z } from 'zod'

const optionalEmailSchema = z.string().max(100).email()

const nullableString = z.union([z.null(), z.string().max(255)])

const attachmentsSchema = z.array(
    z.object({
        nama: z.string().min(1, 'Attachment name cannot be empty').max(100),
        ready: z.coerce.boolean(),
        deskripsi: nullableString,
    })
)

const kuasaHukumSchema = z.object({
    namaKuasaHukum: nullableString,
    emailKuasaHukum: z.union([z.null(), optionalEmailSchema]),
    nomorTeleponKuasaHukum: nullableString,
    alamatKorespondensi: nullableString,
})

export const CreditorSchema = z
    .object({
        nama: z.string().min(3).max(255),
        jenis: z
            .string()
            .min(1)
            .refine(
                (input) =>
                    (Object.values(CreditorType) as string[]).includes(input),
                {
                    message: 'Invalid kreditor type',
                }
            ),
        NIKAtauNomorAktaPendirian: nullableString,
        alamat: nullableString,
        email: z.union([z.null(), optionalEmailSchema]),
        nomorTelepon: nullableString,
        tagihanPokok: z.coerce
            .number()
            .min(100, 'Minimum total tagihan adalah Rp 100'),
        bungaTagihan: z.coerce.number().optional(),
        dendaTagihan: z.coerce.number().optional(),
        sifatTagihan: z
            .string()
            .min(1)
            .refine(
                (input) =>
                    (Object.values(ClaimType) as string[]).includes(input),
                { message: 'Invalid claim type' }
            ),
        attachments: attachmentsSchema,
    })
    .and(kuasaHukumSchema.optional())

export type CreditorValues = z.infer<typeof CreditorSchema>

export const ReqBodySchema = z.object({
    data: CreditorSchema,
})
