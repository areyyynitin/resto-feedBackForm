"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

type FormType = {
  restaurantRating: number
  restaurantNote: string

  foodRating: number
  foodNote: string

  serviceRating: number
  serviceNote: string

  ambienceRating: number
  ambienceNote: string

  orderedFood: string
  customerEmail: string
  customerPhone: string
}

type RatingField =
  | "restaurantRating"
  | "foodRating"
  | "serviceRating"
  | "ambienceRating"

type NoteField =
  | "restaurantNote"
  | "foodNote"
  | "serviceNote"
  | "ambienceNote"

type StarRatingProps = {
  label: string
  rating: number
  note: string
  ratingField: RatingField
  noteField: NoteField
  handleChange: (field: keyof FormType, value: string | number) => void
}

function StarRating({
  label,
  rating,
  note,
  ratingField,
  noteField,
  handleChange
}: StarRatingProps) {
  return (
    <div className="mb-8">
      <h3 className="font-semibold text-[#15190c] mb-2">{label}</h3>

      <div className="flex gap-2 text-3xl sm:text-4xl cursor-pointer flex-wrap">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleChange(ratingField, star)}
            className={`transition ${
              star <= rating
                ? "text-[#92b45d]"
                : "text-gray-300 hover:text-[#7ec395]"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {rating > 0 && (
        <textarea
          placeholder={`Write feedback about ${label.toLowerCase()}...`}
          value={note}
          onChange={(e) => handleChange(noteField, e.target.value)}
          className="w-full mt-3 p-3 text-black rounded-lg border border-gray-200 min-h-22.5 focus:outline-none focus:ring-2 focus:ring-[#9fd3a3] resize-none"
        />
      )}
    </div>
  )
}

export default function ReviewPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState<FormType>({
    restaurantRating: 0,
    restaurantNote: "",

    foodRating: 0,
    foodNote: "",

    serviceRating: 0,
    serviceNote: "",

    ambienceRating: 0,
    ambienceNote: "",

    orderedFood: "",
    customerEmail: "",
    customerPhone: ""
  })

  const handleChange = (field: keyof FormType, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (
      !form.restaurantRating ||
      !form.foodRating ||
      !form.serviceRating ||
      !form.ambienceRating
    ) {
      alert("Please rate all categories.")
      return
    }

    setLoading(true)

    const res = await fetch("/api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })

    setLoading(false)

    if (res.ok) router.push("/thank-you")
    else alert("Something went wrong.")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-10">
      <div className="w-full max-w-xl bg-[#f7f9f1] rounded-xl shadow-md p-6 sm:p-8">
        <div className="flex gap-5 justify-center  items-center mb-6">
  <Image
    src="/ohhhdaily.png"
    alt="Restaurant Logo"
    width={80}
    height={80}
    className="mb-3"
  />

  <h2 className="text-2xl font-sans font-bold text-[#15190c]">
    Feedback Form
  </h2>
</div>

        <form onSubmit={handleSubmit}>
          <StarRating
            label="Restaurant Overall"
            rating={form.restaurantRating}
            note={form.restaurantNote}
            ratingField="restaurantRating"
            noteField="restaurantNote"
            handleChange={handleChange}
          />

          <StarRating
            label="Food"
            rating={form.foodRating}
            note={form.foodNote}
            ratingField="foodRating"
            noteField="foodNote"
            handleChange={handleChange}
          />

          <StarRating
            label="Service"
            rating={form.serviceRating}
            note={form.serviceNote}
            ratingField="serviceRating"
            noteField="serviceNote"
            handleChange={handleChange}
          />

          <StarRating
            label="Ambience"
            rating={form.ambienceRating}
            note={form.ambienceNote}
            ratingField="ambienceRating"
            noteField="ambienceNote"
            handleChange={handleChange}
          />

          <div className="mb-5">
            <h3 className="font-semibold text-[#15190c] mb-2">
              What did you order?
            </h3>

            <input
              type="text"
              value={form.orderedFood}
              onChange={(e) =>
                handleChange("orderedFood", e.target.value)
              }
              className="w-full p-3 text-black rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#9fd3a3] outline-none"
              required
            />
          </div>

          <div className="mb-5">
            <h3 className="font-semibold text-[#15190c] mb-2">Email</h3>

            <input
              type="email"
              value={form.customerEmail}
              onChange={(e) =>
                handleChange("customerEmail", e.target.value)
              }
              className="w-full p-3 rounded-lg border text-black border-gray-200 focus:ring-2 focus:ring-[#9fd3a3] outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-[#15190c] mb-2">Phone</h3>

            <input
              type="tel"
              value={form.customerPhone}
              onChange={(e) =>
                handleChange("customerPhone", e.target.value)
              }
              className="w-full p-3 rounded-lg border text-black border-gray-200 focus:ring-2 focus:ring-[#9fd3a3] outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-[#92b45d] text-white font-semibold hover:bg-[#7ec395] transition"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  )
}
