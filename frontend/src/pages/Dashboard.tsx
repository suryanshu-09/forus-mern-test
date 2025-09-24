import BlogsArray from "@/components/blogsArray";
import Header from "@/components/header";

const Dashboard = () => {
  return (
    <div className="flex justify-center bg-[#F6F8E3]">
      <div className="w-screen min-h-screen">
        <Header />
        <BlogsArray />
      </div>
    </div>
  );
};

export default Dashboard;
