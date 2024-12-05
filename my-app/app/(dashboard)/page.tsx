import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { GetFormStats } from "../../actions/form";
import { LuView } from "react-icons/lu";
import { FaEdit, FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { BiRightArrowAlt } from "react-icons/bi";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { Separator } from "@radix-ui/react-context-menu";
import { GetForm } from "../../actions/form";
import CreateFormButton from "@/components/CreateFormButton";
import { Form } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
function Page() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true}></StatsCards>}>
        <CardStatsWrapper></CardStatsWrapper>
      </Suspense>
      <Separator className="my-6"></Separator>
      <h2 className="text-4xl font-bold col-span-2">Your Forms</h2>
      <Separator className="my-6"></Separator>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CreateFormButton></CreateFormButton>
        <Suspense fallback={<FormCardsSkeleton />}>
          <FormCards></FormCards>
        </Suspense>
      </div>
    </div>
  );
}
export default Page;
function FormCardSkeleton() {
    return <Skeleton className="border-2 border-primary-/20 h-[190px] w-full"></Skeleton>;
  }
  
function FormCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <FormCardSkeleton />
      <FormCardSkeleton />
      <FormCardSkeleton />
      <FormCardSkeleton />
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCards loading={false} data={stats}></StatsCards>;
}

interface StatsCardProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

function StatsCards(props: StatsCardProps) {
  const { data, loading } = props;
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Visits"
        icon={<LuView className="text-blue-500" />}
        helperText="All time Form Visits"
        value={data?.visits?.toLocaleString()}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
      <StatsCard
        title="Total Submissions"
        icon={<FaWpforms className="text-yellow-500" />}
        helperText="All time Form Submissions"
        value={data?.submission_count?.toLocaleString()}
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />
      <StatsCard
        title="Submission Rate"
        icon={<HiCursorClick className="text-green-500" />}
        helperText="Visits that convert to form submission"
        value={data?.submissionRate?.toLocaleString()}
        loading={loading}
        className="shadow-md shadow-green-600"
      />
      <StatsCard
        title="Bounce Rate"
        icon={<TbArrowBounce className="text-red-500" />}
        helperText="Visits that don't convert to form submission"
        value={data?.bounceRate?.toLocaleString()}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
}

export function StatsCard({
  title,
  value,
  icon,
  helperText,
  loading,
  className,
}: {
  title: string;
  value: string | undefined;
  icon: React.ReactNode;
  helperText: string;
  loading: boolean;
  className: string;
}) {
  return (
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
          {!loading && (value ? value : "N/A")}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
}
async function FormCards() {
  const result = await GetForm();
  if ("error" in result) {
    return <p>Error: {result.error}</p>; // Handle the error case
  }
  const forms = result;
  return (
    <>
      {forms.map((form, index) => (
        <FormCard key={index} form={form}></FormCard>
      ))}
    </>
  );
}
function FormCard({ form }: { form: Form }) {
    const { 
      name, 
      id, 
      userId, 
      createdAt, 
      published, 
      description, 
      content, 
      visits, 
      submission_count, 
      shareUrl 
    } = form;
  
    return(
      <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
    <CardHeader>
      <CardTitle className="flex items-center justify-between gap-2">
        <span className="font-bold text-xl truncate">{name}</span>
        {published ? (
          <Badge className="bg-green-500 text-white">Published</Badge>
        ) : (
          <Badge className="bg-red-500 text-white">Draft</Badge>
        )}
      </CardTitle>
    </CardHeader>

    <CardContent>
      <CardDescription className="flex items-center justify-between text-sm text-muted-foreground mb-3">
        <span>{formatDistance(new Date(createdAt), new Date(), { addSuffix: true })}</span>
        {published && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <LuView className="text-blue-500" />
              <span>{visits.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaWpforms className="text-yellow-500" />
              <span>{submission_count.toLocaleString()}</span>
            </div>
          </div>
        )}
      </CardDescription>

      <p className="text-base text-muted-foreground mb-3">
        {description}
      </p>

      {published ? (
        <Link 
          href={`/forms/${id}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2 text-sm text-blue-500 hover:underline"
        >
          View Submissions 
          <BiRightArrowAlt />
        </Link>
      ) : (
        <Button className="w-full mt-4 gap-2"variant={"secondary"}>
          <Link 
            href={`/builder/${id}`} 
            className="flex items-center gap-2 text-sm text-blue-500 hover:underline"
          >
            Edit Form 
            <FaEdit />
          </Link>
        </Button>
      )}
    </CardContent>
  </Card>
    );
  }
  