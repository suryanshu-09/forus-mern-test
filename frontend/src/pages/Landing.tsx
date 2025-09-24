import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "../assets/logo.svg";
const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen flex flex-col justify-start bg-[#F6F8E3]">
      <div className="flex flex-col items-center justify-center">
        <div>
          <div className="font-mono m-4 p-4 bg-white border rounded-lg text-center">
            This is a test website developed for{" "}
            <img src={Logo} alt="logo" className="inline size-14" />
            <br />
            in MERN stack with Typescript
          </div>
          <div className="mt-8 flex justify-center gap-16 font-mono">
            <Button onClick={() => navigate("/register")}>Register</Button>
            or
            <Button onClick={() => navigate("/login")}>Login</Button>
          </div>
        </div>
        <div className="flex justify-center my-16 bg-white border rounded-lg max-w-[80vw] overflow-hidden">
          <div>
            <div className="font-serif italic text-4xl pt-8 text-center">
              Documentation
            </div>
            <div className="p-8 text-left">
              <span className="font-bold">
                Task: Simple Blog App (MERN Stack)
              </span>
              <br /> Objective Build a simple blog platform where users can
              register/login, and create, view, edit, delete their own blog
              posts. The frontend should consume the backend API and display
              blog content.
              <br /> <br />
              <span className="font-bold">Tech Stack</span>
              <ul className="list-disc">
                <li> MongoDB (using Mongoose) </li>
                <li> Express.js (REST API) </li>
                <li> React.js (frontend using hooks or simple components) </li>
                <li> Node.js </li>
                <li> Use JWT for auth </li>
                <li>
                  {" "}
                  Axios or Fetch for API calls, Bootstrap or Tailwind for basic
                  styling
                </li>
              </ul>
              <br />
              <span className="font-bold">Feature Requirements</span>
              <br />
              User Authentication
              <ul className="list-disc">
                <li>
                  POST /can be your choice(No limitation) → Register with name,
                  email, password{" "}
                </li>
                <li>
                  POST /can be your choice(No limitation) → Login and receive
                  JWT token{" "}
                </li>
              </ul>
              <br />
              <span className="font-bold">Frontend:</span>
              <ul className="list-disc">
                <li>Simple login &amp; register form </li>
                <li>Store JWT in localStorage </li>
              </ul>
              <br />
              <span className="font-bold">
                Blog Post Management (Private for Logged-in Users)
              </span>
              <br />
              Post fields: title, content, tags, createdAt
              <br />
              <br />
              <span className="font-bold">Backend Endpoints:</span>
              <ul className="list-disc">
                <li>POST /api/posts → Create new post </li>
                <li>GET /api/posts → Get all posts by logged-in user </li>
                <li>PUT /api/posts/:id → Update post </li>
                <li>DELETE /api/posts/:id → Delete post </li>
                <br />
                <span className="font-bold">Frontend:</span>
                <li>Show all posts by user in a dashboard </li>
                <li>Form to create/edit posts </li>
                <li>Delete button </li>
                <li>Protect routes using JWT (redirect if not logged in)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
