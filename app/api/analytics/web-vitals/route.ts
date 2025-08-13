import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const metric = await request.json();
    
    // Log to your analytics service
    console.log('Web Vitals Metric:', {
      name: metric.name,
      value: metric.value,
      id: metric.id,
      timestamp: new Date().toISOString(),
      url: request.headers.get('referer'),
      userAgent: request.headers.get('user-agent'),
    });

    // Here you could send to your preferred analytics service
    // await sendToAnalyticsService(metric);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Failed to track metric' }, { status: 500 });
  }
}