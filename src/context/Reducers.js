import { ACTION_TYPES } from "../constants";

const storiesReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_STORIES:
      return { ...state, stories: action.payload };
      
    case ACTION_TYPES.SET_ACTIVE_STORY:
      return { 
        ...state, 
        activeStoryIndex: action.payload,
        activeUserStoryIndex: 0,
        progress: 0,
        imageLoading: true
      };
      
    case ACTION_TYPES.SET_ACTIVE_USER_STORY:
      return { 
        ...state, 
        activeUserStoryIndex: action.payload,
        progress: 0,
        imageLoading: true
      };
      
    case ACTION_TYPES.SET_PROGRESS:
      return { ...state, progress: action.payload };
      
    case ACTION_TYPES.SET_PAUSED:
      return { ...state, isPaused: action.payload };
      
    case ACTION_TYPES.SET_IMAGE_LOADING:
      return { ...state, imageLoading: action.payload };
      
    case ACTION_TYPES.RESET_PROGRESS:
      return { ...state, progress: 0 };
      
    case ACTION_TYPES.NEXT_STORY:
      const currentUser = state.stories[state.activeStoryIndex];
      
      if (state.activeUserStoryIndex < currentUser.stories.length - 1) {
        // Next story from same user
        return {
          ...state,
          activeUserStoryIndex: state.activeUserStoryIndex + 1,
          progress: 0,
          imageLoading: true
        };
      } else if (state.activeStoryIndex < state.stories.length - 1) {
        // Next user's stories
        return {
          ...state,
          activeStoryIndex: state.activeStoryIndex + 1,
          activeUserStoryIndex: 0,
          progress: 0,
          imageLoading: true
        };
      } else {
        // End of all stories
        return {
          ...state,
          activeStoryIndex: null,
          activeUserStoryIndex: 0,
          progress: 0,
          imageLoading: true
        };
      }
      
    case ACTION_TYPES.PREVIOUS_STORY:
      if (state.activeUserStoryIndex > 0) {
        // Previous story from same user
        return {
          ...state,
          activeUserStoryIndex: state.activeUserStoryIndex - 1,
          progress: 0,
          imageLoading: true
        };
      } else if (state.activeStoryIndex > 0) {
        // Previous user's last story
        const prevUser = state.stories[state.activeStoryIndex - 1];
        return {
          ...state,
          activeStoryIndex: state.activeStoryIndex - 1,
          activeUserStoryIndex: prevUser.stories.length - 1,
          progress: 0,
          imageLoading: true
        };
      }
      return state;
      
    case ACTION_TYPES.CLOSE_STORY:
      return {
        ...state,
        activeStoryIndex: null,
        activeUserStoryIndex: 0,
        progress: 0,
        imageLoading: true
      };
      
    default:
      return state;
  }
};

export { storiesReducer };