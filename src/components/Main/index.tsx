"use client";
import useFetch from "@/hooks/useFetch";
import useAuth from "@/hooks/useAuth";
import React from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Album {
  id: number;
  title: string;
  thumbnailUrl: string;
}

interface Post {
  id: number;
  name: string;
  body: string;
}

function Main() {
  const { user, login, logout, isAuthenticated } = useAuth();

  const {
    data: users,
    loading: usersLoading,
    error: usersError,
  } = useFetch<User[]>("/users");

  const {
    data: albums,
    loading: albumsLoading,
    error: albumsError,
  } = useFetch<Album[]>("/albums");

  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
  } = useFetch<Post[]>("/posts");

  if (usersLoading || albumsLoading || postsLoading)
    return <p className="text-center text-lg font-semibold">Loading</p>;
  if (usersError || albumsError || postsError)
    return (
      <p className="text-center text-red-500 font-semibold">
       Error
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">


      <section className="bg-blue-100 p-4 rounded-lg shadow-md border border-blue-300">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">Users</h2>
        <ul className="space-y-2">
          {users?.map((u) => (
            <li key={u.id} className="border-b pb-2 text-blue-900">
              {u.name} ({u.email})
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-green-100 p-4 rounded-lg shadow-md border border-green-300">
        <h2 className="text-xl font-semibold mb-2 text-green-700">Albums</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {albums?.map((album) => (
            <div
              key={album.id}
              className="bg-white p-2 rounded-lg shadow border border-green-400"
            >
              <p className="text-center font-medium mt-2 text-green-900">
                {album.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-yellow-100 p-4 rounded-lg shadow-md border border-yellow-300">
        <h2 className="text-xl font-semibold mb-2 text-yellow-700">Posts</h2>
        <ul className="space-y-2">
          {posts?.map((post) => (
            <li key={post.id} className="border-b pb-2 text-yellow-900">
              <strong>{post.name}</strong>: {post.body}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Main;
