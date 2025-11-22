import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Film, Users } from 'lucide-react';

const Lobby = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const generateRoomId = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleCreateRoom = () => {
    setIsCreating(true);
    const roomId = generateRoomId();
    setTimeout(() => {
      navigate(`/room/${roomId}`);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-theater-bg flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      
      <div className="relative z-10 max-w-2xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-card mb-6 shadow-glow">
            <Film className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-6xl font-bold text-foreground mb-4">
            Co-Watch
          </h1>
          <p className="text-xl text-muted-foreground">
            Watch movies together, miles apart
          </p>
        </div>

        <div className="bg-gradient-card rounded-2xl p-8 shadow-card border border-border">
          <div className="flex flex-col gap-6">
            <Button
              onClick={handleCreateRoom}
              disabled={isCreating}
              size="lg"
              className="w-full h-16 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow transition-all hover:scale-[1.02]"
            >
              <Users className="w-6 h-6 mr-2" />
              {isCreating ? 'Creating Room...' : 'Create a Room'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-muted-foreground bg-card">or</span>
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="room-code" className="text-sm font-medium text-foreground block">
                Join with Room Code
              </label>
              <div className="flex gap-3">
                <input
                  id="room-code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className="flex-1 h-12 px-4 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                <Button
                  size="lg"
                  variant="secondary"
                  className="px-8 h-12 font-semibold hover:bg-secondary/80 transition-all"
                >
                  Join
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-xs">✓</span>
              </div>
              <p>
                High-quality screen sharing with system audio capture for the best movie watching experience
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Built for seamless remote movie nights with friends and family
          </p>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
