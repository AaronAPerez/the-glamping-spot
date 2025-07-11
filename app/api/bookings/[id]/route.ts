import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/firebase/config";
import { getBookingById, updateGuestInformation, addSpecialRequests } from "@/firebase/db/bookings";
import { isUserAdmin } from "@/firebase/auth";
import { NextRequest, NextResponse } from 'next/server';

// GET - Retrieve a specific booking
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookingId = params.id;
    
    // Get the current user from the auth session
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
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

    // Check authorization - only the booking owner or an admin can view it
    const isAdmin = await isUserAdmin(currentUser.uid);
    
    if (booking.userId !== currentUser.uid && !isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: booking 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}

// PATCH - Update parts of a booking
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookingId = params.id;
    
    // Get the current user from the auth session
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
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

    // Check authorization - only the booking owner or an admin can update it
    const isAdmin = await isUserAdmin(currentUser.uid);
    
    if (booking.userId !== currentUser.uid && !isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    // Parse the request body
    const body = await request.json();
    
    // Check if we're updating guest information
    if (body.guests) {
      await updateGuestInformation(bookingId, {
        adults: body.guests.adults,
        children: body.guests.children,
        infants: body.guests.infants,
        pets: body.guests.pets,
        contactInformation: body.contactInformation
      });
    }

    // Check if we're updating special requests
    if (body.specialRequests !== undefined) {
      await addSpecialRequests(bookingId, body.specialRequests);
    }

    // Get the updated booking
    const updatedBooking = await getBookingById(bookingId);

    return NextResponse.json(
      { 
        success: true, 
        booking: updatedBooking,
        message: "Booking updated successfully" 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating booking:", error);
    
    return NextResponse.json(
      { error: error.message || "Failed to update booking" },
      { status: 500 }
    );
  }
}