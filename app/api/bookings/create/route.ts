import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/firebase/config";
import { createBooking } from "@/firebase/db/bookings";
import { checkDateRangeAvailability } from "@/firebase/db/availability";
import { getPropertyById } from "@/firebase/db/properties";

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
    const {
      propertyId,
      checkIn,
      checkOut,
      guests,
      specialRequests,
      contactInformation,
    } = body;

    // Validate required fields
    if (!propertyId || !checkIn || !checkOut || !guests || !contactInformation) {
      return NextResponse.json(
        { error: "Missing required booking information" },
        { status: 400 }
      );
    }

    // Check if property exists
    const property = await getPropertyById(propertyId);
    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Check if dates are available
    const isAvailable = await checkDateRangeAvailability(
      propertyId,
      checkIn,
      checkOut
    );

    if (!isAvailable) {
      return NextResponse.json(
        { error: "Selected dates are not available" },
        { status: 400 }
      );
    }

    // Calculate nights
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const nights = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Calculate pricing
    const baseTotal = property.basePrice * nights;
    const cleaningFee = property.cleaningFee || 0;
    const serviceFeeAmount = Math.round(baseTotal * (property.serviceFee / 100));
    const taxAmount = Math.round((baseTotal + cleaningFee + serviceFeeAmount) * (property.taxRate / 100));
    const totalPrice = baseTotal + cleaningFee + serviceFeeAmount + taxAmount;

    // Prepare booking data
    const bookingData = {
      propertyId,
      userId: currentUser.uid,
      status: "pending" as "pending",
      dates: {
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
      },
      guests: {
        adults: guests.adults || 1,
        children: guests.children || 0,
        infants: guests.infants || 0,
        pets: guests.pets || 0,
      },
      contactInformation,
      specialRequests: specialRequests || "",
      pricing: {
        nightlyRate: property.basePrice,
        nights,
        subtotal: baseTotal,
        cleaningFee,
        serviceFee: serviceFeeAmount,
        taxes: taxAmount,
        total: totalPrice,
      },
      payment: {
        status: "pending",
      },
    };

    // Create the booking
    const bookingId = await createBooking(bookingData);

    return NextResponse.json(
      { 
        success: true, 
        bookingId,
        message: "Booking created successfully" 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating booking:", error);
    
    return NextResponse.json(
      { error: error.message || "Failed to create booking" },
      { status: 500 }
    );
  }
}