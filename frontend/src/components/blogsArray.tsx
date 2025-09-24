import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import type { BlogType } from "@suryanshu-09/fe-mern-common";
import { Button } from "./ui/button";

const BlogsArray = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    axios
      .get<{ blogs: BlogType[] }>("/api/posts", {
        headers: {
          Authorization: token ?? "",
        },
      })
      .then((res) => setBlogs(res.data.blogs))
      .catch((err) => console.error(err));
  }, [token, user?.id]);

  return (
    <div>
      <div className="w-screen flex justify-center">
        <Button onClick={() => navigate("/create-blog")}>Create Blogs</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="flex flex-col rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate(`/blog/${blog._id}`)}
            >
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="h-48 w-full object-cover"
              />
              <div className="flex flex-col flex-1 p-4">
                <h2 className="text-lg font-bold text-gray-800 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600 flex-1 truncate">
                  {blog.content}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-indigo-600">
                  {blog.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-indigo-50 rounded-full hover:bg-indigo-100 transition"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="text-xs mt-2 text-right opacity-50">
                  <div>Created at: {blog.createdAt.toString()}</div>
                  <div>Modified at: {blog.updatedAt.toString()}</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                  <Button 
                    variant="secondary" 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit-blog/${blog._id}`);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      const del = confirm(`Delete the blog: ${blog.title}`);
                      if (del) {
                        axios
                          .delete(`/api/posts/${blog._id}`, {
                            headers: {
                              Authorization: token,
                            },
                          })
                          .then((res) => {
                            if (res.status == 200) {
                              window.location.reload();
                            } else {
                              alert(res.data);
                            }
                          });
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-screen text-2xl flex justify-center font-semibold">
            Please create blogs, empty dashboard.
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsArray;
