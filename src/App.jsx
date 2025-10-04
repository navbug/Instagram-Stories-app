import { useState, useEffect } from "react";
import { useStories } from "./context/StoriesContext";
import StoriesList from "./components/StoriesList";
import StoryViewer from "./components/StoryViewer";

const App = () => {
  const { state } = useStories();
  const { activeStoryIndex } = state;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (!isMobile) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-8">
          <p className="text-xl font-bold text-gray-800 mb-4">Open application on a mobile device or resize browser window.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-screen bg-black overflow-hidden">
      {activeStoryIndex === null ? <StoriesList /> : <StoryViewer />}
    </div>
  );
};

export default App;