import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";
import axios from "axios";

interface User {
  name: string;
}

interface Admin {
  adminName: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null"),
  );
  const [admin, setAdmin] = useState<Admin | null>(
    JSON.parse(localStorage.getItem("admin") || "null"),
  );
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([{ role: "bot", text: "Hi! How can I help?" }]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const { data } = await axios.get<{ user: User; token: string }>(
          "http://localhost:3000/api/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (data.user) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
          if (data.token) {
            localStorage.setItem("token", data.token);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      }
    };

    fetchUser();
  }, [location]);

  useEffect(() => {
    const fetchAdmin = async () => {
      const adminToken = localStorage.getItem("adminToken");
      if (!adminToken) {
        setAdmin(null);
        return;
      }

      try {
        const { data } = await axios.get<{ admin: Admin; token: string }>(
          "http://localhost:3001/api/admin/profile",
          {
            headers: { Authorization: `Bearer ${adminToken}` },
          },
        );

        if (data.admin) {
          setAdmin(data.admin);
          localStorage.setItem("admin", JSON.stringify(data.admin));
          if (data.token) {
            localStorage.setItem("adminToken", data.token);
          }
        }
      } catch (error) {
        console.error("Failed to fetch admin data", error);
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");
        setAdmin(null);
      }
    };

    fetchAdmin();
  }, [location]);

  const handleLogout = async () => {
    try {
      if (admin) {
        await axios.post("http://localhost:3001/api/admin/logout", {});
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");
        setAdmin(null);
      } else if (user) {
        await axios.post("http://localhost:3000/api/logout", {});
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      }

      navigate("/home");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return; // Prevent sending empty messages
    
    const newMessages = [...messages, { role: "user", text: input }];
    
    setMessages(newMessages);
    setInput(""); // Clear input after sending
    
    // Simulating bot response after 1 second
    setTimeout(() => {
      setMessages([...newMessages, { role: "bot", text: "I'm here to help!" }]);
    }, 1000);
  };
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/home" className="flex items-center">
            <Shield className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">
              HealthCare Assistant
            </span>
          </Link>

          <button onClick={() => setShowChat(!showChat)} className="bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-700 transition">
            💬 Chatbot
          </button>

          <div className="flex items-center space-x-4">
            {admin ? (
              <>
                <span className="text-gray-900 font-medium">
                  Welcome, Admin {admin.adminName}
                </span>
                <button onClick={handleLogout} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                  Logout
                </button>
              </>
            ) : user ? (
              <>
                <span className="text-gray-900 font-medium">
                  Welcome, {user.name}
                </span>
                <button onClick={handleLogout} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {showChat && (
  <div className="fixed bottom-20 right-10 bg-white shadow-lg w-96 h-96 max-w-sm rounded-lg p-4 z-50">
    {/* Chat Header with Close Button */}
    <div className="flex justify-between items-center border-b pb-2">
      <h2 className="text-lg font-semibold">Chatbot</h2>
      <button onClick={() => setShowChat(false)} className="text-gray-500 hover:text-red-500">❌</button>
    </div>

    {/* Chat Messages */}
    <div className="max-h-72 overflow-y-auto mt-2 space-y-2">
      {messages.map((msg, i) => (
        <p key={i} className={msg.role === "bot" ? "text-blue-500" : "text-gray-700"}>
          {msg.text}
        </p>
      ))}
    </div>

    {/* Chat Input */}
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      placeholder="Type a message..."
      className="w-full border p-2 rounded-md mt-2"
    />
  </div>
)}

    </nav>
  );
}