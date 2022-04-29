import styled from "styled-components";

export const FlashCardContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  flex-direction: column;
`;
export const Container = styled.div`
  border: 1px solid black;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 1 grey;
`;
export const Header = styled.h1``;
export const FishID = styled.h3``;
export const Button = styled.button`
  color: white;
`;
export const ButtonDisplay = styled.div`
  button:first-child {
    background-color: green;
  }
  button:nth-child(2) {
    background-color: yellow;
    color: black;
  }
  button:last-child {
    background-color: red;
  }
`;
/* front pane, placed above back */
export const Front = styled(Container)``;

/* back, initially hidden pane */
export const Back = styled(Container)``;
