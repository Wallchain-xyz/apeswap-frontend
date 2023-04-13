import React, { useEffect, useState } from 'react'
import { useLoadInitialProfiles, useSearchProfiles } from '../../state/lhd/hooks'
import { useAppDispatch } from '../../state/hooks'
import { addSearchProfiles } from '../../state/lhd/reducer'

const LHD = () => {
  console.log('rendering')
  useLoadInitialProfiles()
  const searchProfiles = useSearchProfiles()
  const dispatch = useAppDispatch()

  const [queryString, setQueryString] = useState('');

  const handleChange = (searchQuery: string) => {
    setQueryString(searchQuery)
  }

  useEffect(() => {
    dispatch(addSearchProfiles([]))
    const delayDebounceFn = setTimeout(async () => {
      if (queryString?.length >= 2) {
        await searchProfiles(queryString)
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, queryString, searchProfiles]);

  return (
    <div>
      <input
        placeholder="BANANA"
        value={queryString}
        onChange={(event) => handleChange(event.target.value)}
      />
    </div>
  )
}

export default LHD