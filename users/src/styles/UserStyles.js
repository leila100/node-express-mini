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

  div {
    margin-bottom: 10px;

    span {
      font-size: 2rem;
      color: #33ccff;
    }
  }
`
