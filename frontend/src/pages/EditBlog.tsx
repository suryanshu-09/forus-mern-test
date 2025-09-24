import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/header";
import type { BlogInputType, BlogType } from "@suryanshu-09/fe-mern-common";

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<BlogInputType>({
    title: "",
    content: "",
    thumbnail: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

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

        const blog = response.data.blogs.find((b) => b._id === id);
        if (blog) {
          setFormData({
            title: blog.title,
            content: blog.content,
            thumbnail: blog.thumbnail,
            tags: blog.tags,
          });
        } else {
          alert("Blog not found");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        alert("Error loading blog data");
        navigate("/dashboard");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchBlog();
  }, [id, token, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put(`/api/posts/${id}`, formData, {
        headers: {
          Authorization: token ?? "",
        },
      });

      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch {
      alert("Error updating blog post");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex justify-center bg-[#F6F8E3] min-h-screen">
        <div className="w-full max-w-4xl">
          <Header />
          <div className="flex justify-center items-center h-64">
            <div className="text-xl">Loading blog data...</div>
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
          <Card className="w-full">
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

              <div className="mb-6">
                <h1 className="text-2xl font-bold text-center">
                  Edit Blog Post
                </h1>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter blog title (minimum 6 characters)"
                    required
                    minLength={6}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Thumbnail URL *</Label>
                  <Input
                    id="thumbnail"
                    name="thumbnail"
                    type="url"
                    value={formData.thumbnail}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Write your blog content here..."
                    required
                    rows={10}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      id="tags"
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Enter a tag"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={handleAddTag}
                      variant="outline"
                      className="whitespace-nowrap"
                    >
                      Add Tag
                    </Button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          #{tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading ? "Updating..." : "Update Blog Post"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
