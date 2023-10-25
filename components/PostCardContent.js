import Link from 'next/link';
import React from 'react';

const PostCardContent = ({content}) => {
    return (
        <>
            {
                content.split(/(#[^\s#]+)/g).map((v,i) => {
                    if(v.match(/(#[^\s#]+)/)) {
                        return (
                            <Link href={`/hashtag/${v.slice(1).toLowerCase() }`} key={i}>{v}</Link>
                        );
                    }
                    return v;
                })
            }
        </>
    );
}

export default PostCardContent;