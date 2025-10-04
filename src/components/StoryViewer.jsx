import { useEffect, useRef } from "react";
import { useStories } from "../context/StoriesContext";
import { ACTION_TYPES } from "../constants";

const StoryViewer = () => {
  const { state, dispatch } = useStories();
  const { stories, activeStoryIndex, activeUserStoryIndex, progress, isPaused, imageLoading } = state;
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);
  
  // Auto change stories every 5 seconds
  useEffect(() => {
    if (activeStoryIndex !== null && !isPaused && !imageLoading) {
      intervalRef.current = setInterval(() => {
        dispatch({ 
          type: ACTION_TYPES.SET_PROGRESS, 
          payload: progress >= 100 ? 0 : progress + 2 
        });
        
        if (progress >= 100) {
          dispatch({ type: ACTION_TYPES.NEXT_STORY });
        }
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeStoryIndex, activeUserStoryIndex, isPaused, imageLoading, progress, dispatch]);
  
  const handleCloseStory = () => {
    dispatch({ type: ACTION_TYPES.CLOSE_STORY });
  };
  
  const handleTouchStart = (e) => {
    console.log(e);
    touchStartX.current = e.touches[0].clientX;
    dispatch({ type: ACTION_TYPES.SET_PAUSED, payload: true });
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;
    const screenWidth = window.innerWidth;
    
    dispatch({ type: ACTION_TYPES.SET_PAUSED, payload: false });
    
    // Calc tap location
    if (Math.abs(diffX) < 10) {
      if (touchEndX < screenWidth * 0.3) {
        dispatch({ type: ACTION_TYPES.PREVIOUS_STORY });
      } else if (touchEndX > screenWidth * 0.7) {
        dispatch({ type: ACTION_TYPES.NEXT_STORY });
      }
    }
  };
  
  const handleImageLoad = () => {
    dispatch({ type: ACTION_TYPES.SET_IMAGE_LOADING, payload: false });
  };

  const handleImageError = () => {
    dispatch({ type: ACTION_TYPES.SET_IMAGE_LOADING, payload: false });
  };
  
  if (activeStoryIndex === null || !stories[activeStoryIndex]) return null;
  
  const currentUser = stories[activeStoryIndex];
  const currentStory = currentUser.stories[activeUserStoryIndex];
  
  return (
    <div 
      className="relative h-full bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress bars */}
      <div className="absolute top-0 left-0 right-0 z-30 flex space-x-1 p-2">
        {currentUser.stories.map((_, index) => (
          <div key={index} className="flex-1 h-0.5 bg-gray-600 rounded overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{ 
                width: index < activeUserStoryIndex ? '100%' : 
                       index === activeUserStoryIndex ? `${progress}%` : '0%' 
              }}
            />
          </div>
        ))}
      </div>

      {/* Header includes Avatar & X button */}
      <div className="absolute top-6 left-0 right-0 z-30 flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <img
            src={currentUser.avatar}
            alt={currentUser.username}
            className="w-8 h-8 rounded-full border-2 border-white"
          />
          <span className="text-white text-sm font-medium">
            {currentUser.username}
          </span>
        </div>
        <button
          onClick={handleCloseStory}
          className="text-white text-2xl focus:outline-none"
        >
          ×
        </button>
      </div>

      {/* Story Image */}
      <div className="relative h-full flex items-center justify-center">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={currentStory.image}
          alt="Story"
          className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
    </div>
  );
};

export default StoryViewer;