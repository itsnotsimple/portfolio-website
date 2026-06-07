import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CustomVideoPlayer.module.css';

interface CustomVideoPlayerProps {
  src: string;
  autoPlay?: boolean;
  playsInline?: boolean;
  muted?: boolean;
  objectFit?: 'cover' | 'contain';
}

export interface CustomVideoPlayerRef {
  play: () => void;
  pause: () => void;
  videoElement: HTMLVideoElement | null;
}

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const VolumeHighIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

const VolumeMutedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

const FullscreenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
  </svg>
);

const ExitFullscreenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M4 14h6v6m10-6h-6v6M4 10h6V4m10 6h-6V4" />
  </svg>
);

const CustomVideoPlayer = forwardRef<CustomVideoPlayerRef, CustomVideoPlayerProps>(
  ({ src, autoPlay = true, playsInline = true, muted = false, objectFit = 'contain' }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const scrubberRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(muted);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isScrubbing, setIsScrubbing] = useState(false);

    // Premium overlays states
    const [actionFlash, setActionFlash] = useState<'play' | 'pause' | 'mute' | 'unmute' | null>(null);
    const [hoverTime, setHoverTime] = useState<string | null>(null);
    const [tooltipX, setTooltipX] = useState(0);
    const [showSpeedMenu, setShowSpeedMenu] = useState(false);
    const [keyboardToast, setKeyboardToast] = useState<string | null>(null);

    // Ref exposure
    useImperativeHandle(ref, () => ({
      play: () => videoRef.current?.play(),
      pause: () => videoRef.current?.pause(),
      videoElement: videoRef.current,
    }));

    // Trigger autoplay
    useEffect(() => {
      if (videoRef.current && autoPlay) {
        videoRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
    }, [autoPlay, src]);

    // Volume updates
    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.volume = volume;
        videoRef.current.muted = isMuted;
      }
    }, [volume, isMuted]);

    // Rate updates
    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.playbackRate = playbackRate;
      }
    }, [playbackRate]);

    const handleTimeUpdate = () => {
      if (!isScrubbing && videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration);
      }
    };

    // Auto-hide controls
    useEffect(() => {
      if (!isPlaying || showSpeedMenu) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShowControls(true);
        return;
      }
      let timeoutId: number;
      const handleMouseMove = () => {
        setShowControls(true);
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
          if (isPlaying && !isScrubbing && !showSpeedMenu) {
            setShowControls(false);
          }
        }, 2200);
      };

      const container = containerRef.current;
      if (container) {
        container.addEventListener('mousemove', handleMouseMove);
        timeoutId = window.setTimeout(() => setShowControls(false), 2200);
      }

      return () => {
        if (container) {
          container.removeEventListener('mousemove', handleMouseMove);
        }
        clearTimeout(timeoutId);
      };
    }, [isPlaying, isScrubbing, showSpeedMenu]);

    // Fullscreen updates
    useEffect(() => {
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Format utility
    const formatTime = (timeInSeconds: number) => {
      if (isNaN(timeInSeconds)) return '0:00';
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = Math.floor(timeInSeconds % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Controls
    const togglePlay = () => {
      if (!videoRef.current) return;
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        triggerActionFlash('pause');
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
          triggerActionFlash('play');
        }).catch(() => {});
      }
    };

    const triggerActionFlash = (action: 'play' | 'pause' | 'mute' | 'unmute') => {
      setActionFlash(action);
      setTimeout(() => setActionFlash(null), 550);
    };

    const showToast = (text: string) => {
      setKeyboardToast(text);
      setTimeout(() => setKeyboardToast(null), 1200);
    };

    const toggleMute = () => {
      const nextMute = !isMuted;
      setIsMuted(nextMute);
      triggerActionFlash(nextMute ? 'mute' : 'unmute');
      showToast(nextMute ? 'Muted' : `Volume ${Math.round(volume * 100)}%`);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseFloat(e.target.value);
      setVolume(val);
      if (val > 0 && isMuted) {
        setIsMuted(false);
      } else if (val === 0 && !isMuted) {
        setIsMuted(true);
      }
    };

    const handleSpeedSelect = (rate: number) => {
      setPlaybackRate(rate);
      setShowSpeedMenu(false);
      showToast(`Speed ${rate}x`);
    };

    const toggleFullscreen = () => {
      const container = containerRef.current;
      const video = videoRef.current as any;
      if (!container || !video) return;

      if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
        return;
      }

      if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
          container.requestFullscreen().catch(() => {});
        } else if (video.requestFullscreen) {
          video.requestFullscreen().catch(() => {});
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      }
    };

    // Scrubbing Logic
    const getScrubTime = (clientX: number) => {
      if (!scrubberRef.current || !duration) return 0;
      const rect = scrubberRef.current.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const pct = Math.max(0, Math.min(1, relativeX / rect.width));
      return pct * duration;
    };

    const handleScrubberMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!duration) return;
      setIsScrubbing(true);
      const scrubTime = getScrubTime(e.clientX);
      setCurrentTime(scrubTime);
      if (videoRef.current) {
        videoRef.current.currentTime = scrubTime;
      }

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const moveTime = getScrubTime(moveEvent.clientX);
        setCurrentTime(moveTime);
        if (videoRef.current) {
          videoRef.current.currentTime = moveTime;
        }
      };

      const handleMouseUp = () => {
        setIsScrubbing(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    // Timeline Hover Tooltip
    const handleScrubberMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!duration || !scrubberRef.current) return;
      const rect = scrubberRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, relativeX / rect.width));
      setHoverTime(formatTime(pct * duration));
      setTooltipX(relativeX);
    };

    const handleScrubberMouseLeave = () => {
      setHoverTime(null);
    };

    const handleScrubberTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      if (!duration) return;
      setIsScrubbing(true);
      const touch = e.touches[0];
      const scrubTime = getScrubTime(touch.clientX);
      setCurrentTime(scrubTime);
      if (videoRef.current) {
        videoRef.current.currentTime = scrubTime;
      }

      const handleTouchMove = (moveEvent: TouchEvent) => {
        const moveTouch = moveEvent.touches[0];
        const moveTime = getScrubTime(moveTouch.clientX);
        setCurrentTime(moveTime);
        if (videoRef.current) {
          videoRef.current.currentTime = moveTime;
        }
      };

      const handleTouchEnd = () => {
        setIsScrubbing(false);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };

      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    };

    // Keyboard support
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'm') {
        e.preventDefault();
        toggleMute();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime += 5;
          showToast('+5s');
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime -= 5;
          showToast('-5s');
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const nextVol = Math.min(1, volume + 0.1);
        setVolume(nextVol);
        showToast(`Volume ${Math.round(nextVol * 100)}%`);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextVol = Math.max(0, volume - 0.1);
        setVolume(nextVol);
        showToast(`Volume ${Math.round(nextVol * 100)}%`);
      }
    };

    const progressPercent = duration ? (currentTime / duration) * 100 : 0;

    return (
      <div
        ref={containerRef}
        className={`${styles.playerContainer} ${isFullscreen ? styles.fullscreen : ''}`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseLeave={() => {
          if (isPlaying) {
            setShowControls(false);
          }
          setShowSpeedMenu(false);
        }}
      >
        <video
          ref={videoRef}
          src={src}
          playsInline={playsInline}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onClick={togglePlay}
          className={styles.video}
          style={{ objectFit }}
        />

        {/* Action Ripple Flash Overlays */}
        <AnimatePresence>
          {actionFlash && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.9, scale: 1.1 }}
              exit={{ opacity: 0, scale: 1.3 }}
              transition={{ duration: 0.45 }}
              className={styles.actionFlash}
            >
              {actionFlash === 'play' && <PlayIcon />}
              {actionFlash === 'pause' && <PauseIcon />}
              {actionFlash === 'mute' && <VolumeMutedIcon />}
              {actionFlash === 'unmute' && <VolumeHighIcon />}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Keyboard Action Toast */}
        <AnimatePresence>
          {keyboardToast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className={styles.keyboardToast}
            >
              {keyboardToast}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Controls Panel (Floating Card) */}
        <div className={`${styles.controlsOverlay} ${showControls || isScrubbing || !isPlaying ? styles.visible : ''}`}>
          
          {/* Progress scrubber bar with float time tooltip */}
          <div
            ref={scrubberRef}
            className={styles.scrubberContainer}
            onMouseDown={handleScrubberMouseDown}
            onMouseMove={handleScrubberMouseMove}
            onMouseLeave={handleScrubberMouseLeave}
            onTouchStart={handleScrubberTouchStart}
          >
            <div className={styles.scrubberBg} />
            <div className={styles.scrubberProgress} style={{ width: `${progressPercent}%` }} />
            <div className={styles.scrubberKnob} style={{ left: `${progressPercent}%` }} />
            
            {/* Scrubber time tooltip */}
            <AnimatePresence>
              {hoverTime && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className={styles.timeTooltip}
                  style={{ left: `${tooltipX}px` }}
                >
                  {hoverTime}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom buttons panel */}
          <div className={styles.controlsBar}>
            <div className={styles.controlsGroupLeft}>
              <button
                className={styles.controlButton}
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>

              <div className={styles.timeDisplay}>
                <span className={styles.timeCurrent}>{formatTime(currentTime)}</span>
                <span className={styles.timeDivider}>/</span>
                <span className={styles.timeDuration}>{formatTime(duration)}</span>
              </div>
            </div>

            <div className={styles.controlsGroupRight}>
              {/* Volume controller */}
              <div className={styles.volumeWidget}>
                <button
                  className={styles.controlButton}
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? <VolumeMutedIcon /> : <VolumeHighIcon />}
                </button>
                <div className={styles.volumeSliderContainer}>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className={styles.volumeSlider}
                  />
                </div>
              </div>

              {/* Speed rate dropup selector */}
              <div className={styles.speedWidget}>
                <button
                  className={`${styles.controlButton} ${styles.speedBtn}`}
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  aria-label="Playback speed menu"
                >
                  {playbackRate === 1 ? '1.0x' : `${playbackRate}x`}
                </button>
                
                <AnimatePresence>
                  {showSpeedMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      className={styles.speedMenu}
                    >
                      {[0.5, 1, 1.25, 1.5, 2].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => handleSpeedSelect(rate)}
                          className={`${styles.speedMenuItem} ${playbackRate === rate ? styles.speedMenuItemActive : ''}`}
                        >
                          {rate === 1 ? 'Normal' : `${rate}x`}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Fullscreen toggle */}
              <button
                className={styles.controlButton}
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CustomVideoPlayer.displayName = 'CustomVideoPlayer';

export default CustomVideoPlayer;
