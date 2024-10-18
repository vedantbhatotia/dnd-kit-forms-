import { GetFormStats } from "../../actions/form";
function Page() {
    return <div className="container pt-4">Main Page</div>
}
export default Page

async function CardStatsWrapper(){
    const stats = await GetFormStats();
    return(
        <StatsCard loading = {false} data = {stats}></StatsCard>
    )
}
interface StatsCardProps{
    data:Awaited<ReturnType<typeof GetFormStats>>
    loading:boolean;
}
function StatsCard(props:StatsCardProps){
    const {data,loading} = props;
    return(
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">Overview</h2>
                <p className="text-muted-foreground">
                    Check your form stats
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">Overview</h2>
                <p className="text-muted-foreground">
                    Check your form stats
                </p>
            </div>
        </div>
    )

}