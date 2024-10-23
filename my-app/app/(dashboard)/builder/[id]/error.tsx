"use client"
function ErrorPage({error}:{error:Error}){
    return(
        <div className="flex items-center justify-center w-full h-full">
            <h2 className="text-4xl font-bold">Something went wrong!</h2>
            <p className="text-muted-foreground">{error.message}</p>
        </div>
    )

}