import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/firebase/config";
import { cancelBooking, getBookingById } from "@/firebase/db/bookings";
import { isUserAdmin } from "@/firebase/auth";

export async function POST(request: NextRequest) {
  try {
    // Get the current user from the auth session
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { bookingId, reason, refundAmount = 0 } = body;

    if (!bookingId || !reason) {
      return NextResponse.json(
        { error: "Booking ID and cancellation reason are required" },
        { status: 400 }
      );
    }

    // Get the booking
    const booking = await getBookingById(bookingId);
    
    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // Check authorization - only the booking owner or an admin can cancel it
    const isAdmin = await isUserAdmin(currentUser.uid);
    
    if (booking.userId !== currentUser.uid && !isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    // Calculate refund amount (if not provided)
    let actualRefundAmount = refundAmount;
    
    // If admin is not specifying a refund amount, calculate based on cancellation policy
    if (!isAdmin && refundAmount === 0) {
      const now = new Date();
      const checkIn = booking.dates.checkIn.toDate();
      const daysDifference = Math.ceil(
        (checkIn.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      // Example policy: Full refund if canceled 7+ days before check-in, 50% if 3-6 days
      if (daysDifference >= 7) {
        actualRefundAmount = booking.pricing.total;
      } else if (daysDifference >= 3) {
        actualRefundAmount = Math.round(booking.pricing.total * 0.5);
      }
    }

    // Cancel the booking
    await cancelBooking(
      bookingId,
      reason,
      currentUser.uid,
      actualRefundAmount
    );

    return NextResponse.json(
      { 
        success: true, 
        message: "Booking canceled successfully",
        refundAmount: actualRefundAmount
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error canceling booking:", error);
    
    return NextResponse.json(
      { error: error.message || "Failed to cancel booking" },
      { status: 500 }
    );
  }
}