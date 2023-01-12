import { Flex } from 'components/uikit'
import React, { createContext, useState } from 'react'

interface ModalsContext {
  isOpen: boolean
  nodeId: string
  modalNode: React.ReactNode
  setModalNode: React.Dispatch<React.SetStateAction<React.ReactNode>>
  onPresent: (node: React.ReactNode, newNodeId: string) => void
  handleClose: () => void
  setCloseOnOverlayClick: React.Dispatch<React.SetStateAction<boolean>>
}

export const Context = createContext<ModalsContext>({
  isOpen: false,
  nodeId: '',
  modalNode: null,
  setModalNode: () => null,
  onPresent: () => null,
  handleClose: () => null,
  setCloseOnOverlayClick: () => true,
})

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [nodeId, setNodeId] = useState('')
  const [modalNode, setModalNode] = useState<React.ReactNode>()
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true)

  const handlePresent = (node: React.ReactNode, newNodeId: string) => {
    setModalNode(node)
    setIsOpen(true)
    setNodeId(newNodeId)
  }

  const handleDismiss = () => {
    if (React.isValidElement(modalNode)) modalNode.props?.onDismiss?.()
    setModalNode(undefined)
    setIsOpen(false)
    setNodeId('')
  }

  const handleOverlayDismiss = () => {
    if (closeOnOverlayClick) {
      handleDismiss()
    }
  }

  return (
    <Context.Provider
      value={{
        isOpen,
        nodeId,
        modalNode,
        setModalNode,
        onPresent: handlePresent,
        handleClose: handleDismiss,
        setCloseOnOverlayClick,
      }}
    >
      {isOpen && (
        <Flex>
          <Flex onClick={handleOverlayDismiss} />
          {React.isValidElement(modalNode) &&
            React.cloneElement(modalNode, {
              // @ts-ignore
              onDismiss: handleDismiss,
            })}
        </Flex>
      )}
      {children}
    </Context.Provider>
  )
}

export default ModalProvider
