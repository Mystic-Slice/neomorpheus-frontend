import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { apiReq } from '~/utils';
import ContentDisplay from '~/components/custom/contentDisplay'
import { UserContext } from '~/contexts/UserProvider';
import { CarouselItemType } from '~/types';
import Sidebar from '~/components/custom/sidebar';

export default function ContentPage() {
    const { user } = useContext(UserContext);
    const router = useRouter();

    let presentationId = router.query.presentationId as string;

    const [content, setContent] = useState<CarouselItemType[]>([]);

    let title = "";
    
    const contentRef = useRef<CarouselItemType[]>([]);
    let loading = contentRef.current.length == 0;
    const fetchContent = async () => {
        let completed = false;
        while (!completed) {
            await new Promise(r => setTimeout(r, 5000));
            const res = await apiReq("getContentStatus", { presentationId });

            if(!res.success) continue;

            completed = res.data.status == "Completed";
            title = res.data.title;

            if(contentRef.current.length < res.data.slidesGenerated) {
                for(let i = contentRef.current.length + 1; i <= res.data.slidesGenerated; i++) {
                    const slideRes = await apiReq("getSlide", { presentationId, slideNumber: i });
                    if(!slideRes.success) {
                      console.error(slideRes.error);
                      alert('Failed to fetch slide');
                      return;
                    }

                    const slide = slideRes.slide;
                    setContent(prevContent => {
                        const newContent = [...prevContent, slide];
                        contentRef.current = newContent;
                        return newContent;
                    });
                }
            }
        }
    }

    useEffect(() => {
        if(presentationId) {
            setContent(prevContent => {
                const newContent: any[] = [];
                contentRef.current = newContent;
                return newContent;
            });
            fetchContent();
        }
    }, [presentationId]);

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar/>
            {
                loading ? <div className='flex justify-center items-center w-full h-screen'><ClipLoader size={150}/></div>
                : <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-6">Content for: {router.query.prompt}</h1>
                    <ContentDisplay content={{type: "carousel", items: content}} />
                </div>
            }
        </div>
    )
}