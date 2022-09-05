import { combineReducers } from '@reduxjs/toolkit';

import { dark_mode } from './Dark_Mode/Dark_Mode_Reducer';
import { screen_dimensions } from './Screen_Dimensions/Screen_Dimensions_Reducer';
import { blog_tags } from './Blog_Tags/Blog_Tags_Reducer';
import { all_blogs } from './All_Blogs/All_Blogs_Reducer';
import { current_blog } from './Current_Blog/Current_Blog_Reducer';

const rootReducer = combineReducers({
    isDarkMode: dark_mode,
    ScreenDimensions: screen_dimensions,
    BlogTags: blog_tags,
    AllBlogs: all_blogs,
    CurrentBlog: current_blog,
});

export default rootReducer;
