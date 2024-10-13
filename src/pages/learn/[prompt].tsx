import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { apiReq } from '~/utils';
import ContentDisplay from '~/components/custom/contentDisplay'

export default function ContentPage() {
  const router = useRouter();
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const res = await apiReq("content", { prompt: router.query.prompt as string });
      if(!res.success) {
        console.error(res.error);
        return;
      }

      setContent(res.content);
    })();
  }, [])

  if (!content) {
    return <div className='flex justify-center items-center w-full h-screen'><ClipLoader size={150}/></div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Content for: {router.query.prompt}</h1>
      <ContentDisplay content={content} />
    </div>
  )
}