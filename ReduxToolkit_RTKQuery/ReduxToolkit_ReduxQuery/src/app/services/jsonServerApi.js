import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const jsonServerApi = createApi({
    reducerPath:'jsonServerApi',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:3000/'}),
    tagTypes:['Posts'],
    endpoints: (builder)=>({
        getPosts:builder.query({
            query: (page = 3) => `posts?_page=${page}&_per_page=5`,
            providesTags:['Posts'],
        }),

        createPost:builder.mutation({
            query:({title,views})=>({
                url: `posts`,
                method: "POST",
                body: {title,views}
            }),
            invalidatesTags:['Posts']
            
        })
    }),
});


export const { useGetPostsQuery, useCreatePostMutation } = jsonServerApi;