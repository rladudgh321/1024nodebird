import AppLayout from '@/components/AppLayout';
import React, { useEffect } from 'react';
import PostForm from '@/components/PostForm';
import PostCard from '@/components/PostCard';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_POSTS_REQUEST } from '@/reducer/post';
import { LOAD_MY_INFO_REQUEST } from '@/reducer/user';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state)=>state.user);
  const { mainPost, hasmore, loadPostsLoading } = useSelector((state)=>state.post);


  //10개 초기에 로딩
  useEffect(()=>{
    dispatch({
      type:LOAD_POSTS_REQUEST,
    });
    dispatch({
      type:LOAD_MY_INFO_REQUEST
    });
  },[]);

  // 페이지 내릴 때 로딩
  useEffect(()=>{
    function scrollEvent(){
      if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 500 ) {
        if(hasmore && !loadPostsLoading) {
          const lastId = mainPost[mainPost.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId
          });
        }
      }  
    }
    window.addEventListener('scroll', scrollEvent);
    return () => {
      window.removeEventListener('scroll', scrollEvent);
    }

  },[hasmore, loadPostsLoading, mainPost]);

  return (
    <>
      <AppLayout>
        { me && <PostForm /> }
        { mainPost.map((post)=> <PostCard post={post} key={post.id} /> ) }
      </AppLayout>
    </>
  );
}

export default Home;
