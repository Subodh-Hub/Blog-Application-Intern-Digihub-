import apiClient from "@/api/axiosInterceptors";
import AdminSidebar from "@/components/AdminSidebar";
import MostUsedCategoryPost from "@/components/AdminDashboard/MostUsedCategoryPost";
import PostIncreasedByMonth from "@/components/AdminDashboard/PostIncreasedByMonth";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/context/ThemeProvider";
import { useEffect, useState } from "react";
import { useOutlet } from "react-router-dom";
import TopPostUploadedUserTable from "@/components/AdminDashboard/TopPostUploadedUserTable";

const AdminDashboard = () => {
  const outlet = useOutlet();
  const [totalDetails, setTotalDetails] = useState({});
  const totalDetailsUrl = "/admin/getAllCountData";
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
          {outlet ? (
            outlet
          ) : (
            <main className="w-screen h-full px-5 m-auto">
              <div className="flex flex-col justify-around w-full xl:px-10 mb-7 lg:flex-row">
                <Card className="px-10 py-8 w-full lg:w-1/6 h-[100%] flex flex-col items-center justify-center gap-3 bg-[#0088FE]">
                  <CardTitle className="text-2xl text-center text-gray-900 font-2xl semibold">
                    Total Users
                  </CardTitle>
                  <CardDescription className="text-2xl text-center text-gray-800 font-2xl semibold">
                    {totalDetails.totalUser}
                  </CardDescription>
                </Card>
                <Card className="px-10 py-8 w-full lg:w-1/6 h-[100%] flex flex-col items-center justify-center gap-3 bg-[#00C49F]">
                  <CardTitle className="text-2xl text-center text-gray-900 font-2xl semibold">
                    Total Post
                  </CardTitle>
                  <CardDescription className="text-2xl text-center text-gray-800 font-2xl semibold">
                    {totalDetails.totalPost}
                  </CardDescription>
                </Card>

                <Card className="px-10 py-8 w-full lg:w-1/6 h-[100%] flex flex-col items-center justify-center gap-3 bg-[#FFBB28]">
                  <CardTitle className="text-2xl text-center text-gray-900 font-2xl semibold">
                    Total Likes
                  </CardTitle>
                  <CardDescription className="text-2xl text-center text-gray-800 font-2xl semibold">
                    {totalDetails.totalLike}
                  </CardDescription>
                </Card>

                <Card className="px-10 py-8 w-full lg:w-1/6 h-[100%] flex flex-col items-center justify-center gap-3 bg-[#FF8042]">
                  <CardTitle className="text-2xl font-semibold text-center text-gray-900">
                    Total Dislikes
                  </CardTitle>
                  <CardDescription className="text-2xl font-semibold text-center text-gray-800 ">
                    {totalDetails.totalDisLike}
                  </CardDescription>
                </Card>

                <Card className="px-10 py-8 w-full lg:w-1/6 h-[100%] flex flex-col items-center justify-center gap-3 bg-[#A833FF]">
                  <CardTitle className="text-2xl font-semibold text-center text-gray-900">
                    Total Comments
                  </CardTitle>
                  <CardDescription className="text-2xl font-semibold text-center text-gray-800">
                    {totalDetails.totalComment}
                  </CardDescription>
                </Card>
              </div>
              <div className="flex flex-col justify-between gap-3 lg:flex-row">
                <PostIncreasedByMonth />
                <MostUsedCategoryPost />
              </div>

              <TopPostUploadedUserTable />
            </main>
          )}
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default AdminDashboard;
