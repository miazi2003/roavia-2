import { NavLink, Outlet, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { 
  Menu, X, User, Map, PlusSquare, BookOpen, 
  Package, Users, Briefcase, LogOut, Home 
} from "lucide-react";
import useAuth from "../hook/useAuth";
import BrandLogo from "../pages/Shared/BrandLogo";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const { user, loading, logOut } = useAuth();
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();

  // Role-based link setup
  useEffect(() => {
    if (!loading && user?.role) {
      const role = user.role;

      const commonLinks = [
        { name: "My Profile", path: "/dashboard/profile", icon: User },
        { name: "Add Story", path: "/dashboard/addStory", icon: PlusSquare },
        { name: "Manage Stories", path: "/dashboard/manageStories", icon: BookOpen },
      ];

      if (role === "admin") {
        setLinks([
          ...commonLinks,
          { name: "Assigned Tours", path: "/dashboard/allTour", icon: Map },
          { name: "Add Package", path: "/dashboard/addPackages", icon: Package },
          { name: "Manage Users", path: "/dashboard/manageUsers", icon: Users },
          { name: "Guide Applications", path: "/dashboard/manageCandidates", icon: Briefcase },
        ]);
      } else if (role === "guide") {
        setLinks([
          ...commonLinks,
          { name: "My Assigned Tours", path: "/dashboard/assigned-tours", icon: Map },
        ]);
      } else {
        // Tourist
        setLinks([
          ...commonLinks,
          { name: "My Bookings", path: "/dashboard/manageBookings", icon: Map },
          { name: "Join as Guide", path: "/dashboard/guideForm", icon: Briefcase },
        ]);
      }
    }
  }, [loading, user]);

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-[#F3F4F6]">
      
      {/* --- Sidebar (Desktop & Mobile) --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#1F2D25] text-white transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 shadow-2xl flex flex-col`}
      >
        {/* Logo Area */}
        <div className="h-20 flex items-center px-8 border-b border-white/10">
           <BrandLogo className="text-white" />
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          
          <div className="mb-6 px-4">
             <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Main Menu</p>
             <NavLink 
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive ? "bg-green-300 text-[#1F2D25] font-bold" : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`
                }
             >
                <Home size={20} />
                <span>Home</span>
             </NavLink>
          </div>

          <div className="px-4">
             <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Dashboard</p>
             {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)} 
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group mb-1 ${
                      isActive 
                        ? "bg-green-300 text-[#1F2D25] font-bold shadow-lg shadow-green-900/20" 
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  {/* FIX: We now use Render Props pattern provided by NavLink's children (if supported) OR just rely on CSS inheritance/logic inside the parent className block. 
                      However, since icon needs specific class based on active state, we can use the `children` function of NavLink. */}
                  {({ isActive }) => (
                    <>
                      <link.icon 
                        size={20} 
                        className={isActive ? "text-[#1F2D25]" : "text-white/50 group-hover:text-white"} 
                      />
                      <span>{link.name}</span>
                    </>
                  )}
                </NavLink>
              ))}
          </div>
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3 mb-3">
             <div className="w-10 h-10 rounded-full bg-green-300 flex items-center justify-center text-[#1F2D25] font-bold text-lg">
                {user?.displayName?.charAt(0) || "U"}
             </div>
             <div className="overflow-hidden">
                <h4 className="text-sm font-bold text-white truncate">{user?.displayName || "User"}</h4>
                <p className="text-xs text-white/50 truncate capitalize">{user?.role || "Guest"}</p>
             </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors text-sm font-bold uppercase tracking-wide"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* --- Mobile Overlay --- */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* --- Main Content Area --- */}
      <div className="flex-1 md:ml-72 flex flex-col min-h-screen transition-all duration-300">
        
        {/* Mobile Header */}
        <div className="md:hidden h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-30">
           <BrandLogo />
           <button onClick={() => setOpen(true)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Menu size={24} />
           </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
           {loading ? (
             <div className="h-full flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-green-300 border-t-transparent rounded-full animate-spin"></div>
             </div>
           ) : (
             <Outlet />
           )}
        </main>
      </div>

    </div>
  );
};

export default DashboardLayout;