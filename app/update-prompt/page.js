'use client';

import React, { useEffect, useState, Suspense } from 'react';
// import { useSession } from 'next-auth/react'K;
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const EditPrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })

    const router = useRouter()
    let promptId;
    // const { data: session } = useSession();
    if(typeof window !== 'undefined'){
        const params = new URLSearchParams(document.location.search);
        promptId = params.get("id")
    }

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        if(promptId) getPromptDetails()
    }, [promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId) return alert('Prompt ID not found');

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
            method: "PATCH",
            body: JSON.stringify({
                prompt: post.prompt,
                tag: post.tag,
            }),
            });
    
            if (response.ok) {
            router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Form 
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt