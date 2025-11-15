import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'API de test fonctionne',
    timestamp: new Date().toISOString()
  });
}

export async function POST() {
  return NextResponse.json({ 
    message: 'POST fonctionne aussi',
    timestamp: new Date().toISOString()
  });
}
