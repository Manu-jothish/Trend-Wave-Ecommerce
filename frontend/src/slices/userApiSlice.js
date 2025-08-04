import { data } from "react-router-dom";
import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/api/user/register",
        method: "POST",
        body: data,
      }),
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "/api/user",
        method: "POST",
        body: data,
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/api/user/logout",
        method: "GET",
      }),
    }),
    deleteUser:builder.mutation({
      query:(userId)=>({
      url:`/api/user/${userId}`,
      method:"DELETE"
      }),
    }),
    getUser:builder.query({
      query:()=>({
       url:'/api/user',
      }),
      providesTags:['User'],
      keepUnusedDataFor:5,
    })

  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useDeleteUserMutation,
 useGetUserQuery
} = userApiSlice;
