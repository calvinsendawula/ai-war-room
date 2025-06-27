
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff, Zap } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkUser();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "Successfully signed in to AI War Room",
        });
        navigate('/');
      } else {
        if (password !== confirmPassword) {
          toast({
            title: "Password mismatch",
            description: "Please ensure both password fields match",
            variant: "destructive"
          });
          return;
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`
          }
        });

        if (error) throw error;

        toast({
          title: "Account created!",
          description: "Please check your email to verify your account",
        });
      }
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--dashboard-bg-primary)' }}
    >
      <div 
        className="w-full max-w-md p-8 rounded-lg border"
        style={{ 
          backgroundColor: 'var(--dashboard-bg-card)',
          borderColor: 'var(--dashboard-border)'
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Zap 
              className="w-8 h-8 mr-2" 
              style={{ color: 'var(--dashboard-accent-blue)' }} 
            />
            <h1 
              className="text-2xl font-bold display-font"
              style={{ color: 'var(--dashboard-text-primary)' }}
            >
              AI War Room
            </h1>
          </div>
          <p 
            className="text-sm"
            style={{ color: 'var(--dashboard-text-secondary)' }}
          >
            Strategic AI Intelligence Dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--dashboard-text-primary)' }}
            >
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
              style={{
                backgroundColor: 'var(--dashboard-bg-secondary)',
                borderColor: 'var(--dashboard-border)',
                color: 'var(--dashboard-text-primary)'
              }}
            />
          </div>

          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--dashboard-text-primary)' }}
            >
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pr-10"
                style={{
                  backgroundColor: 'var(--dashboard-bg-secondary)',
                  borderColor: 'var(--dashboard-border)',
                  color: 'var(--dashboard-text-primary)'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                style={{ color: 'var(--dashboard-text-secondary)' }}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--dashboard-text-primary)' }}
              >
                Confirm Password
              </label>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full"
                style={{
                  backgroundColor: 'var(--dashboard-bg-secondary)',
                  borderColor: 'var(--dashboard-border)',
                  color: 'var(--dashboard-text-primary)'
                }}
              />
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
            style={{
              backgroundColor: 'var(--dashboard-accent-blue)',
              color: 'white'
            }}
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>

        {/* Toggle */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setPassword('');
              setConfirmPassword('');
            }}
            className="text-sm hover:underline"
            style={{ color: 'var(--dashboard-accent-blue)' }}
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
