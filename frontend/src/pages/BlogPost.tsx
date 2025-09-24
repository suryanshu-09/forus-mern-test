import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/header";
import type { BlogType } from "@suryanshu-09/fe-mern-common";

const BlogPost = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        navigate("/dashboard");
        return;
      }

      try {
        const response = await axios.get<{ blogs: BlogType[] }>("/api/posts", {
          headers: {
            Authorization: token ?? "",
          },
        });

        const foundBlog = response.data.blogs.find((b) => b._id === id);
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          alert("Blog not found");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        alert("Error loading blog data");
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id, token, navigate]);

  const handleDelete = async () => {
    if (!blog) return;

    const confirmDelete = confirm(`Delete the blog: ${blog.title}?`);
    if (confirmDelete) {
      try {
        const response = await axios.delete(`/api/posts/${blog._id}`, {
          headers: {
            Authorization: token,
          },
        });

        if (response.status === 200) {
          navigate("/dashboard");
        } else {
          alert("Error deleting blog");
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Error deleting blog");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center bg-[#F6F8E3] min-h-screen">
        <div className="w-full max-w-4xl">
          <Header />
          <div className="flex justify-center items-center h-64">
            <div className="text-xl">Loading blog...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center bg-[#F6F8E3] min-h-screen">
        <div className="w-full max-w-4xl">
          <Header />
          <div className="flex justify-center items-center h-64">
            <div className="text-xl">Blog not found</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-[#F6F8E3] min-h-screen">
      <div className="w-full max-w-4xl">
        <Header />
        <div className="p-6">
          <Card className="w-full overflow-auto">
            <CardContent className="p-8">
              <div className="mb-6">
                <Button
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                  className="mb-4"
                >
                  ← Back to Dashboard
                </Button>
              </div>

              <article className="space-y-6">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {blog.title}
                  </h1>
                  <div className="text-sm text-gray-500 space-y-1">
                    <div>
                      Created: {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                    <div>
                      Updated: {new Date(blog.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="max-w-full h-auto rounded-lg shadow-lg"
                    style={{ maxHeight: "400px" }}
                  />
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="prose max-w-none">
                  <div
                    className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg"
                    style={{ lineHeight: "1.8" }}
                  >
                    {blog.content}
                  </div>
                </div>

                <div className="flex gap-4 pt-8 border-t">
                  <Button
                    variant="default"
                    onClick={() => navigate(`/edit-blog/${blog._id}`)}
                    className="flex-1"
                  >
                    Edit Blog
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    className="flex-1"
                  >
                    Delete Blog
                  </Button>
                </div>
              </article>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
