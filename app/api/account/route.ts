import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const res = await prisma.user.updateMany({
    where: {
      subsciptionEnds: {
        lte: new Date()
      }
    },
    data: {
      plan: 'FREE'
    }
  })

  return NextResponse.json({ updated: res.count })
}