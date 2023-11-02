import React, { useState, useCallback } from 'react';
import ImageZoom from './ImageZoom';

const dd = 'http://127.0.0.1:3065/images/'

const PostImage = ({images}) => {
    const [ showImageZoom, setShowImageZoom ] = useState(false);
    const onZoom = useCallback(()=>{
        setShowImageZoom(true);
    },[]);
    const onClose = useCallback(()=>{
        setShowImageZoom(false);
        console.log('onClose function called11');
    },[]);
    if(images.length === 1) {
        return (
            <>
                <div>
                    {<img src={dd +images[0].src} alt={images[0].src} style={{ width:'100%' }} 
                        onClick={onZoom}
                    />}
                    {
                        showImageZoom && <ImageZoom onClose={onClose} images={images} />
                    }
                </div>
            </>
        );
    }
    if(images.length === 2) {
        return (
            <>
                <div>
                    {<img src={ dd + images[0].src} alt={images[0].src} style={{ width:'50%' }} onClick={onZoom} />}
                    {<img src={ dd + images[1].src} alt={images[1].src} style={{ width:'50%' }} onClick={onZoom} />}
                    {
                        showImageZoom && <ImageZoom onClose={onClose} images={images} />
                    }
                </div>
            </>
        );
    }
    return (
        <div style={{display:'flex'}}>
            <div style={{ display:'inline-block', width:'50%', cursor:'pointer' }} onClick={onZoom}>
                {<img src={ dd + images[0].src} alt={images[0].src} style={{ width:'100%' }}/>}
            </div>
            <div style={{ display:'inline-block', textAlign:'center',width:'50%', margin:'auto 0' }}>
                <div onClick={onZoom} style={{ cursor:'pointer'}}>
                    { images.length -1 }
                    { ' ' }
                    개 사진 더 보기
                </div>
                {
                        showImageZoom && <ImageZoom onClose={onClose} images={images} />
                }
            </div>
        </div>
    );
}

export default PostImage;