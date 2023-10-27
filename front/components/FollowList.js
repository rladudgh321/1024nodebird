import React, { useCallback, useEffect } from 'react';
import { List, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { UNFOLLOWING_REQUEST, REMOVE_FOLLOWER_REQUEST } from '@/reducer/user';
import Router from 'next/router';

const FollowList = ({header, data}) => {
    const dispatch = useDispatch();
    const onClickStop = (id) => ()=>{
        if(header === '팔로잉 목록') {
            dispatch({
                type:UNFOLLOWING_REQUEST,
                data: id
            })
        } else {
            dispatch({
                type: REMOVE_FOLLOWER_REQUEST,
                data:id
            })
        }
    };



    return (
        <>
            <List
                bordered
                size='small'
                header={`${header}   ${data.length}명`}
                // header={header + ' ' + data.length + '명'}
                dataSource={data}
                grid={{xs:3, md:2}}
                renderItem={(item)=>(
                    <Card
                        actions={[<StopOutlined key='stop' onClick={onClickStop(item.id)} />]}
                    >
                        <Card.Meta
                            description={item.nickname}
                        />
                    </Card>
                )}
            >

            </List>
        </>
    );
}

export default FollowList;