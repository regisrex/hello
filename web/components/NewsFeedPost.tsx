import Image from "next/image";
import { useRouter } from "next/router"
import React from "react";
import AddComment from "./post/AddComment";
import SmallUser, { SmallUserProps } from "./User/SmallUser";

interface NewsFeedPostProps {
    id: string,
    content: string,
    picture?: string,
    likes: any[],
    comments: any[],
    author: SmallUserProps
}


const NFPost: React.FC<NewsFeedPostProps> = (props: NewsFeedPostProps) => {
    const router = useRouter()
    const setPostId = () => {
        if (!router.query['postId']) {
            if (router.query['userId']) {
                router.push({
                    pathname: router.pathname,
                    query: {
                        postId: props.id,
                        userId: router.query['userId']
                    }
                })
            } else {

                router.push({
                    pathname: router.pathname,
                    query: {
                        postId: props.id,
                    }
                })
            }
        }
    }
    return (
        <>
            <div className="w-full   border shadow-md md:my-3 msm:my-1 rounded-xl shadow-slate-100" >
            <div className="p-3">
                <div className="w-full flex items-center gap-2">

                    <SmallUser {...props.author} with_follow={true} />
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>

                    </button>
                </div>
                <hr className="my-3 opacity-0" />
                {/* <Link href={{ pathname : router.pathname , query : { postId : props.id}}} > */}
                <p className="text-xl cursor-pointer" onClick={setPostId} >{props.content}</p>
                </div>
                {props.picture && (<img src={props.picture} alt={props.content} onClick={setPostId} draggable="false" className='object-contain w-full mt-2' />)}
                <div className="p-3">

                <hr className="my-3 opacity-0" />
                <div className="flex gap-6 justify-start my-2">
                    <button className="flex justify-start items-center"><Image src="/icons/like.svg" alt="" className="w-6 h-5 " width={24} height={24} /><span>Like {props.likes.length}</span></button>
                    <button className="flex justify-start items-center"><Image src="/icons/comment.svg" alt="" className="w-6 h-5"  width={24} height={24}/><span>Comment {props.comments.length}</span></button>
                </div>
                <hr className="my-3 opacity-0" />
                <AddComment author={{ username: "ndhzwr", picture: "/images/image.jpg", id: "1123" }} postid="sgs5" />
                </div>
            </div>
        </>
    )

}

const NewsFeedPost  = React.memo(NFPost)
export default NewsFeedPost
