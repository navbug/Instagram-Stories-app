import { useStories } from "../context/StoriesContext";
import { ACTION_TYPES } from "../constants";

const StoriesList = () => {
  const { state, dispatch } = useStories();
  const { stories } = state;
  
  const handleStoryClick = (index) => {
    dispatch({ type: ACTION_TYPES.SET_ACTIVE_STORY, payload: index });
  };
  
  return (
    <div className="h-full bg-white">
      <div className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-xl font-bold">Stories</h1>
      </div>
      
      <div className="overflow-x-auto">
        <div className="flex space-x-4 p-4">
          {stories.map((user, index) => (
            <button
              key={user.id}
              onClick={() => handleStoryClick(index)}
              className="flex-shrink-0 focus:outline-none"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-white p-0.5">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <p className="text-xs text-center mt-1 max-w-[64px] truncate">
                {user.username}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoriesList;