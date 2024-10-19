import { Card, CardHeader,CardContent,CardDescription,CardFooter,CardTitle} from "@/components/ui/card";
import { GetFormStats } from "../../actions/form";
import {LuView} from "react-icons/lu";
import {FaWpforms} from "react-icons/fa";
import {HiCursorClick} from "react-icons/hi"
import {TbArrowBounce} from "react-icons/tb"
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { Separator } from "@radix-ui/react-context-menu";
function Page() {
    return <div className="container pt-4">
        <Suspense fallback={<StatsCards loading={true}></StatsCards>}>
            <CardStatsWrapper></CardStatsWrapper>
        </Suspense>
        <Separator className="my-6"></Separator>
        <h2 className="text-4xl font-bold col-span-2">Your Forms</h2>
        <Separator className="my-6"></Separator>
    </div>
}
export default Page

async function CardStatsWrapper(){
    const stats = await GetFormStats();
    return(
        <StatsCards loading = {false} data = {stats}></StatsCards>
    )
}
interface StatsCardProps{
    data?:Awaited<ReturnType<typeof GetFormStats>>
    loading:boolean;
}
function StatsCards(props:StatsCardProps){
    const {data,loading} = props;
    return(
        <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard title = "total visits" icon={<LuView className = "text-blue-500"/>}
            helperText = "All time Form Visits" value = {data?.visits?.toLocaleString()} loading = {loading}
            className = "shadow-md shadow-blue-600"
            >
            </StatsCard>
            <StatsCard title = "total vsubmissions" icon={<FaWpforms className = "text-yello-500"/>}
            helperText = "All time Form Submissions" value = {data?.submission_count?.toLocaleString()} loading = {loading}
            className = "shadow-md shadow-yellow-600"
            >
            </StatsCard>
            <StatsCard title = "Submission Rate" icon={<HiCursorClick className = "text-green-500"/>}
            helperText = "Visits that convert to form submission" value = {data?.submissionRate?.toLocaleString()} loading = {loading}
            className = "shadow-md shadow-green-600"
            >
            </StatsCard>
            <StatsCard title = "Bounce Rate" icon={<TbArrowBounce className = "text-red-500"/>}
            helperText = "Visits that  don't convert to form submission" value = {data?.bounceRate?.toLocaleString()} loading = {loading}
            className = "shadow-md shadow-red-600"
            >
            </StatsCard>
        </div>
    )
}
function StatsCard({title,value,icon,helperText,loading,className}:{title:string,value:string|undefined,icon:React.ReactNode,helperText:string,loading:boolean,className:string}){
    return(
        <Card className={className}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {loading && (
                        <Skeleton>
                            <span className="opacity-0">0</span>
                        </Skeleton>
                    )}
                    {!loading && value}
                </div>
                <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
            </CardContent>
        </Card>
    )
}