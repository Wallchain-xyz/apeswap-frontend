import React from 'react'
import { Button, Flex, Svg, Text } from 'components/uikit'
import { styles } from './styles'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hidePagination?: boolean
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, hidePagination }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const firstTwoPages = [1, 2].filter((page) => page <= totalPages)
  const lastTwoPages = [totalPages - 1, totalPages].filter((page) => page > 0)
  const middlePages = [
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ].filter((page) => page > 2 && page < totalPages - 1)
  const isMiddlePage = middlePages.includes(currentPage)

  return (
    <>
      {
        !hidePagination && (
          <Flex sx={styles.paginationCont}>
            <Flex onClick={handlePreviousPage} sx={{ mx: '5px', cursor: 'pointer' }}>
              <Svg icon="caret" direction="left" width={7} color="textDisabled"/>
            </Flex>
            {firstTwoPages.map((page) => (
              !isMiddlePage || page !== 2 || currentPage === 3 ? (
                <Button
                  size="sm"
                  key={page}
                  onClick={() => onPageChange(page)}
                  sx={{ ...styles.btn, background: currentPage === page ? 'yellow' : 'white2' }}
                  variant={currentPage === page ? 'primary' : 'secondary'}
                >
                  {page}
                </Button>
              ) : null
            ))}
            {(currentPage === 1 || currentPage === totalPages) && (<Text sx={{color: 'textDisabled', mx: '10px'}}>...</Text>)}
            {middlePages[0] > firstTwoPages[firstTwoPages.length - 1] + 1 || currentPage === 4 ? (<Text sx={{color: 'textDisabled', mx: '10px'}}>...</Text>) : null}
            {middlePages.map((page) => (
              <Button size="sm"
                      key={page}
                      onClick={() => onPageChange(page)}
                      sx={{ ...styles.btn, background: currentPage === page ? 'yellow' : 'white2' }}
                      variant={currentPage === page ? 'primary' : 'secondary'}
              >
                {page}
              </Button>
            ))}
            {middlePages[middlePages.length - 1] < lastTwoPages[0] - 1 || currentPage === totalPages - 3 ? (<Text sx={{color: 'textDisabled', mx: '10px'}}>...</Text>) : null}
            {lastTwoPages.map((page) => (
              !isMiddlePage || page !== totalPages - 1 || currentPage === totalPages - 2 ? (
                <Button
                  size="sm"
                  key={page}
                  onClick={() => onPageChange(page)}
                  sx={{ ...styles.btn, background: currentPage === page ? 'yellow' : 'white2' }}
                  variant={currentPage === page ? 'primary' : 'secondary'}
                >
                  {page}
                </Button>
              ) : null
            ))}
            <Flex onClick={handleNextPage} sx={{ mx: '5px', cursor: 'pointer' }}>
              <Svg icon="caret" direction="right" width={7} color="textDisabled" />
            </Flex>
          </Flex>
        )
      }
    </>
  )
}

export default Pagination
