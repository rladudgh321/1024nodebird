import React, { useCallback, useEffect } from 'react';
import { Input } from 'antd';
import useInput from '@/hooks/useInput';
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE_NICKNAME_EDIT_REQUEST } from '@/reducer/user';

const NicknameFormEdit = () => {
    const dispatch = useDispatch();
    const { changeNicknameEditDone, me } = useSelector((state)=>state.user);
    const [editName, onChangeEditName, setEditName] = useInput(me.nickname);
    const [ editText, onChangeEditText, setEditText ] = useInput(me.description);
    const onSubmit = useCallback(()=>{
        console.log({editName, editText});
        dispatch({
            type:CHANGE_NICKNAME_EDIT_REQUEST,
            data:{
                editName, 
                editText,
            }
        })
    },[editName, editText]);
    useEffect(()=>{
        if(changeNicknameEditDone) {
            setEditName('');
            setEditText('');
        }
    },[changeNicknameEditDone]);
    return (
        <>
            <Input.Search enterButton="수정" addonBefore="닉네임" 
            value={editName} 
            placeholder='닉네임'
            onChange={onChangeEditName}
            onSearch={onSubmit} />
            <Input.TextArea placeholder='나는 어떤 사람일까?' value={editText} onChange={onChangeEditText}  />
        </>
    );
}

export default NicknameFormEdit;