import React, {Fragment, useEffect, useContext } from 'react';
import Spinner from '../layouts/Spinner';
import Repos from '../repos/Repos';
import {Link} from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

const User=({match})=>{
  const githubContext=useContext(GithubContext);
  const {getUserRepos,repos,getUser,loading,user}=githubContext;
  useEffect(()=>{
    getUser(match.params.login);
    getUserRepos(match.params.login);
    //eslint-disable-next-line
  },[]);
    
    const{
      name,
      avatar_url,
      id,
      location,
      bio,
      blog,
      login,
      company,
      following,
      public_repos,
      public_gists,
      html_url,
      followers,
      hireable
    }=user;
    

    if(loading) return <Spinner/>;

    return (
      <Fragment>
        <Link to='/' className="btn btn-light">
          Back to search
        </Link>
        Hireable:{''}
        {hireable ? <i className="fas fa-check text-success"/>:
        <i className="fas fa-times text-danger"/>}
        <div className="card grid-2">
          <div className="all-center">
            <img src={avatar_url} className="round-img" alt="" style={{width:'150px'}}/>
            <h1>{name}</h1>
            <p>Location:{location}</p>
          </div>
          <div>
            {bio && <Fragment>
              <h3>BIO</h3>
              <p>{bio}</p>
              </Fragment>}

            <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>
            <ul>
              <li>
                {login && <Fragment>
                  <strong>UserName:</strong> {name}
                  </Fragment>}
              </li>
              <li>
                {login && <Fragment>
                  <strong>company:</strong> {company}
                  </Fragment>}
              </li>
              <li>
                {login && <Fragment>
                  <strong>website:</strong> {blog}
                  </Fragment>}
              </li>
            </ul>
          </div>
        </div>

        <div className="card text-center">
          <div className="badge badge-primary">Followers:{followers}</div>
          <div className="badge badge-success">Following:{following}</div>
          <div className="badge badge-light">public_repos:{public_repos}</div>
          <div className="badge badge-dark">Public_gists:{public_gists}</div>
        </div>
        <Repos repos={repos}/>
      </Fragment>
    )
  
}


export default User
