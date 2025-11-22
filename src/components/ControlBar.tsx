import { Button } from '@/components/ui/button';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Monitor, 
  MonitorOff,
  PhoneOff
} from 'lucide-react';

interface ControlBarProps {
  isVisible: boolean;
  isMicOn: boolean;
  isCameraOn: boolean;
  isScreenSharing: boolean;
  onToggleMic: () => void;
  onToggleCamera: () => void;
  onToggleScreenShare: () => void;
  onEndCall: () => void;
}

const ControlBar = ({
  isVisible,
  isMicOn,
  isCameraOn,
  isScreenSharing,
  onToggleMic,
  onToggleCamera,
  onToggleScreenShare,
  onEndCall
}: ControlBarProps) => {
  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 bg-control-bg/95 backdrop-blur-lg border-t border-border transition-all duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-center gap-3">
          {/* Microphone Toggle */}
          <Button
            size="lg"
            variant={isMicOn ? 'secondary' : 'destructive'}
            onClick={onToggleMic}
            className="w-14 h-14 rounded-full transition-all hover:scale-105"
          >
            {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </Button>

          {/* Camera Toggle */}
          <Button
            size="lg"
            variant={isCameraOn ? 'secondary' : 'destructive'}
            onClick={onToggleCamera}
            className="w-14 h-14 rounded-full transition-all hover:scale-105"
          >
            {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </Button>

          {/* Screen Share Toggle */}
          <Button
            size="lg"
            variant={isScreenSharing ? 'default' : 'secondary'}
            onClick={onToggleScreenShare}
            className={`w-14 h-14 rounded-full transition-all hover:scale-105 ${
              isScreenSharing ? 'shadow-glow' : ''
            }`}
          >
            {isScreenSharing ? <MonitorOff className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
          </Button>

          {/* End Call */}
          <Button
            size="lg"
            variant="destructive"
            onClick={onEndCall}
            className="w-14 h-14 rounded-full transition-all hover:scale-105 ml-4"
          >
            <PhoneOff className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;
