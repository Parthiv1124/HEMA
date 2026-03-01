import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const data = await request.json()

        // Validate required fields
        const required = ['name', 'email', 'company', 'country', 'department', 'message']
        for (const field of required) {
            if (!data[field]) {
                return NextResponse.json({ error: `${field} is required` }, { status: 400 })
            }
        }

        // In production, this would send an email or save to a database
        // For now, simulate a successful submission
        console.log('Contact form submission:', data)

        return NextResponse.json({ success: true, message: 'Message received successfully' })
    } catch {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }
}
