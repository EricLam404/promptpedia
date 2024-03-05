import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [generating, setGenerating] = useState(false);

  const generateTags = async () => {
    if(!post.prompt) return alert('Prompt is empty');
    try {
      setGenerating(true)
      const response = await fetch(`/api/generate/tags`, {
      method: "POST",
        body: JSON.stringify({
            prompt: post.prompt,
        }),
      });
      const data = await response.json()
      setPost({
        ...post,
        tag: data
      })
    } catch (error) {
      console.log(error);
    } finally {
      setGenerating(false);
    } 
  }

  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.
      </p>
      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({
              ...post,
              prompt: e.target.value
            })}
            placeholder='Write your prompt here...'
            required
            className='form_textarea'
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tag {` `}
            <span className='font-normal'>(#product, #webdevelopment, #idea)</span>
          </span>
          <div className='flex items-center'>
            <input
              value={generating ? "Generating Tags..." : post.tag}
              onChange={(e) => setPost({
                ...post,
                tag: e.target.value
              })}
              placeholder='#tag'
              required
              className='form_input'
            />
            <div className='flex items-center ml-[-40px] mt-2 gap-2' onClick={generateTags} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
              <div className={`${showTooltip ? 'block' : 'hidden'} bg-gray-600 text-white p-2 rounded-md absolute w-40 left-[80%] top-[56%]`}>
                Generate tags for your prompt!
              </div>
              <Image 
                src="/assets/icons/add.svg"
                alt="add_icon"
                width={24}
                height={24}
              />
            </div>
          </div>
        </label>
        
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href="/" className='text-gray-500 text-sm'>
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type} ...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form