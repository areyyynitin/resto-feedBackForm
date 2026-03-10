import { NextResponse } from "next/server"
import { z } from "zod"
import nodemailer from "nodemailer"
import  prisma from "@/lib/prisma"

const schema = z.object({
  restaurantRating: z.number().min(1).max(5),
  restaurantNote: z.string().optional(),

  foodRating: z.number().min(1).max(5),
  foodNote: z.string().optional(),

  serviceRating: z.number().min(1).max(5),
  serviceNote: z.string().optional(),

  ambienceRating: z.number().min(1).max(5),
  ambienceNote: z.string().optional(),

  orderedFood: z.string().min(2),

  customerEmail: z.string().email(),
  customerPhone: z.string().min(10)
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    await prisma.review.create({ data })

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    await transporter.sendMail({
      from: `"Restaurant Review" <${process.env.SMTP_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: "New Restaurant Review",
      text: `
New Review Submitted

Restaurant: ${data.restaurantRating}/5
Food: ${data.foodRating}/5
Service: ${data.serviceRating}/5
Ambience: ${data.ambienceRating}/5

Ordered Food:
${data.orderedFood}

Restaurant Note:
${data.restaurantNote ?? "N/A"}

Food Note:
${data.foodNote ?? "N/A"}

Service Note:
${data.serviceNote ?? "N/A"}

Ambience Note:
${data.ambienceNote ?? "N/A"}

Customer Email: ${data.customerEmail}
Customer Phone: ${data.customerPhone}
`
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    )
  }
}