import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { apiReq } from '~/utils';
import ContentDisplay from '~/components/custom/contentDisplay'
import { UserContext } from '~/contexts/UserProvider';
import { CarouselItemType } from '~/types';
import Sidebar from '~/components/custom/sidebar';
import ChatBox from '~/components/custom/chatbox';
import QuizComponent from '~/components/custom/quiz';

export default function ContentPage() {
    const router = useRouter();

    let presentationId = router.query.presentationId as string;

    const [content, setContent] = useState<CarouselItemType[]>([]);

    const [title, setTitle] = useState<string>('');
    
    const contentRef = useRef<CarouselItemType[]>([]);
    let loading = contentRef.current.length == 0;
    const fetchContent = async (presentationId: string) => {
        let completed = false;
        while (!completed) {
            if(router.query.presentationId !== presentationId) return;
            await new Promise(r => setTimeout(r, 5000));
            const res = await apiReq("getContentStatus", { presentationId });

            if(!res.success) continue;

            completed = res.data.status == "Completed";

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

    const fetchTitle = async (presentationId: string) => {
        const res = await apiReq("getPresentationTitle", { presentationId });
        if(!res.success) {
            console.error(res.error);
            alert('Failed to fetch title');
            return;
        }
        console.log(res);
        setTitle(res.title);
    }

    useEffect(() => {
        if(presentationId) {
            setContent(prevContent => {
                const newContent: any[] = [];
                contentRef.current = newContent;
                return newContent;
            });
            fetchContent(presentationId);
            fetchTitle(presentationId);
        }
    }, [presentationId]);

    return (
        <div className="flex bg-gray-100">
            <div className='fixed top-0 left-0'>
                <Sidebar/>
            </div>
            {
                loading ? <div className='ml-64 flex justify-center items-center w-full h-screen'><ClipLoader size={150}/></div>
                : <div className="ml-64 container mx-auto px-4 py-8 justify-center">
                    <h1 className="text-3xl font-bold mb-6 self-center">{title}</h1>
                    <ContentDisplay content={{type: "carousel", items: content}} />
                    <ChatBox presentationId={presentationId}/>
                    <QuizComponent presentationId={presentationId}/>
                </div>
            }
        </div>
    )
}