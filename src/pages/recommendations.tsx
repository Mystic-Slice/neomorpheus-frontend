import { Book } from "lucide-react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { set } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { UserContext } from "~/contexts/UserProvider";
import { apiReq } from "~/utils";

interface Recommendation {
    title: string;
    description: string;
}

const Recommendations: NextPage = () => {
    const {user} = useContext(UserContext);
    const router = useRouter();

    const [recos, setRecos] = useState<Recommendation[]>([]);
    const fetchRecommendations = async () => {
        const res = await apiReq('recommendations', {user});
        if (!res.success) {
            console.error('Failed to fetch recommendations');
            setRecos([]);
            return;
        }
        setRecos(res.data);
    }
    useEffect(() => {
        fetchRecommendations();
    }, []);

    return <div className="bg-white rounded-lg shadow-md p-4 flex-shrink-0" style={{ height: '50vh' }}>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Book className="w-5 h-5" />
        Recommended For You
        </h2>
        <div className="flex justify-between gap-4 h-[calc(100%-2rem)] overflow-hidden">
        {recos.map((rec, index) => (
            <Card key={index} className="flex-1 flex flex-col" onClick={() => router.push(`/learn/${rec.title}`)}>
            <CardHeader className="p-4">
                <CardTitle className="text-sm">{rec.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-1 overflow-auto">
                <CardDescription className="text-sm">{rec.description}</CardDescription>
            </CardContent>
            </Card>
        ))}
        </div>
  </div>
}

export default Recommendations;