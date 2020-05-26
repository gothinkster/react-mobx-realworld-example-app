import React, { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

function useStores() {
  return useContext(MobXProviderContext)
}

export default useStores
