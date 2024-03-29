/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SmallUser from "../components/User/SmallUser";
import AddComment from "../components/post/AddComment";
import Loader from "../components/Loader";
import { defaultProfile, getSinglePostHandler, logoutHandler } from "../utils/api";
import { Post } from "../@types";
import ErrorMessage from "../components/Error";
import { useAuth } from "../store/useAuth";
import Link from "next/link";

interface MainLayoutProps {
    children: React.ReactNode
}

const btnstyle = "flex items-center gap-4 w-14 h-14  p-4  py-3   my-4 hover:bg-slate-50 duration-100 border rounded-full cursor-pointer"
const MainLayout: React.FC<MainLayoutProps> = (props: MainLayoutProps) => {
    const router = useRouter();
    const { error } = useAuth();
    const [postId, setPostId] = useState<string | null>(null)
    const [postData, setPostData] = useState<Post | null>(null)
    useEffect(() => {
        setPostId(router.query['postId'] as string);
        (async function () {
            if (postId) {
                const data = await getSinglePostHandler(postId);
                setPostData(data.data)
            }
        }())
    }, [router, postId])





    const handleClosePortal = () => {
        history.back()
    }

    return (
        <div className="relative">
            <div className={`flex h-full min-h-screen min-w-screen relative bg-white text-sm xl:px-[17vw]`}>
                <div className={`py-3 max-h-screen sticky top-0 ${router.pathname == "/" && "hidden"} border-r `}>
                    <div className=" px-1   flex flex-col justify-between h-full  top-0 bg-slate z-40  md:static   bg-white">
                        <div className="md:block">
                            <div className="flex items-center justify-between gap-4 w-14 h-14  p-4  py-3   my-4  duration-100  rounded-full cursor-pointer" onClick={() => { router.push('/feed') }}  >
                                <img src="/icon.svg" alt="" />
                            </div>
                            <button className={btnstyle}><Link href={'/feed'} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                            </Link></button>
                            <button className={btnstyle}><Link href={'/chat'}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                                </svg>

                            </Link></button>
                            <div><button className={btnstyle} onClick={() => router.push(`/${localStorage.getItem('username')}`)} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>

                            </button></div>

                        </div>
                        <button className=" text-sm  rounded-full py-4  text-slate-900 opacity-50 hover:opacity-100 " title="Logout" onClick={logoutHandler}>
                            <div className="flex items-center gap-4 w-14 h-14  p-4  py-3  fill-red-500  my-4 hover:bg-slate-50 duration-100 border rounded-full" >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ef4444" className="w-6 h-6">
                                    <path strokeLinecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                </svg>

                            </div>
                        </button>
                    </div>
                </div>

                {props.children}
            </div>
            {postId && <div className="fixed  w-screen  bg-black/10 md:mb-0 msm:mb-12  msm:p-4 sm:px-[4vw] md:px-[10vw] md:py-20 bg-transparent  z-30 top-0  bottom-0 flex  msm:flex-col md:flex-row  items-center justify-center h-screen">
                {postData && (
                    <div className="rounded-xl flex  ">
                        <div className="  bg-white rounded-xl h-[90vh] overflow-hidden  flex items-start msm:flex-col md:flex-row">
                            {postData.picture && (<img
                                src={postData.picture}
                                // style={{ background: `url(${postData.picture})`, backdropFilter: "blur(9px)" }}
                                alt={postData.content}
                                className='object-contain bg-blurred h-full md:max-w-[500px] bg-slate-50   backdrop-contrast-200 flex items-center'
                                draggable="false" />
                            )}
                            <div className="p-6  min-w-[40vw]">

                                <SmallUser id={postData.author.id} username={postData.author.username} profile={postData.author.profile ? postData.author.profile.profilePicture : defaultProfile} status={postData.author.profile ? postData.author.profile.status : "Rwanda the heart of africa"} />
                                <hr className="my-3 opacity-0" />
                                <p className="text-xl">{postData.content}</p>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <hr className="my-3 opacity-0" />
                                <div className="flex gap-6 justify-start my-2">
                                    <button className="flex justify-start items-center"><img src="/icons/like.svg" alt="" className="w-6 h-4 " /><span>Like {0}</span></button>
                                    <button className="flex justify-start items-center"><img src="/icons/comment.svg" alt="" className="w-6 h-4" /><span>Comment {10}</span></button>
                                </div>
                                <hr className="my-3 opacity-0" />
                                <AddComment author={{ username: "ndhzwr", picture: "/images/image.jpg", id: "1123" }} postid={postData.id} />
                            </div>
                        </div>
                    </div>
                )}
                {!postData &&
                    <div className="w-full h-fulll flex items-center justify-between">
                        <Loader />
                    </div>

                }
                <button className="absolute  left-4 top-4 bg-slate-100 bg-opacity-80 w-8 h-8 rounded-full text-slate-700 z-50" onClick={handleClosePortal} onTouchEnd={handleClosePortal}>X</button>
            </div>}
            {error != null && <div className="fixed px-4 sm:top-4 sm:bottom-full msm:top-full  msm:bottom-4 w-screen bg-transparent">
                <ErrorMessage message={error} />
            </div>}
        </div>
    )

}

export default MainLayout