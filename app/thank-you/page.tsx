
import Link from "next/link"
import Image from "next/image"

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-[#f7f9f1] rounded-xl shadow-md p-8 text-center">

        <Image
          src="/ohhhdaily.png"
          alt="Restaurant Logo"
          width={70}
          height={70}
          className="mx-auto mb-4"
        />

        <h1 className="text-2xl font-bold text-[#15190c] mb-2">
          Thank You!
        </h1>

        <p className="text-gray-600 mb-6">
          Your review has been submitted successfully.
          We appreciate your feedback!
        </p>

        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#92b45d] text-white rounded-lg font-semibold hover:bg-[#7ec395] transition"
        >
          Submit Another Review
        </Link>

      </div>
    </div>
  )
}
