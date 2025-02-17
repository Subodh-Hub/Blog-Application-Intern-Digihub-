import apiClient from "@/api/axiosInterceptors";
import AdminSidebar from "@/components/AdminSidebar";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/context/ThemeProvider";
import { useEffect, useState } from "react";
import { useOutlet } from "react-router-dom";

const AdminDashboard = () => {
  const outlet = useOutlet();

  const [totalDetails,setTotalDetails] = useState({})
  const totalDetailsUrl ='/admin/getAllCountData'

  useEffect(() => {
    apiClient(totalDetailsUrl)
      .then((value) => {
        setTotalDetails(value.data);
        console.log(value.data);
      })
      .catch((err) => {
        console.log("error", err);
      });


  }, []);


  return (
    <ThemeProvider>
      <SidebarProvider defaultOpen={true}>
        <AdminSidebar />
        <main className="w-screen">
          <SidebarTrigger />
          { outlet  ? (
            outlet
          ) : (
            <main className="flex flex-col w-screen h-full gap-5 px-5 m-auto">
              <div className="flex flex-wrap w-full gap-4 px-10 h-1/3 flex-grow-1">
                <Card className="w-1/4 h-[100%] flex flex-col items-center justify-center gap-10">
                  <CardTitle className="text-5xl font-semibold text-center">
                    Total Users
                  </CardTitle>
                  <CardDescription className="text-5xl font-semibold text-center">
                    {totalDetails.totalUser}
                  </CardDescription>
                </Card>
                <Card className="w-1/4 h-[100%] flex flex-col items-center justify-center gap-10">
                  <CardTitle className="text-5xl font-semibold text-center">
                    Total Post
                  </CardTitle>
                  <CardDescription className="text-5xl font-semibold text-center">
                    {totalDetails.totalPost}
                  </CardDescription>
                </Card>

                <Card className="w-1/4 h-[100%] flex flex-col items-center justify-center gap-10">
                  <CardTitle className="text-5xl font-semibold text-center">
                    Total Likes
                  </CardTitle>
                  <CardDescription className="text-5xl font-semibold text-center">
                    {totalDetails.totalLike}
                  </CardDescription>
                </Card>

                <Card className="w-1/4 h-[100%] flex flex-col items-center justify-center gap-10">
                  <CardTitle className="text-5xl font-semibold text-center">
                    Total Dislikes
                  </CardTitle>
                  <CardDescription className="text-5xl font-semibold text-center">
                    {totalDetails.totalDisLike}
                  </CardDescription>
                </Card>

                <Card className="w-1/4 h-[100%] flex flex-col items-center justify-center gap-10">
                  <CardTitle className="text-5xl font-semibold text-center">
                    Total Comments
                  </CardTitle>
                  <CardDescription className="text-5xl font-semibold text-center">
                    {totalDetails.totalComment}
                  </CardDescription>
                </Card>
              </div>
              <main className="w-[80vw] h-1/3">
              
              </main>
            </main>
          )}
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default AdminDashboard;
