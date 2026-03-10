"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ReviewPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    restaurantRating: 5,
    restaurantNote: "",

    foodRating: 5,
    foodNote: "",

    serviceRating: 5,
    serviceNote: "",

    ambienceRating: 5,
    ambienceNote: "",

    orderedFood: "",
    customerEmail: "",
    customerPhone: ""
  })

  const handleChange = (
    field: string,
    value: string | number
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Smart validation
    if (form.foodRating <= 3 && !form.foodNote) {
      alert("Please tell us what went wrong with the food.")
      return
    }

    if (form.serviceRating <= 3 && !form.serviceNote) {
      alert("Please tell us what went wrong with the service.")
      return
    }

    if (form.ambienceRating <= 3 && !form.ambienceNote) {
      alert("Please tell us what went wrong with the ambience.")
      return
    }

    if (!form.orderedFood) {
      alert("Please enter what you ordered.")
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

    if (res.ok) {
      router.push("/thank-you")
    } else {
      alert("Something went wrong. Please try again.")
    }
  }

  const RatingSelect = ({
    label,
    ratingField,
    noteField
  }: {
    label: string
    ratingField: string
    noteField: string
  }) => (
    <div style={{ marginBottom: "20px" }}>
      <h3>{label}</h3>

      <select
        value={(form as any)[ratingField]}
        onChange={(e) =>
          handleChange(ratingField, Number(e.target.value))
        }
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num} ⭐
          </option>
        ))}
      </select>

      {(form as any)[ratingField] <= 3 && (
        <textarea
          placeholder={`Tell us what went wrong with ${label.toLowerCase()}...`}
          value={(form as any)[noteField]}
          onChange={(e) =>
            handleChange(noteField, e.target.value)
          }
          style={{
            display: "block",
            marginTop: "10px",
            width: "100%",
            minHeight: "80px"
          }}
        />
      )}
    </div>
  )

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h2>Restaurant Review</h2>

      <form onSubmit={handleSubmit}>

        <RatingSelect
          label="Restaurant Overall"
          ratingField="restaurantRating"
          noteField="restaurantNote"
        />

        <RatingSelect
          label="Food"
          ratingField="foodRating"
          noteField="foodNote"
        />

        <RatingSelect
          label="Service"
          ratingField="serviceRating"
          noteField="serviceNote"
        />

        <RatingSelect
          label="Ambience"
          ratingField="ambienceRating"
          noteField="ambienceNote"
        />

        <div style={{ marginBottom: "20px" }}>
          <h3>What did you order?</h3>
          <input
            type="text"
            value={form.orderedFood}
            onChange={(e) =>
              handleChange("orderedFood", e.target.value)
            }
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>Email</h3>
          <input
            type="email"
            value={form.customerEmail}
            onChange={(e) =>
              handleChange("customerEmail", e.target.value)
            }
            style={{ width: "100%" }}
            required
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>Phone</h3>
          <input
            type="tel"
            value={form.customerPhone}
            onChange={(e) =>
              handleChange("customerPhone", e.target.value)
            }
            style={{ width: "100%" }}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "black",
            color: "white",
            cursor: "pointer"
          }}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>

      </form>
    </div>
  )
}