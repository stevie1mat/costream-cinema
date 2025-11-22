import { useEffect, useRef } from 'react';

interface VideoGridProps {
  isScreenSharing: boolean;
}

const VideoGrid = ({ isScreenSharing }: VideoGridProps) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const screenShareRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Initialize local video stream
    const initLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera/microphone:', error);
      }
    };

    initLocalStream();

    return () => {
      // Cleanup streams
      if (localVideoRef.current?.srcObject) {
        const stream = localVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  if (isScreenSharing) {
    // Cinema Mode: Screen share takes up 90% of space
    return (
      <div className="h-[calc(100vh-12rem)] flex gap-4">
        {/* Main Theater Screen */}
        <div className="flex-1 relative rounded-2xl overflow-hidden bg-card shadow-card border border-border">
          <video
            ref={screenShareRef}
            autoPlay
            playsInline
            className="w-full h-full object-contain bg-black"
          />
          <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2">
            <span className="text-sm font-medium">Screen Share</span>
          </div>
        </div>

        {/* PiP Video Sidebar */}
        <div className="w-80 flex flex-col gap-4">
          {/* Remote User */}
          <div className="relative rounded-xl overflow-hidden bg-card shadow-card border border-border aspect-video">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1">
              <span className="text-xs font-medium">Partner</span>
            </div>
            {/* Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">👤</span>
                </div>
                <p className="text-sm text-muted-foreground">Waiting for partner...</p>
              </div>
            </div>
          </div>

          {/* Local User */}
          <div className="relative rounded-xl overflow-hidden bg-card shadow-card border border-border aspect-video">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1">
              <span className="text-xs font-medium">You</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Mode: Side-by-side video chat
  return (
    <div className="h-[calc(100vh-12rem)] grid grid-cols-2 gap-6">
      {/* Local Video */}
      <div className="relative rounded-2xl overflow-hidden bg-card shadow-card border border-border">
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 left-6 bg-background/80 backdrop-blur-sm rounded-lg px-4 py-2">
          <span className="text-sm font-medium">You</span>
        </div>
      </div>

      {/* Remote Video */}
      <div className="relative rounded-2xl overflow-hidden bg-card shadow-card border border-border">
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 left-6 bg-background/80 backdrop-blur-sm rounded-lg px-4 py-2">
          <span className="text-sm font-medium">Partner</span>
        </div>
        {/* Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">👤</span>
            </div>
            <p className="text-lg text-muted-foreground">Waiting for partner to join...</p>
            <p className="text-sm text-muted-foreground mt-2">Share the room code to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGrid;
