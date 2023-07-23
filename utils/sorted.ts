// utils/prisma.js
import {prisma} from '@/lib/prisma'

export async function getSortedItems(sortOrder:any) {
  const validSortOrders = ['asc', 'desc'];
  if (!validSortOrders.includes(sortOrder)) {
    sortOrder = 'asc'; 
  }

  return prisma.course.findMany({
    orderBy: {
      createdAt: sortOrder,
    },
  });
}
