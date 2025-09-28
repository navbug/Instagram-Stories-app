import React, { useState, useEffect, useRef, createContext, useContext, useReducer } from 'react';
import { storiesData } from '../data/storiesData';
import { storiesReducer } from './Reducers';
import { ACTION_TYPES } from '../constants';

const initialState = {
  stories: [],
  activeStoryIndex: null,
  activeUserStoryIndex: 0,
  progress: 0,
  isPaused: false,
  imageLoading: true
};

const StoriesContext = createContext();

const useStories = () => useContext(StoriesContext);

const StoriesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storiesReducer, initialState);
  
  useEffect(() => {
    dispatch({ type: ACTION_TYPES.SET_STORIES, payload: storiesData });
  }, []);
  
  const value = {
    state,
    dispatch
  };
  
  return (
    <StoriesContext.Provider value={value}>
      {children}
    </StoriesContext.Provider>
  );
};

export default StoriesProvider;

export { useStories };