import { summaryApi } from "@/Common";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  Post: [],
  singlePost: null,
  story: [],
  isLoading: false,
  error: null,
};

export const addPost = createAsyncThunk(
  "/auth/register",
  async (fromData, { rejectWithValue }) => {
    try {
      const response = await axios.post(summaryApi.createPost.url, fromData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);

      // If there is an error, return the response data or the message via rejectWithValue
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Custom payload in case of error
      } else {
        return rejectWithValue(error.message); // Fallback message if no response data
      }
    }
  }
);
export const allPost = createAsyncThunk(
  "post/allPost",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(summaryApi.getAllPost.url, {
        withCredentials: true, // ✅ Moved to config
      });
      return response.data;
    } catch (error) {
      console.log(error);

      // Return proper error messages
      return rejectWithValue(
        error.response?.data || error.message || "An error occurred"
      );
    }
  }
);
export const singlepost = createAsyncThunk(
  "post/post",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${summaryApi.singlePost.url}${id}`, {
        withCredentials: true, // ✅ Moved to config
      });

      return response.data;
    } catch (error) {
      console.log(error);

      // Return proper error messages
      return rejectWithValue(
        error.response?.data || error.message || "An error occurred"
      );
    }
  }
);
export const likeUnlike = createAsyncThunk(
  "post/likeUnlike",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${summaryApi.likeUnlike.url}${id}`, {
        withCredentials: true, // ✅ Moved to config
      });

      return { id, likes: response.data.post.like };
    } catch (error) {
      console.log(error);

      // Return proper error messages
      return rejectWithValue(
        error.response?.data || error.message || "An error occurred"
      );
    }
  }
);
export const commentAPost = createAsyncThunk(
  "post/comment",
  async ({ id, comment }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${summaryApi.commentPost.url}${id}`,
        comment,
        {
          withCredentials: true, // ✅ Moved to config
        }
      );

      return { id, comments: response.data.comments };
    } catch (error) {
      console.log(error);

      // Return proper error messages
      return rejectWithValue(
        error.response?.data || error.message || "An error occurred"
      );
    }
  }
);
export const replycomment = createAsyncThunk(
  "post/replycomment",
  async ({ id, comment }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${summaryApi.replyComment.url}${id}`,
        comment,
        {
          withCredentials: true, // ✅ Moved to config
        }
      );
      console.log(id, response.data.comments);

      return { id, comments: response.data.comments };
    } catch (error) {
      console.log(error);

      // Return proper error messages
      return rejectWithValue(
        error.response?.data || error.message || "An error occurred"
      );
    }
  }
);
export const likecomment = createAsyncThunk(
  "post/likeComment",
  async ({ postId, commentId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${summaryApi.addlikecommnet.url}${commentId}`,
        {},
        {
          withCredentials: true, // ✅ Moved to config
        }
      );

      console.log("Updated Likes:", response.data.likes);

      // ✅ Return Correct Data
      return {
        postId,
        commentId,
        likes: response.data.likes, // Updated likes array
      };
    } catch (error) {
      console.log("Like Comment Error:", error);

      return rejectWithValue(
        error.response?.data || error.message || "An error occurred"
      );
    }
  }
);
export const getbycategory = createAsyncThunk(
  "post/getbycategory",
  async (value, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${summaryApi.getPostbyCategory.url}?startIndex=0&limit=10&order=desc&author=&category=${value}&searchTerm=`,
        {
          withCredentials: true, // ✅ Moved to config
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);

      // Return proper error messages
      return rejectWithValue(
        error.response?.data || error.message || "An error occurred"
      );
    }
  }
);
export const addStory = createAsyncThunk(
  "/user/story",
  async (fromData, { rejectWithValue }) => {
    try {
      const response = await axios.post(summaryApi.addStory.url, fromData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);

      // If there is an error, return the response data or the message via rejectWithValue
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Custom payload in case of error
      } else {
        return rejectWithValue(error.message); // Fallback message if no response data
      }
    }
  }
);
export const allStory = createAsyncThunk(
  "post/allstory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(summaryApi.getStory.url, {
        withCredentials: true, // ✅ Moved to config
      });
      return response.data;
    } catch (error) {
      console.log(error);

      // Return proper error messages
      return rejectWithValue(
        error.response?.data || error.message || "An error occurred"
      );
    }
  }
);

export const PostSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.isLoading = false;

        if (Array.isArray(state.Post)) {
          state.Post = [action.payload.data, ...state.Post];
        } else {
          // If it's not an array, directly set it as the new post array
          state.Post = [action.payload.data];
        }
      })
      .addCase(addPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(allPost.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(allPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Post = action.payload.data;
        state.error = null;
      })
      .addCase(allPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(likeUnlike.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(likeUnlike.fulfilled, (state, action) => {
        state.Post = state.Post.map((post) =>
          post._id === action.payload.id
            ? { ...post, like: action.payload.likes }
            : post
        );
        state.isLoading = false;
      })
      .addCase(likeUnlike.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(commentAPost.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(commentAPost.fulfilled, (state, action) => {
        state.Post = state.Post.map((post) =>
          post._id === action.payload.id
            ? { ...post, comment: action.payload.comments }
            : post
        );
        state.isLoading = false; // ✅ Update likes in store
      })
      .addCase(commentAPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(replycomment.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(replycomment.fulfilled, (state, action) => {
        state.Post = state.Post.map((post) =>
          post._id === action.payload.id
            ? { ...post, comment: action.payload.comments }
            : post
        );
        state.isLoading = false; // ✅ Update likes in store
      })
      .addCase(replycomment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(likecomment.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(likecomment.fulfilled, (state, action) => {
        state.Post = state.Post.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                comment: post.comment.map((comment) =>
                  comment._id === action.payload.commentId
                    ? { ...comment, likes: action.payload.likes } // ✅ Update likes correctly
                    : comment
                ),
              }
            : post
        );

        state.isLoading = false; // ✅ Stop loading state
      })
      .addCase(likecomment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(addStory.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(addStory.fulfilled, (state, action) => {
        state.isLoading = false;

        if (Array.isArray(state.story)) {
          state.story = [action.payload.data, ...state.story];
        } else {
          // If it's not an array, directly set it as the new post array
          state.story = [action.payload.story];
        }
      })
      .addCase(addStory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(allStory.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(allStory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.story = action.payload.data;
        state.error = null;
      })
      .addCase(allStory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      });
  },
});

export default PostSlice.reducer;
