import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";


type RechartData = {
  name: string;
  uv: number;
  pv: number;
};

// Fetch users data
const fetchUserData = async (page: number, limit: number) => {
  const res = await fetch(`/api/users?page=${page}&limit=${limit}`);
  const data = await res.json();
  return data;
};

const UsersChart = () => {
  const [page, setPage] = useState(1);
  const [chartData, setChartData] = useState<RechartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Fetch data on page change
  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const data = await fetchUserData(page, 10);
        const formattedData: RechartData[] = [
          {
            name: `Page ${page}`,
            uv: data.users.length, // Assign user count to `uv`
            pv: data.users.length, // Assign same or different metric to `pv`
          },
        ];
        setChartData(formattedData);
      } catch (error) {
        console.error("Error haha", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getUserData();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Card className="p-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold  mb-4">User Distribution Across Pages</h2>
      
      <div className="mb-4 flex items-center space-x-4">
        <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1 || isLoading}>
          Previous Page
        </Button>
        <span className="text-lg">{`Page ${page}`}</span>
        <Button onClick={() => handlePageChange(page + 1)} disabled={isLoading || !chartData.length}>
          Next Page
        </Button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : hasError ? (
        <p>Error loading data...</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default UsersChart;
