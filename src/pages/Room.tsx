import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Monitor, 
  MonitorOff,
  PhoneOff,
  Copy,
  Check
} from 'lucide-react';
import { toast } from 'sonner';
import VideoGrid from '@/components/VideoGrid';
import ControlBar from '@/components/ControlBar';

const Room = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);

  let hideControlsTimeout: NodeJS.Timeout;

  const handleMouseMove = () => {
    setIsControlsVisible(true);
    clearTimeout(hideControlsTimeout);
    hideControlsTimeout = setTimeout(() => {
      if (isScreenSharing) {
        setIsControlsVisible(false);
      }
    }, 3000);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(hideControlsTimeout);
    };
  }, [isScreenSharing]);

  const copyRoomId = async () => {
    if (roomId) {
      await navigator.clipboard.writeText(roomId);
      setCopied(true);
      toast.success('Room code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    toast.info(isMicOn ? 'Microphone muted' : 'Microphone unmuted');
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    toast.info(isCameraOn ? 'Camera stopped' : 'Camera started');
  };

  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        // Request screen sharing with system audio
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            frameRate: { ideal: 30, max: 60 },
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
          audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false
          }
        });

        // Check if audio track is available
        const audioTrack = stream.getAudioTracks()[0];
        if (!audioTrack) {
          toast.warning('System audio not captured. Make sure to select "Share system audio" in the screen share dialog.');
        } else {
          toast.success('Screen sharing started with system audio!');
        }

        setIsScreenSharing(true);

        // Handle stream end
        stream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
          toast.info('Screen sharing stopped');
        };
      } catch (error) {
        console.error('Error starting screen share:', error);
        toast.error('Failed to start screen sharing. Please try again.');
      }
    } else {
      setIsScreenSharing(false);
      toast.info('Screen sharing stopped');
    }
  };

  const endCall = () => {
    toast.info('Ending call...');
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-theater-bg text-foreground">
      {/* Room Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border transition-all duration-300 ${
          isControlsVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium">Live Session</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-secondary rounded-lg px-4 py-2 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Room:</span>
              <span className="text-sm font-mono font-semibold text-foreground">{roomId}</span>
            </div>
            <Button
              size="sm"
              variant="secondary"
              onClick={copyRoomId}
              className="gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-20 pb-24 px-6">
        <VideoGrid isScreenSharing={isScreenSharing} />
      </main>

      {/* Control Bar */}
      <ControlBar
        isVisible={isControlsVisible}
        isMicOn={isMicOn}
        isCameraOn={isCameraOn}
        isScreenSharing={isScreenSharing}
        onToggleMic={toggleMic}
        onToggleCamera={toggleCamera}
        onToggleScreenShare={toggleScreenShare}
        onEndCall={endCall}
      />
    </div>
  );
};

export default Room;
