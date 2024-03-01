'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'

import Profile from '@components/Profile'

const UserProfile = () => {
    const { data: session } = useSession();

    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState("");
    const { id } = useParams();
    const router = useRouter();
    
    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${id}/posts`);
          const data = await response.json()
          setPosts(data)
          console.log(data)
        }

        fetchPosts();
    }, [])

    useEffect(() => {
        if(posts.length == 0){
            const fetchUsername = async () => {
                const response = await fetch(`/api/users/${id}/usernames`);
                const data = await response.json()
                setUsername(data)
                console.log(data)
            }
      
            fetchUsername();
        } else {
            setUsername(posts[0].creator.username);
        }
    }, [posts])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed  = confirm("Are you sure you want to delete this prompt?");

        if(hasConfirmed){
            try {
                await fetch(`/api/prompt/${post._id}`, {
                    method: "DELETE"
                })

                const filteredPosts = posts.filter((p) => p._id !== post._id)
                setPosts(filteredPosts);
            } catch(error){
                console.log(error)
            }
        }
    }

    return (
        <Profile
            name={username ? username[0].toUpperCase() + username.slice(1) + "'s" : ""}
            desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default UserProfile