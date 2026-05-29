import { NextResponse } from 'next/server'

// Curated list of common consumer brands (no commercial trucks/incomplete data)
const COMMON_MAKES = [
  'Acura', 'Audi', 'BMW', 'Buick', 'Cadillac', 'Chevrolet',
  'Chrysler', 'Dodge', 'Ford', 'GMC', 'Honda', 'Hyundai',
  'Infiniti', 'Jeep', 'Kia', 'Lexus', 'Lincoln', 'Mazda',
  'Mercedes-Benz', 'Nissan', 'Porsche', 'Ram', 'Subaru',
  'Tesla', 'Toyota', 'Volkswagen', 'Volvo',
]

export async function GET() {
  // Return our curated list — no need to call external API for makes
  return NextResponse.json(COMMON_MAKES)
}
