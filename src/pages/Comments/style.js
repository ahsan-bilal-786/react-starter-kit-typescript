import styled from 'styled-components'

export const PostsWrapper = styled.div`
    margin: 30px 0 0;
    padding: 15px 0;
    border: 1px solid #f5f5f5;
`
export const PostCard = styled.div`
    padding: 15px;
    border: 1px solid #f5f5f5;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02)
`
export const PostCardActions = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0 0;
    padding: 0;
    border-top: 1px solid #f2f2f2;
    li {
        cursor: pointer
    }
    li a {text-decoration: none}
`