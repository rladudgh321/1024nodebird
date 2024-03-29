import React, { useCallback, useEffect, useState } from 'react';
import { List, Card, Button } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { UNFOLLOWING_REQUEST, REMOVE_FOLLOWER_REQUEST } from '@/reducer/user';
import Router from 'next/router';

const FollowList = ({header, data, onClickMore, loading}) => {
    const dispatch = useDispatch();
    const onClickStop = useCallback((id) => () => {
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
    },[]);

    return (
        <>
            <List
                bordered
                size='small'
                header={`${header} ${data?.length}명`}
                // header={header + ' ' + data.length + '명'}
                dataSource={data}
                loadMore={(
                    <div style={{ textAlign: 'center', margin:'10px 0'}}>
                        <Button onClick={onClickMore} loading={loading}>더보기</Button>
                    </div>
                )}
                grid={{xs:3, md:2}}
                renderItem={(item)=>(
                    <List.Item>
                        <Card
                            actions={[<StopOutlined key={item.id} onClick={onClickStop(item.id)} />]}
                        >
                            <Card.Meta
                                description={item.nickname}
                            />
                        </Card>
                    </List.Item>
                )}
            >

            </List>
        </>
    );
}

export default FollowList;