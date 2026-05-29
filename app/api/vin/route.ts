import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { vin } = await req.json()

    if (!vin || vin.length < 11) {
      return NextResponse.json({ error: 'Invalid VIN' }, { status: 400 })
    }

    const cleanVin = vin.trim().toUpperCase()
    const res = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${cleanVin}?format=json`,
      { next: { revalidate: 86400 } }
    )
    const data = await res.json()

    if (!data.Results) {
      return NextResponse.json({ error: 'Could not decode VIN' }, { status: 500 })
    }

    const get = (id: number) => {
      const item = data.Results.find((r: any) => r.VariableId === id)
      return item?.Value || null
    }

    // Key fields from NHTSA
    const year = get(29)  // Model Year
    const make = get(26)  // Make
    const model = get(28) // Model
    const engineCC = get(11)  // Displacement CC
    const engineLiters = get(13) // Displacement L
    const cylinders = get(9)  // Engine Cylinders
    const fuelType = get(24) // Fuel Type
    const engineModel = get(18) // Engine Model
    const engineConfig = get(64) // Engine Configuration

    // Build display string
    const displacement = engineLiters
      ? `${parseFloat(engineLiters).toFixed(1)}L`
      : engineCC
      ? `${(parseFloat(engineCC) / 1000).toFixed(1)}L`
      : null

    const engineStr = [
      displacement,
      cylinders ? `${cylinders}-cyl` : null,
      fuelType && fuelType !== 'Gasoline' ? fuelType : null,
    ].filter(Boolean).join(' ')

    return NextResponse.json({
      success: true,
      year,
      make,
      model,
      engine: engineStr || null,
      raw: {
        year,
        make,
        model,
        engineCC,
        engineLiters,
        cylinders,
        fuelType,
        engineModel,
        engineConfig,
      },
    })
  } catch (err) {
    return NextResponse.json({ error: 'Decode failed' }, { status: 500 })
  }
}