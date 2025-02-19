import apiClient from "@/api/axiosInterceptors";
import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

import { Calendar } from "lucide-react";

const PostIncreasedByMonth = () => {
  const postByMonthUrl = "/admin/postByMonth";
  const [postByMonth, setPostByMonth] = useState([]);
  useEffect(() => {
    // Post uploaded in month
    apiClient
      .get(postByMonthUrl)
      .then((res) => {
        setPostByMonth(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const chartData = postByMonth.map((el, key) => {
    return {
      date: el.day,
      post: el.post,
    };
  });


  return (
    <div className="lg:w-2/3 w-full min-h-[300px] p-4 bg-white shadow-md rounded-lg dark:bg-customDarkTheme">
      <h2 className="mb-4 text-lg font-semibold text-center">
        Post Uploaded Date
      </h2>
      <ResponsiveContainer width="100%" height={500} >
        <LineChart
          width={600}
          height={300}
          data={chartData}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          
        >
          <Line type="monotone" dataKey="post" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PostIncreasedByMonth;
