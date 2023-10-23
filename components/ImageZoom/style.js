import styled from "@emotion/styled";
import { CloseOutlined } from '@ant-design/icons';

export const Overlay = styled.div`
    position:fixed;
    top:0;
    bottom:0;
    right:0;
    left:0;
    background:gray;
    z-index:5000;
`;

export const Title = styled.div`
    position:relative;
    background:white;
    line-height:44px;
    top:0;

    & h2 {
        font-size: 32px;
    }
`;

export const Xbox = styled(CloseOutlined)`
    position:absolute;
    right:0;
    top:0;
    font-size:1.3rem;
    margin:10;
`;

export const SlickWrapper = styled.div`
    padding:10px;
`;

export const Indicator = styled.div`
    border:1px solid white;
    width:80px;
    color:white;
    border-radius:10px;
    margin:0 auto;
`;