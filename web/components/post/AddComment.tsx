import {useState, FC } from 'react'
import Image
 from 'next/image'
interface AddCommentProps {
    author: {
        username: string,
        picture: string,
        id: string;
    }
    postid: string;
}


const AddComment: FC<AddCommentProps> = (props: AddCommentProps) => {
    const [viewTip,setViewTip] = useState<boolean>(false)
    return (
        <>
            <div className='flex justify-start w-full gap-1 items-center'>
                <Image src={props.author.picture} alt="" className='w-8 h-8 object-cover rounded-full'   width={"32px"} height={"32px"}/>
                <input type="text" placeholder='Add a public comment' className='p-2 outline-none border-none bg-transparent placeholder:text-sm' onFocus={() => setViewTip(true)}  onBlur={()=>setViewTip(false)}/>
            </div>
            <p className={`text-right text-[10px] text-placeholder duration-100 ${viewTip ? "opacity-100" : "opacity-0"}`}>Hit enter
                &#9166; to post your comment</p>
        </>
    )
}

export default AddComment