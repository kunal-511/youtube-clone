import styled from "styled-components";

export const Container = styled.div`
  weight: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter}
  color: ${({ theme }) => theme.text}
  padding:20px;
  display:flex;
  flex-direction: column;
  gap:20px;
  position: relative;

`;
export const Title = styled.h1`
  text-align: center;
`;
export const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

export const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

export const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weigth: 500;
  cursor: pointer;
    background-color: ${({ theme }) => theme.soft}
    color: ${({ theme }) => theme.textSoft}

`;
export const Label = styled.label`
  font-size: 14px;
`;
