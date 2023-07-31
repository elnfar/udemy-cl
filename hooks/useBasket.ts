import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";


interface IUseFavorite {
  courseId: string;
  currentUser?: any
}

const useBasket = ({ courseId, currentUser }: IUseFavorite) => {

  const router = useRouter();

  const hasBasket = useMemo(() => {
    const list = currentUser?.basketIds || [];

    return list.includes(courseId);
  }, [currentUser, courseId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    // if (!currentUser) {
    //   return router.push('/login')
    // }

    try {
      let request;

      if (hasBasket) {
        request = () => axios.delete(`/api/basket/${courseId}`);
        // request = () => router.push('/basket')
      } else {
        request = () => axios.post(`/api/basket/${courseId}`);
      }

      await request();
      router.refresh();
    } catch (error:any) {
        throw new Error(error)
    }
  }, 
  [
    currentUser, 
    hasBasket, 
    courseId,
    router
  ]);

  return {
    hasBasket,
    toggleFavorite,
  }
}



export default useBasket;