import styled from '@emotion/styled'
import { ThemeUIStyleObject } from 'theme-ui'

export const NewsCard = styled.div<{ image: string; index: number; listLength: number }>`
  height: 332.5px;
  minwidth: 266px;
  maxwidth: 266px;
  opacity: 1;
  flexshrink: 1;
  background: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
  transition: ease 1000ms;
  cursor: pointer;
`

export const NewsWrapper = styled.div`
  display: flex;
  height: 500px;
  align-items: center;
  overflow: hidden;
  max-width: 1412px;
  width: 95vw;
  justify-content: center;
  padding-bottom: 50px;
`

export const SkeletonWrapper = styled.div`
  position: absolute;
  display: flex;
  height: 500px;
  align-items: center;
  max-width: 1412px;
  width: 95vw;
  top: 0;
  justify-content: center;
  padding-bottom: 50px;
  & :nth-child(2),
  & :nth-child(3),
  & :nth-child(4),
  & :nth-child(5) {
    display: none;
  }
  @media screen and (min-width: 555px) and (max-width: 855px) {
    justify-content: space-around;
    & :nth-child(2) {
      display: block;
    }
  }
  @media screen and (min-width: 855px) and (max-width: 1155px) {
    justify-content: space-around;
    & :nth-child(2),
    & :nth-child(3) {
      display: block;
    }
  }
  @media screen and (min-width: 1155px) and (max-width: 1405px) {
    justify-content: space-between;
    & :nth-child(2),
    & :nth-child(3),
    & :nth-child(4) {
      display: block;
    }
  }
  @media screen and (min-width: 1405px) {
    justify-content: space-between;
    & :nth-child(2),
    & :nth-child(3),
    & :nth-child(4),
    & :nth-child(5) {
      display: block;
    }
  }
`

export const Bubble = styled.div<{ isActive?: boolean }>`
  background: ${({ isActive }) => (isActive ? 'linear-gradient(53.53deg; #a16552 15.88%; #e1b242 92.56%)' : 'white4')};
  height: 14px;
  width: 14px;
  border-radius: 50px;
  margin: 0px 2.5px 0px 2.5px;
  cursor: pointer;
`

export const styles: Record<'newsCard' | 'cardWrapper', ThemeUIStyleObject> = {
  newsCard: {
    height: '332.5px',
    minWidth: '266px',
    maxWidth: '266px',
    opacity: 1,
    flexShrink: 1,
    borderRadius: '10px',
    transition: 'ease 1000ms',
    cursor: 'pointer',
  },
  cardWrapper: {
    display: ['flex', 'flex', 'flex', 'grid'],
    flexWrap: 'wrap',
    flexDirection: 'row',
    background: 'white2',
    justifyContent: 'center',
    margin: '0px 30px',
    alignItems: 'center',
    maxWidth: '1412px',
    zIndex: 2,
    width: '95vw',
    borderRadius: '10px',
    ':nth-child(1), :nth-child(2), :nth-child(3), :nth-child(4)': {
      borderRadius: '10px',
    },
    gridTemplateColumns: ['none', 'none', 'repeat(2, minmax(260px, 325px))', 'repeat(4, minmax(260px, 325px))'],
  },
}
