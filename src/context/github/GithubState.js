import React,{useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import{
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from './types';

const GithubState=props=>{
  const initialState={
    users:[],
    user:{},
    repos:[],
    loading:false
  }

  const [state,dispatch]=useReducer(GithubReducer,initialState);
  const searchUsers= async text =>{
    setLoading();
    const res= await axios.get(`http://api.github.com/search/users?q=${text}`);
   // axios.get('http://api.github.com/users').then(res => console.log(res.data));
   
   dispatch({
     type:SEARCH_USERS,
     payload:res.data.items
   });

  };
  const clearUsers=()=>dispatch({type:CLEAR_USERS});

  const setLoading=()=>dispatch({type:SET_LOADING});
  const getUser=async(username)=>{
    setLoading();
    const res= await axios.get(`http://api.github.com/users/${username}`);
   // axios.get('http://api.github.com/users').then(res => console.log(res.data));
   dispatch({
     type:GET_USER,
     payload:res.data
   })
  }

  const getUserRepos=async(username)=>{
    setLoading();
    const res= await axios.get(`http://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`);
   // axios.get('http://api.github.com/users').then(res => console.log(res.data));
   
   dispatch({
     type:GET_REPOS,
     payload:res.data
   })
  }


  return <GithubContext.Provider
    value={{
      users:state.users,
      user:state.user,
      repos:state.repos,
      loading:state.loading,
      searchUsers,
      clearUsers,
      getUser,
      getUserRepos
    }}
    >
      {props.children}
  </GithubContext.Provider>

  
}
export default GithubState;