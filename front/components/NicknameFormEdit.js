import React, { useCallback, useEffect } from 'react';
import { Input } from 'antd';
import useInput from '@/hooks/useInput';
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE_NICKNAME_EDIT_REQUEST } from '@/reducer/user';

const NicknameFormEdit = () => {
    const dispatch = useDispatch();
    const { changeNicknameEditDone } = useSelector((state)=>state.user);
    const [editName, onChangeEditName, setter] = useInput('');
    const onSubmit = useCallback(()=>{
        console.log({editName});
        dispatch({
            type:CHANGE_NICKNAME_EDIT_REQUEST,
            data:editName,
        })
    },[editName]);
    useEffect(()=>{
        if(changeNicknameEditDone) {
            setter('')
        }
    },[changeNicknameEditDone]);
    return (
        <>
            <Input.Search enterButton="수정" addonBefore="닉네임" 
            value={editName} 
            onChange={onChangeEditName}
            onSearch={onSubmit} />
        </>
    );
}

export default NicknameFormEdit;