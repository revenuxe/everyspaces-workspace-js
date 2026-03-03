import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Invalid credentials. Please try again.");
      setLoading(false);
      return;
    }

    // Check if user has admin role
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      await supabase.auth.signOut();
      setError("Access denied. Admin privileges required.");
      setLoading(false);
      return;
    }

    navigate("/admin/dashboard");
  };

  return (
    <>
      <SEOHead
        title="Admin Login | EverySpaces"
        description="Admin login portal for EverySpaces."
        keywords="admin login"
        noIndex
      />
      <div className="min-h-screen bg-primary flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-primary-foreground mb-2">
              Admin Portal
            </h1>
            <p className="text-primary-foreground/60 text-sm">
              Sign in to manage your leads
            </p>
          </div>

          <div className="bg-card/10 backdrop-blur-xl border border-primary-foreground/15 rounded-2xl p-6 shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-primary-foreground/80 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@es.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground text-sm placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-primary-foreground/80 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground text-sm placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 transition-all pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-destructive-foreground text-xs text-center bg-destructive/20 rounded-lg py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-foreground text-primary font-semibold text-sm py-3 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <span className="h-4 w-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn size={16} />
                    Sign In
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AdminLogin;
