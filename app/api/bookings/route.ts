import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendBookingConfirmationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Ensure date is proper ISO format or Date object
    const bookingDate = new Date(data.date);

    // Save booking to DB
    const booking = await prisma.booking.create({
      data: {
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail,
        customerAddress: data.customerAddress,
        serviceId: data.serviceId,
        trainerId: data.trainerId,
        date: bookingDate,
        time: data.time,
        goals: data.goals || null,
        notes: data.notes || null,
        status: "PENDING",
      },
    });

    // Send Confirmation Email
    await sendBookingConfirmationEmail(data.customerEmail, data.customerName);

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    console.error("Booking submission error:", error);
    return NextResponse.json({ error: "Failed to submit booking" }, { status: 500 });
  }
}
