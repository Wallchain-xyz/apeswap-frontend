import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<
  | 'mainContainer'
  | 'leftContainer'
  | 'nameBtnContainer'
  | 'tokenSymbol'
  | 'priceChange'
  | 'buttons'
  | 'extraInfoCont'
  | 'rank'
  | 'rankText'
  | 'chainsCont'
  | 'marketCap'
  | 'scoresCont'
  | 'singleScoreCont'
  | 'scoreTitle'
  | 'scoreCont'
  | 'scoreText'
  | 'scoreNumber'
  | 'shareCard'
  | 'shareText', ThemeUIStyleObject> = {
  mainContainer: {
    width: '100%',
    flexDirection: ['column', 'column', 'column', 'row'],
  },
  leftContainer: {
    width: ['100%', '100%', 'unset'],
    minWidth: ['', '', '', '460px'],
    background: 'white2',
    borderRadius: '10px',
    padding: '20px',
    alignItems: 'flex-start',
    mr: ['0px', '0px', '0px', '20px'],
  },
  nameBtnContainer: {
    width: '100%',
    alignItems: ['flex-start'],
    flexDirection: ['column', 'column', 'row'],
  },
  tokenSymbol: {
    fontWeight: 700,
    fontSize: ['22px'],
    lineHeight: ['30px'],
    mx: '10px',
  },
  priceChange: {
    background: 'white3',
    padding: '2px 5px',
    borderRadius: '10px',
    mr: '5px',
  },
  buttons: {
    height: '100%',
    alignItems: 'center',
    mt: ['10px', '10px', '0px'],
  },
  extraInfoCont: {
    width: '100%',
    alignItems: 'center',
    mt: '10px',
  },
  rank: {
    width: '50px',
    height: '20px',
    background: 'linear-gradient(99.09deg, #A16552 0%, #FFB300 106.96%)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
  },
  rankText: {
    fontWeight: 500,
    fontSize: ['8px'],
    lineHeight: ['12px'],
    color: 'white',
  },
  chainsCont: {
    width: '65px',
    height: '100%',
    marginLeft: '10px',
  },
  marketCap: {
    fontWeight: 400,
    fontSize: ['12px'],
    lineHeight: ['18px'],
    color: 'textDisabled',
  },
  scoresCont: {
    width: '100%',
    background: 'white2',
    borderRadius: '10px',
    padding: ['10px', '10px', '10px', '20px'],
    flexDirection: ['column', 'column', 'column', 'row'],
    mt: ['15px', '15px', '15px', '0px'],
  },
  singleScoreCont: {
    flexDirection: 'column',
    width: '100%',
    maxWidth: '90px',
  },
  scoreTitle: {
    fontSize: '10px',
    fontWeight: 500,
    lineHeight: '20px',
  },
  scoreCont: {
    width: '100%',
    maxWidth: '70px',
    flexDirection: 'column',
    alignItems: 'center',
    ml: '10px',
  },
  scoreText: {
    fontWeight: 400,
    fontSize: ['16px'],
    lineHeight: ['20px'],
    color: 'textDisabled',
  },
  scoreNumber: {
    fontWeight: 700,
    fontSize: ['55px'],
    lineHeight: ['40px'],
  },
  shareCard: {
    color: 'text',
    width: ['100%'],
    textTransform: 'capitalize',
    flexDirection: ['row', 'row', 'row', 'column-reverse'],
    mx: ['0px', '0px', '0px', '15px'],
    minWidth: '65px',
    maxHeight: '60px',
    alignItems: 'center',
  },
  shareText: {
    fontWeight: 500,
    fontSize: ['10px'],
    lineHeight: ['17px']
  }
}