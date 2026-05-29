import { NextRequest, NextResponse } from 'next/server'

// Commercial/industrial makes to exclude from results
const EXCLUDE_MAKES = new Set([
  'Affordable Aluminum', 'Waterford Tank', 'Milford', 'Ford Motor Company',
  'Fords Trailer', 'Bradford', 'Stanford Customs', 'Stafford', 'Medford Steel',
  'Ashford MFG', 'Lyford', 'CRANFORD', 'Affordable Trailers', 'Bradford #1',
  'Swinford', 'Ford Tanks', 'Eagle Ford', 'Lyford Overland',
])

// Model names that represent commercial/industrial/miscelaneous vehicles
const EXCLUDE_MODELS = new Set([
  'Low Cab Forward', 'Commercial Chassis', 'Motorhome Chassis',
  'Recreational Vehicle', 'Travel Park',
  'F-Super Duty', 'F-700', 'F-800', 'F-590', 'P600', 'P700', 'P800',
  'CL9000', 'CLT9000', 'L800', 'LT800', 'LN800', 'LNT800',
  'F-600', 'L8000', 'L9000', 'LL9000', 'LLA9000', 'LLS9000',
  'LS8000', 'LS9000', 'LT8000', 'LT9000', 'LTS8000', 'LTS9000',
  'LTL9000', 'LTLA9000', 'LTLS9000', 'LA8000', 'LA9000', 'LTA9000',
  'LN7000', 'LN8000', 'LN9000', 'LNT8000', 'LNT9000',
  'CF8000', 'CFT8000', 'CF7000', 'CF6000',
  'CT800', 'CT8000', 'C800', 'C8000', 'C600', 'C700',
  'LN600', 'LN700', 'LN800', 'FT900', 'FT800', 'FT8000',
  'E-100', 'E-150', 'E-250', 'E-350', 'E-450', 'E-550',
  'B-600', 'B-700', 'B-750', 'F-650', 'F-750', 'F-800',
])

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const make = searchParams.get('make')

  if (!make) {
    return NextResponse.json({ error: 'Missing make' }, { status: 400 })
  }

  try {
    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${encodeURIComponent(make)}?format=json`
    const res = await fetch(url)
    const data = await res.json()

    if (!data.Results) {
      return NextResponse.json([])
    }

    const models = data.Results
      .filter((r: any) => {
        // Must match our make
        if (r.Make_Name !== make) return false
        // Exclude commercial/industrial
        if (EXCLUDE_MODELS.has(r.Model_Name)) return false
        // Exclude anything with odd characters or trailer/commercial keywords
        const name = r.Model_Name
        if (name.includes('&') && r.Make_Name !== make) return false
        if (name.includes('Tank') || name.includes('Trailer')) return false
        if (name.includes('Mfg') || name.includes('Manufacturing')) return false
        // Exclude purely numeric model names (commercial codes)
        if (/^\d+$/.test(name)) return false
        // Exclude very short codes
        if (name.length <= 2 && !['GT', 'MX', 'EX', 'LX', 'SI', 'SS', 'ST', 'RS', 'SS'].includes(name)) return false
        return true
      })
      .map((r: any) => r.Model_Name)
      .filter((v: string, i: number, a: string[]) => a.indexOf(v) === i)
      .sort()

    return NextResponse.json(models)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch models' }, { status: 500 })
  }
}
