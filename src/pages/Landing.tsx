
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, TrendingUp, Clock, Database, Shield, Activity } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: 'var(--dashboard-bg-primary)' }}
    >
      {/* Header */}
      <header 
        className="border-b px-6 py-4"
        style={{ borderColor: 'var(--dashboard-border)' }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center">
            <Zap 
              className="w-8 h-8 mr-3" 
              style={{ color: 'var(--dashboard-accent-blue)' }} 
            />
            <h1 
              className="text-2xl font-bold display-font"
              style={{ color: 'var(--dashboard-text-primary)' }}
            >
              AI War Room
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/auth')}
              style={{ color: 'var(--dashboard-text-secondary)' }}
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate('/auth')}
              style={{
                backgroundColor: 'var(--dashboard-accent-blue)',
                color: 'white'
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 
            className="text-5xl font-bold display-font mb-6"
            style={{ color: 'var(--dashboard-text-primary)' }}
          >
            Strategic AI Intelligence
            <br />
            <span style={{ color: 'var(--dashboard-accent-blue)' }}>
              At Your Fingertips
            </span>
          </h2>
          <p 
            className="text-xl leading-relaxed max-w-3xl mx-auto mb-8"
            style={{ color: 'var(--dashboard-text-secondary)' }}
          >
            Get real-time analysis of the most strategically important AI developments. 
            Our AI analyzes hundreds of sources twice daily to surface the insights that matter most.
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/auth')}
            className="text-lg px-8 py-4"
            style={{
              backgroundColor: 'var(--dashboard-accent-blue)',
              color: 'white'
            }}
          >
            Start Your Intelligence Briefing
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--dashboard-bg-card)',
              borderColor: 'var(--dashboard-border)'
            }}
          >
            <TrendingUp 
              className="w-12 h-12 mb-4" 
              style={{ color: 'var(--dashboard-accent-blue)' }} 
            />
            <h3 
              className="text-xl font-semibold mb-3"
              style={{ color: 'var(--dashboard-text-primary)' }}
            >
              Strategic Analysis
            </h3>
            <p 
              className="text-sm leading-relaxed"
              style={{ color: 'var(--dashboard-text-secondary)' }}
            >
              Not just news summaries. Get deep strategic context on impact, timing, key players, and precedents for every development.
            </p>
          </div>

          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--dashboard-bg-card)',
              borderColor: 'var(--dashboard-border)'
            }}
          >
            <Database 
              className="w-12 h-12 mb-4" 
              style={{ color: 'var(--dashboard-accent-medium)' }} 
            />
            <h3 
              className="text-xl font-semibold mb-3"
              style={{ color: 'var(--dashboard-text-primary)' }}
            >
              Connected Intelligence
            </h3>
            <p 
              className="text-sm leading-relaxed"
              style={{ color: 'var(--dashboard-text-secondary)' }}
            >
              See how developments connect across time and organizations. Understand the threads that shape the AI landscape.
            </p>
          </div>

          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--dashboard-bg-card)',
              borderColor: 'var(--dashboard-border)'
            }}
          >
            <Clock 
              className="w-12 h-12 mb-4" 
              style={{ color: 'var(--dashboard-accent-high)' }} 
            />
            <h3 
              className="text-xl font-semibold mb-3"
              style={{ color: 'var(--dashboard-text-primary)' }}
            >
              Real-Time Updates
            </h3>
            <p 
              className="text-sm leading-relaxed"
              style={{ color: 'var(--dashboard-text-secondary)' }}
            >
              Updated twice daily at 6 AM and 6 PM. Access historical views and manual refresh when critical developments emerge.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div 
          className="p-8 rounded-lg border text-center"
          style={{ 
            backgroundColor: 'var(--dashboard-bg-secondary)',
            borderColor: 'var(--dashboard-border)'
          }}
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div 
                className="text-3xl font-bold display-font mb-2"
                style={{ color: 'var(--dashboard-accent-blue)' }}
              >
                1,247
              </div>
              <p 
                className="text-sm"
                style={{ color: 'var(--dashboard-text-secondary)' }}
              >
                Stories Analyzed Daily
              </p>
            </div>
            <div>
              <div 
                className="text-3xl font-bold display-font mb-2"
                style={{ color: 'var(--dashboard-accent-medium)' }}
              >
                156
              </div>
              <p 
                className="text-sm"
                style={{ color: 'var(--dashboard-text-secondary)' }}
              >
                Sources Monitored
              </p>
            </div>
            <div>
              <div 
                className="text-3xl font-bold display-font mb-2"
                style={{ color: 'var(--dashboard-accent-high)' }}
              >
                <1s
              </div>
              <p 
                className="text-sm"
                style={{ color: 'var(--dashboard-text-secondary)' }}
              >
                Average Load Time
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer 
        className="border-t px-6 py-8"
        style={{ borderColor: 'var(--dashboard-border)' }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <p 
            className="text-sm"
            style={{ color: 'var(--dashboard-text-secondary)' }}
          >
            © 2025 AI War Room. Strategic Intelligence for the AI Age.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
