import styled from "styled-components"

export const UsersWrapper = styled.div`
  margin: auto;
  margin-top: 100px;
  display: flex;
  flex-wrap: wrap;
  width: 80%;
`

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  border: 1px solid #3f0122;
  width: 25%;
  font-size: 1.8rem;
  padding: 10px;
  margin: 3%;

  span {
    font-size: 2rem;
    color: #33ccff;
  }
`

export const Info = styled.div`
  margin-bottom: 10px;
`

export const IconWrapper = styled.div`
  display: flex;
  width: 20%;
  margin-bottom: 0;

  i {
    margin: 10px;
    color: #33ccff;
    cursor: pointer;
  }
`
